import { settings, inputState } from '@/core/state.js';
import { findTeam, findBullet, findWeapon, inputCommands } from '@/utils/constants.js';
import { gameManager } from '@/core/state.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';
import {
  AimState,
  setAimState,
  getPing,
} from '@/core/aimController.js';
import { v2 } from '@/utils/math.js';
import { setAutoAttackFire } from '@/features/AutoFire.js';
import { isLayerSpoofActive, originalLayerValue } from '@/features/LayerSpoofer.js';

// Melee Lock specific constants
const MELEE_ENGAGE_DISTANCE = 5.5;
const MELEE_LOCK_GRACE_PERIOD = 1000;
const MELEE_PREDICTION_ENABLED = true;
const MELEE_PREDICTION_TIME = 0.12;
const MELEE_ACCEL_INFLUENCE = 0.08;
const MELEE_MIN_ENGAGEMENT_RANGE = 4.5;
const MELEE_MAX_ENGAGEMENT_RANGE = 7.5;
const MELEE_PING_COMPENSATION = true;

// Melee Lock state
const state = {
  meleeLockEnemy_: null,
  meleeLockEnemy_lastOutOfRangeTime_: 0,
  previousEnemies_: {}, // Shared with aimbot
};

const queueInput = (command) => inputState.queuedInputs_.push(command);

function calcAngle(playerPos, mePos) {
  const dx = mePos.x - playerPos.x;
  const dy = mePos.y - playerPos.y;
  return Math.atan2(dy, dx);
}

/**
 * Lấy vị trí center của body enemy (giữa thân)
 * Dùng cho melee lock để aim chính xác vào center body
 */
function getEnemyBodyCenter(enemy) {
  if (!enemy) return null;
  
  const visualPos = enemy[translations.visualPos_];
  if (!visualPos) return null;
  
  // Thử lấy từ collider nếu có
  if (enemy.collider) {
    try {
      // Circular collider - center là visualPos
      if (enemy.collider.radius !== undefined) {
        return { x: visualPos.x, y: visualPos.y };
      }
      // Rectangular collider - lấy center
      if (enemy.collider.min && enemy.collider.max) {
        const centerX = (enemy.collider.min.x + enemy.collider.max.x) / 2;
        const centerY = (enemy.collider.min.y + enemy.collider.max.y) / 2;
        return {
          x: centerX + visualPos.x,
          y: centerY + visualPos.y,
        };
      }
      // AABB collider
      if (enemy.collider.getCenter && typeof enemy.collider.getCenter === 'function') {
        const center = enemy.collider.getCenter();
        return { x: center.x, y: center.y };
      }
    } catch (e) {
      // Fall through to default
    }
  }
  
  // Try rigidbody position if available
  if (enemy.body && enemy.body.position) {
    return { x: enemy.body.position.x, y: enemy.body.position.y };
  }
  
  // Fallback: visual position (usually center already in Surviv)
  return { x: visualPos.x, y: visualPos.y };
}

/**
 * Project target position to be collinear with player→enemy vector (Method 1: Projection)
 * Ensures 3 points (player - targetPos - enemy) lie on same line
 */
function projectToCollinear(mePos, enemyPos, targetPos) {
  // Vector from player to enemy
  const dx = enemyPos.x - mePos.x;
  const dy = enemyPos.y - mePos.y;
  const len2 = dx * dx + dy * dy;
  
  // If player ≈ enemy, return enemy position
  if (len2 < 0.001) return enemyPos;
  
  // Project targetPos onto line: parameter t ∈ [0, 1] maps [player, enemy]
  const t = ((targetPos.x - mePos.x) * dx + (targetPos.y - mePos.y) * dy) / len2;
  const tClamped = Math.max(0, Math.min(1, t));
  
  return {
    x: mePos.x + tClamped * dx,
    y: mePos.y + tClamped * dy,
  };
}

/**
 * Ensure target position is collinear with player→enemy vector (Method 2: Cross-product check)
 * Checks if cross product (distance from line) exceeds tolerance; if so, projects to line
 */
function ensureCollinear(mePos, enemyPos, targetPos, tolerance = 1.0) {
  // Vector from player to enemy
  const dx = enemyPos.x - mePos.x;
  const dy = enemyPos.y - mePos.y;
  
  // Calculate cross product = signed distance × length
  // If cross product = 0, points are collinear
  const crossProduct = dx * (targetPos.y - mePos.y) - dy * (targetPos.x - mePos.x);
  
  // If deviation exceeds tolerance, project to line
  if (Math.abs(crossProduct) > tolerance) {
    return projectToCollinear(mePos, enemyPos, targetPos);
  }
  
  // Otherwise, position is already acceptable
  return targetPos;
}

