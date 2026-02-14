import { settings, getUIRoot, inputState, aimState } from '@/core/state.js';
import { findTeam, findBullet, findWeapon, inputCommands, isWeaponReloading } from '@/utils/constants.js';
import { gameManager } from '@/core/state.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';
import { ref_addEventListener } from '@/core/hook.js';
import { isLayerSpoofActive, originalLayerValue } from '@/features/LayerSpoofer.js';
import { updateAutoCrateBreak } from '@/features/AutoCrateBreak.js';
import {
  AimState,
  setAimState,
  getCurrentAimPosition,
  getPing,
  aimOverlays,
} from '@/core/aimController.js';
import { outerDocument, outer } from '@/core/outer.js';
import { v2, collisionHelpers, sameLayer } from '@/utils/math.js';
import { setAutoAttackFire } from '@/features/AutoFire.js';
import { updatePanHero } from '@/features/PanHero.js';

export let autoAttackEnabled = false;

const isBypassLayer = (layer) => layer === 2 || layer === 3;

const state = {
  focusedEnemy_: null,
  previousEnemies_: {},
  currentEnemy_: null,
  meleeLockEnemy_: null,
  meleeLockEnemy_lastOutOfRangeTime_: 0,
  velocityBuffer_: {},
  velocitySmoothed_: {},
  accelerationBuffer_: {},
  fpsBuffer_: [],
  lastTargetScreenPos_: null,
  isCurrentEnemyShootable_: false,
  lastAim: { x: 0, y: 0 },
  lastUpdateTime: Date.now(),
};

const AIM_SMOOTH_DISTANCE_PX = 4; // Tighter smoothing for precision
const AIM_SMOOTH_ANGLE = Math.PI / 100; // More aggressive angle smoothing
const MELEE_ENGAGE_DISTANCE = 5.5;
const MELEE_LOCK_GRACE_PERIOD = 1000;
const MELEE_PREDICTION_ENABLED = true;
const MAX_VELOCITY_DELTA = 200; // Detect jumps (teleports)
const VELOCITY_SMOOTHING = 0.78; // Increased Kalman gain for faster response
const VELOCITY_SMOOTHING_ACCEL = 0.85; // Higher gain for acceleration detection
const ACCELERATION_INFLUENCE = 0.15; // Increased from 0.05 for better trajectory
const HISTORY_SIZE = 15; // Increased from 8 for better trend fitting
const FPS_BUFFER_SIZE = 12;

const computeAimAngle = (point) => {
  if (!point) return 0;
  const centerX = outer.innerWidth / 2;
  const centerY = outer.innerHeight / 2;
  return Math.atan2(point.y - centerY, point.x - centerX);
};

const normalizeAngle = (angle) => Math.atan2(Math.sin(angle), Math.cos(angle));

const shouldSmoothAim = (currentPos, nextPos) => {
  if (!nextPos) return false;
  if (!currentPos) return true;

  const distance = Math.hypot(nextPos.x - currentPos.x, nextPos.y - currentPos.y);
  
  // More aggressive smoothing thresholds for better tracking
  if (distance > AIM_SMOOTH_DISTANCE_PX) return true;

  const angleDiff = Math.abs(
    normalizeAngle(computeAimAngle(nextPos) - computeAimAngle(currentPos))
  );
  return angleDiff > AIM_SMOOTH_ANGLE;
};

const getLocalLayer = (player) => {
  if (isBypassLayer(player.layer)) return player.layer;
  if (isLayerSpoofActive && originalLayerValue !== undefined) return originalLayerValue;
  return player.layer;
};

const meetsLayerCriteria = (targetLayer, localLayer, isLocalOnBypass) => {
  if (isBypassLayer(targetLayer) || isLocalOnBypass) return true;
  return targetLayer === localLayer;
};

const isPlayerHealing = (player) => {
  if (!player) return false;
  
  const netData = player[translations.netData_];
  const activeWeapon = netData?.[translations.activeWeapon_];
  
  if (!activeWeapon) return false;
  
  // Check if active weapon is a healing item
  const weaponLower = activeWeapon.toLowerCase();
  return (
    weaponLower.includes('bandage') || 
    weaponLower.includes('health') || 
    weaponLower.includes('medkit') || 
    weaponLower.includes('soda') || 
    weaponLower.includes('pill') ||
    weaponLower.includes('painkiller')
  );
};

const BLOCKING_OBSTACLE_PATTERNS = [
  'metal_wall_',
  'brick_wall_',
  'concrete_wall_',
  'stone_wall_',
  'container_wall_',
  '_wall_int_',
  'bank_wall_',
  'barn_wall_',
  'cabin_wall_',
  'hut_wall_',
  'house_wall_',
  'mansion_wall_',
  'police_wall_',
  'shack_wall_',
  'outhouse_wall_',
  'teahouse_wall_',
  'warehouse_wall_',
  'silo_',
  'bollard_',
  'sandbags_',
  'hedgehog',
  'tree_',
  'stone_01',
  'stone_02',
  'stone_03',
  'stone_04',
  'stone_05',
  'stone_06',
  'stone_07',
  'stone_08',
  'stone_09',
  'stone_0',
  'crate_',
];

const NON_BLOCKING_OBSTACLE_PATTERNS = [
  'bush_',
  'brush_',
  'barrel_',
  'refrigerator_',
  'control_panel_',
  'chest_',
  'case_',
  'oven_',
  'bed_',
  'bookshelf_',
  'couch_',
  'table_',
  'drawers_',
  'window',
  'glass_wall_',
  'locker_',
  'deposit_box_',
  'toilet_',
  'pot_',
  'planter_',
  'pumpkin_',
  'potato_',
  'egg_',
  'woodpile_',
  'decal',
];

const isObstacleBlocking = (obstacle) => {
  if (obstacle.collidable === false) return false;

  const obstacleType = obstacle.type || '';

  if (obstacle.isWall === true) return true;

  if (obstacle.destructible === false) return true;

  for (const pattern of BLOCKING_OBSTACLE_PATTERNS) {
    if (obstacleType.includes(pattern)) return true;
  }

  for (const pattern of NON_BLOCKING_OBSTACLE_PATTERNS) {
    if (obstacleType.includes(pattern)) return false;
  }

  if (obstacle.health !== undefined && obstacle.health > 200) {
    return true;
  }

  return false;
};

const canCastToPlayer = (localPlayer, targetPlayer, weapon, bullet) => {
  // Simplified version: basic collision check
  if (!settings.aimbot_.wallcheck_) {
    return true;
  }

  if (!weapon || !bullet) {
    return true;
  }

  const game = gameManager.game;
  const idToObj = game?.[translations.objectCreator_]?.[translations.idToObj_];
  if (!idToObj) {
    return true;
  }

  const trueLayer =
    isLayerSpoofActive && originalLayerValue !== undefined ? originalLayerValue : localPlayer.layer;

  const playerPos = localPlayer[translations.visualPos_];
  const targetPos = targetPlayer[translations.visualPos_];

  const dx = targetPos.x - playerPos.x;
  const dy = targetPos.y - playerPos.y;
  const aimAngle = Math.atan2(dy, dx);

  const dir = v2.create_(Math.cos(aimAngle), Math.sin(aimAngle));
  const maxDistance = Math.hypot(dx, dy);

  // Adaptive raycount based on distance for better accuracy and performance
  let rayCount = 3;
  if (maxDistance < 30) {
    rayCount = 5; // Close targets: more rays for precision
  } else if (maxDistance < 80) {
    rayCount = 4; // Medium distance: balanced
  } else if (maxDistance > 150) {
    rayCount = 2; // Far targets: fewer rays for speed
  }
  
  const allObstacles = Object.values(idToObj).filter((obj) => {
    if (!obj.collider) return false;
    if (obj.dead) return false;
    if (obj.layer !== undefined && !sameLayer(obj.layer, trueLayer)) return false;
    return true;
  });

  const blockingObstacles = allObstacles.filter(isObstacleBlocking);

  if (blockingObstacles.length === 0) {
    return true;
  }

  // Require majority of rays to be clear
  let clearRayCount = 0;
  
  for (let i = 0; i < rayCount; i++) {
    const t = rayCount === 1 ? 0.5 : i / (rayCount - 1);
    const rayAngle = aimAngle - (weapon.shotSpread || 0) * (Math.PI / 180) / 2 + 
                     (weapon.shotSpread || 0) * (Math.PI / 180) * t;
    const rayDir = v2.create_(Math.cos(rayAngle), Math.sin(rayAngle));

    const endPos = v2.add_(playerPos, v2.mul_(rayDir, maxDistance));
    let blocked = false;

    for (const obstacle of blockingObstacles) {
      const collision = collisionHelpers.intersectSegment_(obstacle.collider, playerPos, endPos);
      if (collision) {
        const distToCollision = v2.length_(v2.sub_(collision.point, playerPos));
        if (distToCollision < maxDistance - 0.3) {
          blocked = true;
          break;
        }
      }
    }

    if (!blocked) {
      clearRayCount++;
    }
  }

  // Stricter wallcheck: require more rays clear for close targets (precision)
  const wallcheckThreshold = maxDistance < 50 ? 0.8 : 0.5;
  return clearRayCount >= rayCount * wallcheckThreshold;
};