function findClosestTarget(players, me) {
  const meTeam = findTeam(me);
  let enemy = null;
  let minDistance = Infinity;
  
  const myPos = me[translations.visualPos_];

  for (const player of players) {
    if (!player.active) continue;
    if (player[translations.netData_][translations.dead_]) continue;
    if (!settings.aimbot_.targetKnocked_ && player.downed) continue;
    if (me.__id === player.__id) continue;
    if (findTeam(player) === meTeam) continue;

    const playerPos = player[translations.visualPos_];
    const distance = Math.hypot(myPos.x - playerPos.x, myPos.y - playerPos.y);
    
    // Skip very far targets
    if (distance > 300) continue;

    if (distance < minDistance) {
      minDistance = distance;
      enemy = player;
    }
  }

  return enemy;
}

function normalizeAngleDiff(diff) {
  let d = diff;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

/**
 * Update melee lock logic
 * Called from Aimbot's aimbotTicker
 * Returns { stateUpdate, aimUpdated } or null if melee lock not active
 */
export function updateMeleeLock(me, players, currentWeaponIndex, isAiming, canCastToPlayer) {
  const game = gameManager.game;
  const isMeleeEquipped = currentWeaponIndex === 2;
  
  // Check if melee lock should be active
  const wantsMeleeLock = settings.meleeLock_.enabled_ && (isAiming || settings.aimbot_.autoAttack_);
  
  if (!wantsMeleeLock) {
    state.meleeLockEnemy_ = null;
    state.meleeLockEnemy_lastOutOfRangeTime_ = 0;
    setAutoAttackFire(false);
    return null;
  }

  let meleeEnemy = state.meleeLockEnemy_;
  if (
    !meleeEnemy ||
    !meleeEnemy.active ||
    meleeEnemy[translations.netData_][translations.dead_]
  ) {
    // Find closest melee target
    meleeEnemy = findClosestTarget(players, me);
    state.meleeLockEnemy_ = meleeEnemy;
    state.meleeLockEnemy_lastOutOfRangeTime_ = 0;
  }

  let distanceToMeleeEnemy = Infinity;
  if (meleeEnemy) {
    const mePos = me[translations.visualPos_];
    const enemyPos = meleeEnemy[translations.visualPos_];
    distanceToMeleeEnemy = Math.hypot(mePos.x - enemyPos.x, mePos.y - enemyPos.y);
  }

  // NEW: Adaptive engagement range based on enemy movement
  let adaptiveEngagementRange = MELEE_ENGAGE_DISTANCE;
  if (meleeEnemy?.velocity_) {
    const enemySpeed = Math.hypot(meleeEnemy.velocity_.x, meleeEnemy.velocity_.y);
    // Adjust range: faster moving enemies = larger engagement radius
    adaptiveEngagementRange = MELEE_MIN_ENGAGEMENT_RANGE + 
      Math.min(3, (enemySpeed / 10) * 0.5); // Scale with speed
  }

  // Check if melee target is within engagement range
  const meleeTargetInRange = distanceToMeleeEnemy <= adaptiveEngagementRange;
  
  // Apply grace period: keep lock for a moment even if target moves out of range
  const now = Date.now();
  if (!meleeTargetInRange && meleeEnemy && state.meleeLockEnemy_lastOutOfRangeTime_ === 0) {
    state.meleeLockEnemy_lastOutOfRangeTime_ = now;
  } else if (meleeTargetInRange && state.meleeLockEnemy_lastOutOfRangeTime_ !== 0) {
    state.meleeLockEnemy_lastOutOfRangeTime_ = 0; // Reset grace period when back in range
  }

  const graceExpired = now - state.meleeLockEnemy_lastOutOfRangeTime_ > MELEE_LOCK_GRACE_PERIOD;
  const shouldDropMeleeTarget = !meleeTargetInRange && graceExpired && state.meleeLockEnemy_lastOutOfRangeTime_ > 0;
  
  if (shouldDropMeleeTarget) {
    meleeEnemy = null;
    state.meleeLockEnemy_ = null;
    state.meleeLockEnemy_lastOutOfRangeTime_ = 0;
    setAutoAttackFire(false);
    return null;
  }

  if (
    wantsMeleeLock &&
    settings.meleeLock_.autoMelee_ &&
    !isMeleeEquipped &&
    meleeTargetInRange
  ) {
    queueInput(inputCommands.EquipMelee_);
  }

  const meleeLockActive = wantsMeleeLock && isMeleeEquipped && meleeTargetInRange && meleeEnemy;

  if (!meleeLockActive) {
    if (wantsMeleeLock && !meleeTargetInRange) {
      state.meleeLockEnemy_ = null;
    }
    setAutoAttackFire(false);
    return null;
  }

  // Melee lock is active - perform targeting and movement
  const mePos = me[translations.visualPos_];
  const enemyPos = meleeEnemy[translations.visualPos_];

  const weapon = findWeapon(me);
  const bullet = findBullet(weapon);
  const isMeleeTargetShootable =
    !settings.aimbot_.wallcheck_ || canCastToPlayer(me, meleeEnemy, weapon, bullet);

  if (!isMeleeTargetShootable) {
    setAutoAttackFire(false);
    return null;
  }

  // Get enemy body center for melee lock targeting
  const bodyCenter = getEnemyBodyCenter(meleeEnemy) || enemyPos;
  
  // Apply predictive positioning for smoother melee lock targeting
  let targetPos = bodyCenter;
  
  if (MELEE_PREDICTION_ENABLED) {
    const enemyId = meleeEnemy.__id;
    const history = state.previousEnemies_[enemyId] ?? (state.previousEnemies_[enemyId] = []);
    const now = performance.now();
    
    history.push([now, { ...enemyPos }]);
    if (history.length > 4) history.shift();
    
    // Only predict if we have enough history
    if (history.length >= 3) {
      let vx = 0, vy = 0;
      let ax = 0, ay = 0; // Acceleration
      
      // Calculate velocity from most recent movements
      let sumDt = 0, sumDtDvx = 0, sumDtDvy = 0;
      for (let i = 1; i < history.length; i++) {
        const dt = (history[i][0] - history[i-1][0]) / 1000;
        if (dt > 0) {
          const dvx = history[i][1].x - history[i-1][1].x;
          const dvy = history[i][1].y - history[i-1][1].y;
          sumDt += dt;
          sumDtDvx += dvx;
          sumDtDvy += dvy;
        }
      }
      
      if (sumDt > 0) {
        vx = sumDtDvx / sumDt;
        vy = sumDtDvy / sumDt;
      }
      
      // Calculate acceleration for better prediction
      if (history.length >= 4) {
        let prevVx = 0, prevVy = 0;
        let prevSumDt = 0, prevSumDvx = 0, prevSumDvy = 0;
        
        // Use older points to calculate previous velocity
        for (let i = Math.max(1, history.length - 3); i < Math.min(history.length - 1, history.length - 1); i++) {
          const dt = (history[i][0] - history[i-1][0]) / 1000;
          if (dt > 0) {
            const dvx = history[i][1].x - history[i-1][1].x;
            const dvy = history[i][1].y - history[i-1][1].y;
            prevSumDt += dt;
            prevSumDvx += dvx;
            prevSumDvy += dvy;
          }
        }
        
        if (prevSumDt > 0) {
          prevVx = prevSumDvx / prevSumDt;
          prevVy = prevSumDvy / prevSumDt;
          
          // Acceleration = (vCurrent - vPrevious) / time
          const accelDt = (history[history.length - 1][0] - (history.length >= 3 ? history[history.length - 3][0] : history[0][0])) / 1000;
          if (accelDt > 0.005) { // At least 5ms apart
            ax = (vx - prevVx) / accelDt;
            ay = (vy - prevVy) / accelDt;
            
            // Clamp acceleration to prevent overshooting
            const maxAccel = 50;
            ax = Math.max(-maxAccel, Math.min(maxAccel, ax));
            ay = Math.max(-maxAccel, Math.min(maxAccel, ay));
          }
        }
      }
      
      // Anti-lag compensation
      let predictionTime = MELEE_PREDICTION_TIME;
      if (MELEE_PING_COMPENSATION) {
        const ping = getPing?.() || 50;
        // Add 15-30% of ping as extra prediction time for lag compensation
        const lagCompensation = (ping / 1000) * 0.15;
        predictionTime += lagCompensation;
      }
      
      // Apply prediction with velocity + acceleration
      targetPos = {
        x: bodyCenter.x + vx * predictionTime + 0.5 * ax * (predictionTime * predictionTime) * MELEE_ACCEL_INFLUENCE,
        y: bodyCenter.y + vy * predictionTime + 0.5 * ay * (predictionTime * predictionTime) * MELEE_ACCEL_INFLUENCE,
      };
    }
  }

  // Apply collinearity optimization
  targetPos = ensureCollinear(mePos, enemyPos, targetPos, 2.0);

  // Calculate base forward movement direction towards enemy
  const forwardAngle = calcAngle(targetPos, mePos) + Math.PI;
  const forwardX = Math.cos(forwardAngle);
  const forwardY = Math.sin(forwardAngle);

  // Calculate evasion (dodge enemy's melee range)
  let movementAngle = forwardAngle;
  
  if (settings.meleeLock_.enableEvasion_ && distanceToMeleeEnemy < settings.meleeLock_.evasionRange_) {
    // We're within enemy's melee danger zone - evade intelligently
    const enemyFacingAngle = Math.atan2(meleeEnemy[translations.dir_].x, meleeEnemy[translations.dir_].y) - Math.PI / 2;
    
    // Priority 1: Try to position directly behind enemy
    const directionBehind = enemyFacingAngle + Math.PI;
    
    // Priority 2: Position to left/right sides
    const leftAngle = enemyFacingAngle + Math.PI / 2;
    const rightAngle = enemyFacingAngle - Math.PI / 2;
    
    // Choose best evasion direction
    const angleToBehind = Math.abs(normalizeAngleDiff(directionBehind - forwardAngle));
    const angleToLeft = Math.abs(normalizeAngleDiff(leftAngle - forwardAngle));
    const angleToRight = Math.abs(normalizeAngleDiff(rightAngle - forwardAngle));
    
    let evadeAngle;
    let evasionPriority = 0;
    
    if (angleToBehind < angleToLeft && angleToBehind < angleToRight) {
      evadeAngle = directionBehind;
      evasionPriority = 0;
    } else {
      evadeAngle = angleToLeft < angleToRight ? leftAngle : rightAngle;
      evasionPriority = 1;
    }
    
    // Calculate evasion intensity
    const normalizedDist = Math.max(0, settings.meleeLock_.evasionRange_ - distanceToMeleeEnemy) / settings.meleeLock_.evasionRange_;
    const evasionIntensity = normalizedDist * normalizedDist;
    const evasionWeight = (settings.meleeLock_.evasionStrength_ / 100) * evasionIntensity;
    
    // Rotate movement angle towards evasion angle
    let angleDiff = normalizeAngleDiff(evadeAngle - forwardAngle);
    movementAngle = forwardAngle + angleDiff * evasionWeight;
    
    // Add circular movement component when at optimal evasion distance
    if (evasionPriority === 1) {
      const circlePhase = (Date.now() * 0.002) % (2 * Math.PI);
      const circleAmount = 0.3;
      const circleAngle = normalizeAngleDiff((circlePhase + (evasionWeight > 0.5 ? Math.PI : 0)) - movementAngle);
      movementAngle += circleAngle * circleAmount * evasionIntensity;
    }
  }
  
  // Calculate final approach direction from angle
  const approachX = Math.cos(movementAngle);
  const approachY = Math.sin(movementAngle);

  let moveDir;
  
  // Apply random strafe if enabled
  if (settings.meleeLock_.enableStrafe_) {
    const strafeChancePct = settings.meleeLock_.strafeChance_ / 100;
    const strafeRoll = Math.random();
    let strafeX = 0, strafeY = 0;
    
    if (strafeRoll < strafeChancePct * 0.5) {
      // Strafe right
      const strafeIntensity = settings.meleeLock_.strafeIntensity_ / 100;
      strafeX = Math.sin(forwardAngle) * strafeIntensity;
      strafeY = -Math.cos(forwardAngle) * strafeIntensity;
    } else if (strafeRoll < strafeChancePct) {
      // Strafe left
      const strafeIntensity = settings.meleeLock_.strafeIntensity_ / 100;
      strafeX = -Math.sin(forwardAngle) * strafeIntensity;
      strafeY = Math.cos(forwardAngle) * strafeIntensity;
    }

    // Combine approach + strafe
    const combinedX = approachX + strafeX;
    const combinedY = approachY + strafeY;
    
    // Normalize combined direction to maintain full movement speed
    const combinedLen = Math.hypot(combinedX, combinedY);
    const normalizedX = combinedLen > 0 ? combinedX / combinedLen : approachX;
    const normalizedY = combinedLen > 0 ? combinedY / combinedLen : approachY;

    moveDir = {
      touchMoveActive: true,
      touchMoveLen: 255,
      x: normalizedX,
      y: normalizedY,
    };
  } else {
    // No strafe
    moveDir = {
      touchMoveActive: true,
      touchMoveLen: 255,
      x: approachX,
      y: approachY,
    };
  }

  const screenPos = game[translations.camera_][translations.pointToScreen_]({
    x: targetPos.x,
    y: targetPos.y,
  });
  
  setAimState(new AimState('meleeLock', { x: screenPos.x, y: screenPos.y }, moveDir, true));
  
  // Auto Attack triggers melee autofire when melee lock is active
  if (settings.aimbot_.autoAttack_) {
    setAutoAttackFire(true);
  }

  return {
    aimUpdated: true,
    meleeLockEnemy_: meleeEnemy,
    meleeLockEnemy_lastOutOfRangeTime_: state.meleeLockEnemy_lastOutOfRangeTime_,
  };
}

export function getMeleeLockEnemy() {
  return state.meleeLockEnemy_;
}

export function resetMeleeLockState() {
  state.meleeLockEnemy_ = null;
  state.meleeLockEnemy_lastOutOfRangeTime_ = 0;
}

export function setMeleeLockPreviousEnemies(prevEnemies) {
  state.previousEnemies_ = prevEnemies;
}

export default function () {
  // MeleeLock module initialization (if needed)
}