const queueInput = (command) => inputState.queuedInputs_.push(command);

const handleKeydown = (event) => {
  if (event.code !== settings.keybinds_.toggleStickyTarget_) return;
  if (state.focusedEnemy_) {
    state.focusedEnemy_ = null;
    setAimState(new AimState('idle', null, null, true));
    return;
  }
  if (settings.aimbot_.stickyTarget_) {
    state.focusedEnemy_ = state.currentEnemy_;
  }
};

Reflect.apply(ref_addEventListener, outer, ['keydown', handleKeydown]);

let tickerAttached = false;

function getDistance(x1, y1, x2, y2) {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

function calcAngle(playerPos, mePos) {
  const dx = mePos.x - playerPos.x;
  const dy = mePos.y - playerPos.y;

  return Math.atan2(dy, dx);
}

function lerp(x, x2, i) {
  return x * (1.0 - i) + x2 * i;
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
        return {
          x: (enemy.collider.min.x + enemy.collider.max.x) / 2 + visualPos.x,
          y: (enemy.collider.min.y + enemy.collider.max.y) / 2 + visualPos.y,
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
 * @param {Object} mePos - Player position {x, y}
 * @param {Object} enemyPos - Enemy position {x, y}
 * @param {Object} targetPos - Target position to project {x, y}
 * @returns {Object} Projected position on line player→enemy, clamped within segment
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
 * @param {Object} mePos - Player position {x, y}
 * @param {Object} enemyPos - Enemy position {x, y}
 * @param {Object} targetPos - Target position to verify {x, y}
 * @param {number} tolerance - Maximum acceptable distance from line (pixels)
 * @returns {Object} Corrected position if out of tolerance, otherwise original
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

function predictPosition(enemy, currentPlayer) {
  if (!enemy || !currentPlayer) return null;

  const enemyPos = enemy[translations.visualPos_];
  const currentPlayerPos = currentPlayer[translations.visualPos_];
  
  // Store position history with timestamps for better velocity calculation
  const enemyId = enemy.__id;
  const history = state.previousEnemies_[enemyId] ?? (state.previousEnemies_[enemyId] = []);
  
  const now = performance.now();
  history.push({ t: now, x: enemyPos.x, y: enemyPos.y });
  
  // Keep up to 15 frames of history for better velocity trend detection
  if (history.length > HISTORY_SIZE) history.shift();
  
  // Initialize smoothed velocity if not exists
  if (!state.velocitySmoothed_[enemyId]) {
    state.velocitySmoothed_[enemyId] = { vx: 0, vy: 0 };
  }
  if (!state.accelerationBuffer_[enemyId]) {
    state.accelerationBuffer_[enemyId] = { ax: 0, ay: 0 };
  }
  
  // Need at least 2 history points, but prefer 3+
  if (history.length < 2) {
    return gameManager.game[translations.camera_][translations.pointToScreen_]({ x: enemyPos.x, y: enemyPos.y });
  }

  // Step 1: Calculate raw velocity using exponentially-weighted average
  let rawVx = 0, rawVy = 0;
  let totalWeight = 0;
  let validFrames = 0;
  
  // Exponential weighting favors recent frames more smoothly
  for (let i = 1; i < history.length; i++) {
    const dt = (history[i].t - history[i-1].t) / 1000; // Convert to seconds
    if (dt > 0.0001 && dt < 0.1) { // Ignore huge dt (lost focus)
      const dx = history[i].x - history[i-1].x;
      const dy = history[i].y - history[i-1].y;
      const frameDist = Math.hypot(dx, dy);
      
      // Detect jump/teleport (server-side position correction)
      if (frameDist > MAX_VELOCITY_DELTA) {
        continue; // Skip this frame
      }
      
      // Exponential weighting: most recent frame has highest weight (2.5x curve)
      const normalizedIdx = i / history.length; // 0 to 1
      const weight = Math.exp(normalizedIdx * 2.5) - 1; // Exponential for better recency
      
      rawVx += (dx / dt) * weight;
      rawVy += (dy / dt) * weight;
      totalWeight += weight;
      validFrames++;
    }
  }
  
  if (totalWeight > 0 && validFrames > 0) {
    rawVx /= totalWeight;
    rawVy /= totalWeight;
  }

  // Step 2: Smooth velocity using adaptive Kalman-like filter
  const prevSmoothed = state.velocitySmoothed_[enemyId];
  
  // Use higher damping when velocity changes suddenly (acceleration detected)
  const velocityChange = Math.hypot(rawVx - prevSmoothed.vx, rawVy - prevSmoothed.vy);
  const adaptiveGain = velocityChange > 50 ? VELOCITY_SMOOTHING_ACCEL : VELOCITY_SMOOTHING;
  
  let smoothVx = prevSmoothed.vx + adaptiveGain * (rawVx - prevSmoothed.vx);
  let smoothVy = prevSmoothed.vy + adaptiveGain * (rawVy - prevSmoothed.vy);
  
  // Store smoothed velocity for next frame
  state.velocitySmoothed_[enemyId] = { vx: smoothVx, vy: smoothVy };
  
  // Step 3: Apply velocity decay if no recent movement (inertia dampening)
  if (validFrames === 0 || rawVx === 0 && rawVy === 0) {
    // Enemy stopped or data unreliable - gradually reduce velocity
    smoothVx *= 0.95;
    smoothVy *= 0.95;
  }

  // Step 4: Detect acceleration and apply stronger correction for rapid direction changes
  const prevAccel = state.accelerationBuffer_[enemyId];
  let accelX = (smoothVx - prevSmoothed.vx) * 60; // Normalize to ~60fps
  let accelY = (smoothVy - prevSmoothed.vy) * 60;
  
  // Smooth acceleration with lower dampening to respond quicker to changes
  accelX = prevAccel.ax * 0.5 + accelX * 0.5;
  accelY = prevAccel.ay * 0.5 + accelY * 0.5;
  state.accelerationBuffer_[enemyId] = { ax: accelX, ay: accelY };
  
  // Apply increased acceleration correction for better tracking of sudden movements
  smoothVx += accelX * ACCELERATION_INFLUENCE;
  smoothVy += accelY * ACCELERATION_INFLUENCE;

  const weapon = findWeapon(currentPlayer);
  const bullet = findBullet(weapon);
  let bulletSpeed = bullet?.speed || 1000;
  
  // Step 5: Improve bullet speed scaling with running FPS average
  const lastFrameTime = history.length > 1 ? (history[history.length-1].t - history[history.length-2].t) : 16;
  const currentFPS = lastFrameTime > 0 ? 1000 / lastFrameTime : 60;
  
  // Keep running average of FPS for stability
  state.fpsBuffer_.push(currentFPS);
  if (state.fpsBuffer_.length > FPS_BUFFER_SIZE) state.fpsBuffer_.shift();
  
  const avgFPS = state.fpsBuffer_.reduce((a, b) => a + b, 0) / state.fpsBuffer_.length;
  const fpsScale = Math.max(0.6, Math.min(2.5, 60 / avgFPS)); // Clamp between 0.6x and 2.5x (improved from 0.5-3)
  
  bulletSpeed = bulletSpeed * fpsScale;

  const dx = enemyPos.x - currentPlayerPos.x;
  const dy = enemyPos.y - currentPlayerPos.y;
  const distance = Math.hypot(dx, dy);
  
  // Handle case where velocity is zero or bullet is too slow
  if (bulletSpeed <= 0) {
    return gameManager.game[translations.camera_][translations.pointToScreen_]({ x: enemyPos.x, y: enemyPos.y });
  }

  // Step 6: Solve for intercept time with improved prediction accuracy
  // Use current smoothed velocity + slight acceleration for better prediction
  // Quadratic: (vx*t - dx)² + (vy*t - dy)² = (bulletSpeed*t)²
  
  // Include small amount of acceleration in intercept calculation
  const predictedVx = smoothVx + accelX * 0.08;
  const predictedVy = smoothVy + accelY * 0.08;
  
  const a = predictedVx * predictedVx + predictedVy * predictedVy - bulletSpeed * bulletSpeed;
  const b = 2 * (dx * predictedVx + dy * predictedVy);
  const c = dx * dx + dy * dy;

  let t = 0;
  
  if (Math.abs(a) > 0.0001) {
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant >= 0) {
      const sqrtD = Math.sqrt(discriminant);
      const t1 = (-b - sqrtD) / (2 * a);
      const t2 = (-b + sqrtD) / (2 * a);
      
      // Choose the smallest positive time (most accurate intercept)
      const validTimes = [t1, t2].filter(ti => ti > 0.001);
      if (validTimes.length > 0) {
        t = Math.min(...validTimes);
      } else {
        return gameManager.game[translations.camera_][translations.pointToScreen_]({ x: enemyPos.x, y: enemyPos.y });
      }
    } else {
      // No real solution, aim at current position
      return gameManager.game[translations.camera_][translations.pointToScreen_]({ x: enemyPos.x, y: enemyPos.y });
    }
  } else {
    // Linear equation (a ≈ 0)
    if (Math.abs(b) > 0.0001) {
      t = -c / b;
      if (t < 0.001) {
        return gameManager.game[translations.camera_][translations.pointToScreen_]({ x: enemyPos.x, y: enemyPos.y });
      }
    }
  }

  // Step 7: Calculate predicted position with smoothed velocity and acceleration influence
  const predictedPos = {
    x: enemyPos.x + smoothVx * t + accelX * t * t * 0.5 * ACCELERATION_INFLUENCE,
    y: enemyPos.y + smoothVy * t + accelY * t * t * 0.5 * ACCELERATION_INFLUENCE,
  };

  // Convert to screen coordinates
  const screenPos = gameManager.game[translations.camera_][translations.pointToScreen_](predictedPos);
  
  return screenPos;
}

function findTarget(players, me) {
  const meTeam = findTeam(me);
  const isLocalOnBypassLayer = isBypassLayer(me.layer);
  const localLayer = getLocalLayer(me);

  // Sort enemies by distance to mouse (surviv-cheat style)
  let validEnemies = [];
  
  for (const player of players) {
    if (!player.active) continue;
    if (player[translations.netData_][translations.dead_]) continue;
    if (!settings.aimbot_.targetKnocked_ && player.downed) continue;
    if (me.__id === player.__id) continue;
    if (!meetsLayerCriteria(player.layer, localLayer, isLocalOnBypassLayer)) continue;
    if (findTeam(player) === meTeam) continue;
    
    validEnemies.push(player);
  }

  // Sort by distance to mouse position
  if (validEnemies.length === 0) return null;

  const mousePos = gameManager.game[translations.input_].mousePos;
  validEnemies.sort((a, b) => {
    const screenPosA = gameManager.game[translations.camera_][translations.pointToScreen_]({
      x: a[translations.visualPos_].x,
      y: a[translations.visualPos_].y,
    });
    const screenPosB = gameManager.game[translations.camera_][translations.pointToScreen_]({
      x: b[translations.visualPos_].x,
      y: b[translations.visualPos_].y,
    });
    
    const distA = getDistance(screenPosA.x, screenPosA.y, mousePos._x, mousePos._y);
    const distB = getDistance(screenPosB.x, screenPosB.y, mousePos._x, mousePos._y);
    
    return distA - distB;
  });

  return validEnemies[0];
}

function findClosestTarget(players, me) {
  const meTeam = findTeam(me);
  const isLocalOnBypassLayer = isBypassLayer(me.layer);
  const localLayer = getLocalLayer(me);
  let enemy = null;
  let minDistance = Infinity;

  for (const player of players) {
    if (!player.active) continue;
    if (player[translations.netData_][translations.dead_]) continue;
    if (!settings.aimbot_.targetKnocked_ && player.downed) continue;
    if (me.__id === player.__id) continue;
    if (!meetsLayerCriteria(player.layer, localLayer, isLocalOnBypassLayer)) continue;
    if (findTeam(player) === meTeam) continue;

    const mePos = me[translations.visualPos_];
    const playerPos = player[translations.visualPos_];
    const distance = getDistance(mePos.x, mePos.y, playerPos.x, playerPos.y);

    if (distance < minDistance) {
      minDistance = distance;
      enemy = player;
    }
  }

  return enemy;
}

function cleanupOldEnemyData() {
  // Clean up old position history for enemies no longer in game
  const now = performance.now();
  const MAX_DATA_AGE = 5000; // 5 seconds
  
  for (const enemyId in state.previousEnemies_) {
    const history = state.previousEnemies_[enemyId];
    if (history.length > 0) {
      const lastUpdate = history[history.length - 1].t;
      if (now - lastUpdate > MAX_DATA_AGE) {
        delete state.previousEnemies_[enemyId];
        delete state.velocitySmoothed_[enemyId];
        delete state.accelerationBuffer_[enemyId];
      }
    }
  }
}

function aimbotTicker() {
  try {
    // Periodic cleanup of old enemy data to prevent memory leaks
    if (state.lastUpdateTime && performance.now() - state.lastUpdateTime > 1000) {
      cleanupOldEnemyData();
      state.lastUpdateTime = performance.now();
    }
    
    const game = gameManager.game;
    if (
      !game.initialized ||
      !(settings.aimbot_.enabled_ || settings.meleeLock_.enabled_) ||
      game[translations.uiManager_].spectating
    ) {
      setAimState(new AimState('idle'));
      aimOverlays.hideAll();
      state.lastTargetScreenPos_ = null;
      return;
    }

    // Initialize lastAim to current mouse position on first tick
    if (state.lastAim.x === 0 && state.lastAim.y === 0) {
      state.lastAim.x = gameManager.game[translations.input_].mousePos._x;
      state.lastAim.y = gameManager.game[translations.input_].mousePos._y;
    }

    const players = game[translations.playerBarn_].playerPool[translations.pool_];
    const me = game[translations.activePlayer_];
    const isLocalOnBypassLayer = isBypassLayer(me.layer);
    let aimUpdated = false;
    let dotTargetPos = null;
    let previewTargetPos = null;
    let isDotTargetShootable = false;

    try {
      const currentWeaponIndex =
        game[translations.activePlayer_][translations.localData_][translations.curWeapIdx_];
      const isMeleeEquipped = currentWeaponIndex === 2;
      const isGrenadeEquipped = currentWeaponIndex === 3;
      const isAiming = game[translations.inputBinds_].isBindDown(inputCommands.Fire_);
      
      // Auto Attack also triggers melee lock automatically
      const wantsMeleeLock = settings.meleeLock_.enabled_ && (isAiming || settings.aimbot_.autoAttack_);

      let meleeEnemy = state.meleeLockEnemy_;
      if (wantsMeleeLock) {
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
      } else {
        meleeEnemy = null;
        state.meleeLockEnemy_ = null;
        state.meleeLockEnemy_lastOutOfRangeTime_ = 0;
      }

      let distanceToMeleeEnemy = Infinity;
      if (meleeEnemy) {
        const mePos = me[translations.visualPos_];
        const enemyPos = meleeEnemy[translations.visualPos_];
        distanceToMeleeEnemy = Math.hypot(mePos.x - enemyPos.x, mePos.y - enemyPos.y);
      }

      // Check if melee target is within engagement range
      const meleeTargetInRange = distanceToMeleeEnemy <= MELEE_ENGAGE_DISTANCE;
      
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

      if (meleeLockActive) {
        const mePos = me[translations.visualPos_];
        const enemyPos = meleeEnemy[translations.visualPos_];

        const weapon = findWeapon(me);
        const bullet = findBullet(weapon);
        const isMeleeTargetShootable =
          !settings.aimbot_.wallcheck_ || canCastToPlayer(me, meleeEnemy, weapon, bullet);

        if (isMeleeTargetShootable) {
          // Get enemy body center for melee lock targeting
          const bodyCenter = getEnemyBodyCenter(meleeEnemy) || enemyPos;
          
          // Apply predictive positioning for smoother melee lock targeting
          let targetPos = bodyCenter;
          
          if (MELEE_PREDICTION_ENABLED) {
            // Use more aggressive prediction for melee targets
            const enemyId = meleeEnemy.__id;
            const history = state.previousEnemies_[enemyId] ?? (state.previousEnemies_[enemyId] = []);
            const now = performance.now();
            
            history.push([now, { ...enemyPos }]);
            if (history.length > 4) history.shift();
            
            // Only predict if we have enough history
            if (history.length >= 3) {
              let vx = 0, vy = 0;
              
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
              
              // Apply short-term prediction (80ms ahead) for melee, from body center
              const predictionTime = 0.08;
              targetPos = {
                x: bodyCenter.x + vx * predictionTime,
                y: bodyCenter.y + vy * predictionTime,
              };
            }
          }

          // Apply collinearity optimization: ensure 3 points (player - targetPos - enemy) are collinear
          // This aligns melee lock aim to the vector player→enemy for optimal hitbox alignment
          // Using Method 2 (cross-product check) - ensures points stay within tolerance of the line
          targetPos = ensureCollinear(mePos, enemyPos, targetPos, 2.0);

          // Calculate base forward movement direction towards enemy
          const forwardAngle = calcAngle(targetPos, mePos) + Math.PI;
          const forwardX = Math.cos(forwardAngle);
          const forwardY = Math.sin(forwardAngle);

          // Calculate evasion (dodge enemy's melee range)
          // Use angle-based blending instead of vector blending to maintain full movement speed
          let movementAngle = forwardAngle;
          
          if (settings.meleeLock_.enableEvasion_ && distanceToMeleeEnemy < settings.meleeLock_.evasionRange_) {
            // We're within enemy's melee danger zone - evade by rotating movement direction
            // Calculate enemy's facing angle
            const enemyFacingAngle = Math.atan2(meleeEnemy[translations.dir_].x, meleeEnemy[translations.dir_].y) - Math.PI / 2;
            const directionBehind = enemyFacingAngle + Math.PI;
            
            // Calculate which side (left/right) brings us closer to behind
            const leftAngle = forwardAngle + Math.PI / 2;
            const rightAngle = forwardAngle - Math.PI / 2;
            const distToLeftBehind = Math.abs(leftAngle - directionBehind);
            const distToRightBehind = Math.abs(rightAngle - directionBehind);
            
            const evadeAngle = distToLeftBehind < distToRightBehind ? leftAngle : rightAngle;
            
            // Blend angles instead of vectors to maintain full movement speed
            const evasionIntensity = Math.max(0, (settings.meleeLock_.evasionRange_ - distanceToMeleeEnemy) / settings.meleeLock_.evasionRange_);
            const evasionWeight = (settings.meleeLock_.evasionStrength_ / 100) * evasionIntensity;
            
            // Rotate movement angle towards evasion angle
            let angleDiff = evadeAngle - forwardAngle;
            // Normalize angle difference to -PI..PI
            while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
            while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
            movementAngle = forwardAngle + angleDiff * evasionWeight;
          }
          
          // Calculate final approach direction from angle (always unit vector, full speed)
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

            // Combine approach (with evasion) + strafe
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
            // No strafe - just use approach direction (with evasion if applicable)
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
          
          aimUpdated = true;
          aimOverlays.hideAll();
          state.lastTargetScreenPos_ = null;
          return;
        }
      } else {
        // Stop melee autofire when melee lock is not active
        setAutoAttackFire(false);
      }

      if (wantsMeleeLock && !meleeTargetInRange) {
        state.meleeLockEnemy_ = null;
      }

      // AUTO CRATE BREAK: Move to and break crates automatically
      const crateBreakState = updateAutoCrateBreak(me);
      if (crateBreakState && settings.autoCrateBreak_?.enabled_) {
        // Auto Crate Break takes control
        setAimState(crateBreakState);
        aimOverlays.hideAll();
        state.lastTargetScreenPos_ = null;
        aimState.silentAimAngle_ = null;
        return; // Skip all other aim logic
      }

      // PAN HERO: Face 135° away from enemy when not firing
      if (!isAiming && settings.panHero_?.enabled_) {
        const panHeroState = updatePanHero(me);
        if (panHeroState) {
          setAimState(panHeroState);
          aimOverlays.hideAll();
          state.lastTargetScreenPos_ = null;
          return;
        }
      }

      if (!settings.aimbot_.enabled_ || isGrenadeEquipped) {
        setAimState(new AimState('idle'));
        aimOverlays.hideAll();
        state.lastTargetScreenPos_ = null;
        return;
      }
      const canEngageAimbot = isAiming || settings.aimbot_.autoAttack_;
      let enemy =
        state.focusedEnemy_?.active &&
          !state.focusedEnemy_[translations.netData_][translations.dead_]
          ? state.focusedEnemy_
          : null;
      if (enemy) {
        const localLayer = getLocalLayer(me);
        if (!meetsLayerCriteria(enemy.layer, localLayer, isLocalOnBypassLayer)) {
          enemy = null;
          state.focusedEnemy_ = null;
          setAimState(new AimState('idle', null, null, true));
        }
      }
      if (!enemy) {
        if (state.focusedEnemy_) {
          state.focusedEnemy_ = null;
          setAimState(new AimState('idle', null, null, true));
        }
        enemy = findTarget(players, me);
        state.currentEnemy_ = enemy;
      }
      if (enemy) {
        const mePos = me[translations.visualPos_];
        const enemyPos = enemy[translations.visualPos_];
        const distanceToEnemy = Math.hypot(mePos.x - enemyPos.x, mePos.y - enemyPos.y);
        if (enemy !== state.currentEnemy_ && !state.focusedEnemy_) {
          state.currentEnemy_ = enemy;
          state.previousEnemies_[enemy.__id] = [];
        }
        
        const predictedPos = predictPosition(enemy, me);
        if (!predictedPos) {
          setAimState(new AimState('idle'));
          aimOverlays.hideAll();
          state.lastTargetScreenPos_ = null;
          return;
        }
        previewTargetPos = { x: predictedPos.x, y: predictedPos.y };
        const weapon = findWeapon(me);
        const bullet = findBullet(weapon);
        const isTargetShootable =
          !settings.aimbot_.wallcheck_ || canCastToPlayer(me, enemy, weapon, bullet);
        // Update state for shootable status
        state.isCurrentEnemyShootable_ = isTargetShootable;
        // Check if target is within bullet range
        const bulletRange = bullet?.distance || Infinity;
        const isWithinRange = distanceToEnemy <= bulletRange;
        if (settings.aimbot_.autoAttack_) {
          console.log(`[AutoAttack] distance=${distanceToEnemy.toFixed(1)}, range=${bulletRange}, shootable=${isTargetShootable}, within=${isWithinRange}`);
        }
        
        // autoAttack ignores wallcheck to aim through walls (surviv-cheat style)
        const shouldIgnoreWallcheck = settings.aimbot_.autoAttack_;
        // For aiming: autoAttack ignores wallcheck, others follow wallcheck setting
        const canAimAtTarget = shouldIgnoreWallcheck || !settings.aimbot_.wallcheck_ || isTargetShootable;
        
        // Auto Attack will only fire after we verify aim is successfully set to target
        let shouldAutoAttackFire = false;
        
        if (
          canEngageAimbot &&
          (settings.aimbot_.enabled_ || (settings.meleeLock_.enabled_ && distanceToEnemy <= 8))
        ) {
          // For autoAttack: always aim even if not shootable (aim ignores wall), but fire only if shootable
          const shouldAim = canAimAtTarget || (settings.aimbot_.autoAttack_ && !isMeleeEquipped);
          
          if (shouldAim) {
            const currentAimPos = getCurrentAimPosition();
            
            // Direct aim at predicted position
            setAimState(
              new AimState('aimbot', { x: predictedPos.x, y: predictedPos.y }, null, false)
            );
            state.lastTargetScreenPos_ = { x: predictedPos.x, y: predictedPos.y };
            state.lastUpdateTime = Date.now();
            aimUpdated = true;
            const aimSnapshot = aimState.lastAimPos_;
            dotTargetPos = aimSnapshot
              ? { x: aimSnapshot.clientX, y: aimSnapshot.clientY }
              : { x: predictedPos.x, y: predictedPos.y };
            isDotTargetShootable = isTargetShootable;
            
            // Auto attack fire: only if shootable (wallcheck) AND within range AND not healing
            // Aim ignores wall, but fire respects wallcheck
            // When healing, stop firing but continue aiming
            if (settings.aimbot_.autoAttack_ && !isMeleeEquipped && isTargetShootable && isWithinRange && !isPlayerHealing(me)) {
              shouldAutoAttackFire = true;
            }
          } else {
            dotTargetPos = { x: predictedPos.x, y: predictedPos.y };
            isDotTargetShootable = false;
          }
        } else {
          dotTargetPos = { x: predictedPos.x, y: predictedPos.y };
          isDotTargetShootable = isTargetShootable;
        }
        
        // Apply auto attack fire
        if (shouldAutoAttackFire) {
          autoAttackEnabled = true;
          setAutoAttackFire(true);
        } else {
          autoAttackEnabled = false;
          setAutoAttackFire(false);
        }
      } else {
        previewTargetPos = null;
        dotTargetPos = null;
        state.lastTargetScreenPos_ = null;
        autoAttackEnabled = false;
        setAutoAttackFire(false);
      }

      if (!aimUpdated) {
        setAimState(new AimState('idle'));
        state.lastTargetScreenPos_ = previewTargetPos
          ? { x: previewTargetPos.x, y: previewTargetPos.y }
          : null;
      }
      let displayPos = dotTargetPos;
      if (!displayPos && previewTargetPos) {
        displayPos = { x: previewTargetPos.x, y: previewTargetPos.y };
      }
      aimOverlays.updateDot(displayPos, isDotTargetShootable, !!state.focusedEnemy_);
    } catch (error) {
      aimOverlays.hideAll();
      setAimState(new AimState('idle', null, null, true));
      state.meleeLockEnemy_ = null;
      state.focusedEnemy_ = null;
      state.currentEnemy_ = null;
      state.lastTargetScreenPos_ = null;
    }
  } catch (error) {
    setAimState(new AimState({ mode: 'idle', immediate: true }));
    state.lastTargetScreenPos_ = null;
  }
}

export function getAimbotShootableState() {
  return state.currentEnemy_ ? state.isCurrentEnemyShootable_ : false;
}

export function hasValidTarget() {
  return state.currentEnemy_ && 
    state.currentEnemy_.active && 
    !state.currentEnemy_[translations.netData_][translations.dead_];
}

export function getCurrentTarget() {
  return state.currentEnemy_;
}

export function isEnemyBehindWall(localPlayer, targetPlayer) {
  return !canCastToPlayer(localPlayer, targetPlayer, null, null);
}

export default function () {
  const startTicker = () => {
    const uiRoot = getUIRoot();
    if (aimOverlays.ensureInitialized(uiRoot)) {
      if (!tickerAttached) {
        gameManager.pixi._ticker.add(aimbotTicker);
        tickerAttached = true;
      }
    } else {
      requestAnimationFrame(startTicker);
    }
  };
  startTicker();
  if (typeof globalThis !== 'undefined') {
    globalThis.__AIMBOT_MODULE__ = {
      hasValidTarget,
      getCurrentTarget,
      isEnemyBehindWall,
      getAimbotShootableState,
    };
  }
}