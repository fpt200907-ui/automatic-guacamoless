/**
 * AimbotClassic - SurMinus Edition (ported from Surplus)
 * Full-featured classic aimbot with FOV and Smooth options
 * Ballistic prediction with ping compensation
 */

import { findTeam, findBullet, findWeapon } from '@/utils/constants.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';
import { gameManager, settings } from '@/core/state.js';
import { isLayerSpoofActive, originalLayerValue } from '@/features/LayerSpoofer.js';
import { getPing } from '@/core/aimController.js';
import { v2, collisionHelpers, sameLayer } from '@/classic/math.js';


const isBypassLayer = (layer) => layer === 2 || layer === 3;

const getLocalLayer = (player) => {
  if (isBypassLayer(player.layer)) return player.layer;
  if (isLayerSpoofActive && originalLayerValue !== undefined) return originalLayerValue;
  return player.layer;
};

const meetsLayerCriteria = (targetLayer, localLayer, isLocalOnBypass) => {
  if (isBypassLayer(targetLayer) || isLocalOnBypass) return true;
  return targetLayer === localLayer;
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
];

const NON_BLOCKING_OBSTACLE_PATTERNS = [
  'tree_',
  'bush_',
  'brush_',
  'crate_',
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
  'stone_01',
  'stone_02',
  'stone_03',
  'stone_04',
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

/**
 * Wallcheck - determine if there's a clear line of sight to target
 * Uses collision helpers from classic math utilities
 */
export function classicCanCastToPlayer(localPlayer, targetPlayer, weapon, bullet) {
  if (!weapon || !bullet) {
    return true;
  }

  const game = gameManager.game;
  const idToObj = game?.[translations.objectCreator_]?.[translations.idToObj_];
  if (!idToObj) {
    return true;
  }

  const BULLET_HEIGHT = 0.25;
  const trueLayer =
    isLayerSpoofActive && originalLayerValue !== undefined ? originalLayerValue : localPlayer.layer;

  const playerPos = localPlayer[translations.visualPos_];
  const targetPos = targetPlayer[translations.visualPos_];

  const dx = targetPos.x - playerPos.x;
  const dy = targetPos.y - playerPos.y;
  const aimAngle = Math.atan2(dy, dx);

  const dir = v2.create_(Math.cos(aimAngle), Math.sin(aimAngle));

  const baseSpread = (weapon.shotSpread || 0) * (Math.PI / 180);
  const generousSpread = baseSpread * 1.5;

  const maxDistance = Math.hypot(dx, dy);

  const rayCount = Math.max(15, Math.ceil((weapon.shotSpread || 0) * 1.5));

  const allObstacles = Object.values(idToObj).filter((obj) => {
    if (!obj.collider) return false;
    if (obj.dead) return false;
    if (obj.height !== undefined && obj.height < BULLET_HEIGHT) return false;
    if (obj.layer !== undefined && !sameLayer(obj.layer, trueLayer)) return false;
    return true;
  });

  const blockingObstacles = allObstacles.filter(isObstacleBlocking);

  if (blockingObstacles.length === 0) {
    return true;
  }

  for (let i = 0; i < rayCount; i++) {
    const t = rayCount === 1 ? 0.5 : i / (rayCount - 1);
    const rayAngle = aimAngle - generousSpread / 2 + generousSpread * t;
    const rayDir = v2.create_(Math.cos(rayAngle), Math.sin(rayAngle));

    const endPos = v2.add_(playerPos, v2.mul_(rayDir, maxDistance));
    let blocked = false;

    for (const obstacle of blockingObstacles) {
      const collision = collisionHelpers.intersectSegment_(obstacle.collider, playerPos, endPos);
      if (collision) {
        const distToCollision = v2.length_(v2.sub_(collision.point, playerPos));
        if (distToCollision < maxDistance - 0.5) {
          blocked = true;
          break;
        }
      }
    }

    if (!blocked) {
      return true;
    }
  }

  return false;
}

/**
 * Predict enemy position using ballistic equation
 * Accounts for bullet speed, enemy velocity, acceleration, and ping
 */
export function classicPredictPosition(enemy, currentPlayer, history) {
  if (!enemy || !currentPlayer) return null;

  const enemyPos = enemy[translations.visualPos_];
  const currentPlayerPos = currentPlayer[translations.visualPos_];
  const game = gameManager.game;

  // Need minimum history for accurate prediction
  if (!history || history.length < 10) {
    const screenPos = game[translations.camera_][translations.pointToScreen_]({
      x: enemyPos.x,
      y: enemyPos.y,
    });
    return screenPos;
  }

  // Calculate velocity from recent history (last 5-10 frames for accuracy)
  const recentHistoryCount = Math.min(10, Math.floor(history.length / 2));
  const recentStart = history.length - recentHistoryCount;
  
  const recentTime = (history[history.length - 1][0] - history[recentStart][0]) / 1000;
  
  if (recentTime <= 0.001) {
    const screenPos = game[translations.camera_][translations.pointToScreen_]({
      x: enemyPos.x,
      y: enemyPos.y,
    });
    return screenPos;
  }

  const recentOldPos = history[recentStart][1];
  const velocity = {
    x: (enemyPos.x - recentOldPos.x) / recentTime,
    y: (enemyPos.y - recentOldPos.y) / recentTime,
  };

  // Calculate acceleration for better prediction (use older history)
  let acceleration = { x: 0, y: 0 };
  if (history.length >= 20) {
    const olderHistoryCount = Math.min(10, Math.floor(history.length / 3));
    const olderStart = history.length - olderHistoryCount;
    const olderRecentStart = Math.max(0, olderStart - 5);
    
    const olderTime = (history[olderStart][0] - history[olderRecentStart][0]) / 1000;
    if (olderTime > 0.001) {
      const olderPos = history[olderRecentStart][1];
      const olderVelocity = {
        x: (history[olderStart][1].x - olderPos.x) / olderTime,
        y: (history[olderStart][1].y - olderPos.y) / olderTime,
      };
      
      const accelTime = (history[history.length - 1][0] - history[olderStart][0]) / 1000;
      if (accelTime > 0.001) {
        acceleration = {
          x: (velocity.x - olderVelocity.x) / accelTime,
          y: (velocity.y - olderVelocity.y) / accelTime,
        };
      }
    }
  }

  // Get bullet speed for ballistic calculation
  const weapon = findWeapon(currentPlayer);
  const bullet = findBullet(weapon);
  const bulletSpeed = bullet?.speed || 1000;

  // Ping compensation
  const ping = (getPing?.() || 50) / 2000; // Convert to seconds

  const vex = velocity.x;
  const vey = velocity.y;
  const aex = acceleration.x;
  const aey = acceleration.y;
  const dx = enemyPos.x - currentPlayerPos.x;
  const dy = enemyPos.y - currentPlayerPos.y;
  const vb = bulletSpeed;

  // Improved ballistic equation with acceleration:
  // (vb² - (vex + aex·t)² - (vey + aey·t)²)t² - 2((vex + aex·t)·dx + (vey + aey·t)·dy)t - (dx² + dy²) = 0
  
  // Simplified coefficient calculation
  const ae2 = aex * aex + aey * aey;
  const veae = 2 * (vex * aex + vey * aey);
  const ve2 = vex * vex + vey * vey;
  const aead = 2 * (aex * dx + aey * dy);
  const vead = 2 * (vex * dx + vey * dy);
  const d2 = dx * dx + dy * dy;

  // Quartic simplification (treat as quadratic for speed)
  const a = vb * vb - ve2 - ae2 / 4;
  const b = -vead - aead / 2;
  const c = -d2;

  let t;

  if (Math.abs(a) < 1e-6) {
    if (Math.abs(b) < 1e-6) {
      t = 0;
    } else {
      t = -c / b;
    }
  } else {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      const screenPos = game[translations.camera_][translations.pointToScreen_]({
        x: enemyPos.x,
        y: enemyPos.y,
      });
      return screenPos;
    }

    const sqrtD = Math.sqrt(discriminant);
    const t1 = (-b - sqrtD) / (2 * a);
    const t2 = (-b + sqrtD) / (2 * a);

    t = Math.min(t1, t2) > 0 ? Math.min(t1, t2) : Math.max(t1, t2);

    if (t < 0 || t > 5) {
      const screenPos = game[translations.camera_][translations.pointToScreen_]({
        x: enemyPos.x,
        y: enemyPos.y,
      });
      return screenPos;
    }
  }

  // Add ping compensation
  t += ping * 0.5; // Half ping for better accuracy

  const predictedPos = {
    x: enemyPos.x + vex * t + 0.5 * aex * t * t,
    y: enemyPos.y + vey * t + 0.5 * aey * t * t,
  };

  return game[translations.camera_][translations.pointToScreen_](predictedPos);
}

/**
 * Find target nearest to mouse within FOV
 * Uses FOV from settings.aimbot_.classicFov_
 */
export function classicFindTarget(players, me) {
  const meTeam = findTeam(me);
  const isLocalOnBypassLayer = isBypassLayer(me.layer);
  const localLayer = getLocalLayer(me);
  let enemy = null;
  let minDistance = Infinity;

  // FOV in pixels (convert degrees to approximate pixels on screen)
  // Classic mode uses classicFov_ setting
  const fovDegrees = settings.aimbot_.classicFov_ || 360;
  const fovPixels = (fovDegrees / 360) * 1000; // Approximate: 360° = 1000px radius
  const fovRadiusSquared = fovPixels * fovPixels;

  const game = gameManager.game;
  const mousePos = game[translations.input_].mousePos;

  for (const player of players) {
    if (!player.active) continue;
    if (player[translations.netData_][translations.dead_]) continue;
    if (!settings.aimbot_.targetKnocked_ && player.downed) continue;
    if (me.__id === player.__id) continue;
    if (!meetsLayerCriteria(player.layer, localLayer, isLocalOnBypassLayer)) continue;
    if (findTeam(player) === meTeam) continue;

    const screenPos = game[translations.camera_][translations.pointToScreen_]({
      x: player[translations.visualPos_].x,
      y: player[translations.visualPos_].y,
    });

    // Calculate distance from mouse
    const dx = screenPos.x - mousePos._x;
    const dy = screenPos.y - mousePos._y;
    const distance = dx * dx + dy * dy;

    // Check if within FOV
    if (distance > fovRadiusSquared) continue;

    // Find closest to mouse
    if (distance < minDistance) {
      minDistance = distance;
      enemy = player;
    }
  }

  return enemy;
}

/**
 * Find closest target in world space
 * Used for melee lock
 */
export function classicFindClosestTarget(players, me) {
  const meTeam = findTeam(me);
  const isLocalOnBypassLayer = isBypassLayer(me.layer);
  const localLayer = getLocalLayer(me);
  let enemy = null;
  let minDistance = Infinity;

  const mePos = me[translations.visualPos_];

  for (const player of players) {
    if (!player.active) continue;
    if (player[translations.netData_][translations.dead_]) continue;
    if (!settings.aimbot_.targetKnocked_ && player.downed) continue;
    if (me.__id === player.__id) continue;
    if (!meetsLayerCriteria(player.layer, localLayer, isLocalOnBypassLayer)) continue;
    if (findTeam(player) === meTeam) continue;

    const playerPos = player[translations.visualPos_];
    const dx = mePos.x - playerPos.x;
    const dy = mePos.y - playerPos.y;
    const distance = dx * dx + dy * dy;

    if (distance < minDistance) {
      minDistance = distance;
      enemy = player;
    }
  }

  return enemy;
}

/**
 * Calculate smooth aim interpolation
 * Returns a value between 0-1 for smooth lerping
 * Uses classicSmooth_ setting (0-100)
 * 0-30: Instant/Fast aiming, 30-70: Moderate smoothing, 70-100: Slow/Locked aim
 */
export function classicCalculateSmoothFactor(currentPos, nextPos) {
  if (!nextPos || !currentPos) return 1.0;

  const smoothSetting = settings.aimbot_.classicSmooth_ || 50;
  const smoothIntensity = smoothSetting / 100;

  const distance = Math.hypot(nextPos.x - currentPos.x, nextPos.y - currentPos.y);

  // Calculate base smooth factor
  // At 0 smooth: accept any movement (factor = 1.0, instant)
  // At 50 smooth: moderate smoothing (factor = 0.15-0.30)
  // At 100 smooth: very slow (factor = 0.05-0.10)
  
  let baseFactor;
  if (smoothSetting < 30) {
    // Fast aiming mode: gradually increase smoothing
    baseFactor = 0.5 + (smoothIntensity / 0.3) * 0.5; // 0.5 to 1.0
  } else if (smoothSetting < 70) {
    // Moderate mode: standard smoothing
    const normalized = (smoothSetting - 30) / 40; // 0 to 1
    baseFactor = 0.3 - normalized * 0.15; // 0.3 to 0.15
  } else {
    // Slow mode: very controlled
    const normalized = (smoothSetting - 70) / 30; // 0 to 1
    baseFactor = 0.15 - normalized * 0.1; // 0.15 to 0.05
  }

  // Adaptive smoothing based on distance
  // Smaller movements should be smoother
  let adaptiveFactor = baseFactor;
  if (distance < 5) {
    // Very close to target, smooth more
    adaptiveFactor = baseFactor * 0.5;
  } else if (distance < 15) {
    // Close to target
    adaptiveFactor = baseFactor * 0.75;
  } else if (distance > 50) {
    // Far from target, move faster
    adaptiveFactor = baseFactor * 1.3;
  }

  // Clamp factor between 0 and 1
  return Math.max(0.02, Math.min(1.0, adaptiveFactor));
}

/**
 * Determine if aim should be smoothed (legacy wrapper)
 * Uses classicSmooth_ setting (0-100)
 */
export function classicShouldSmoothAim(currentPos, nextPos) {
  if (!nextPos) return false;
  if (!currentPos) return true;

  const smoothFactor = classicCalculateSmoothFactor(currentPos, nextPos);
  // If factor is low (lots of smoothing), return true
  return smoothFactor < 0.8;
}

export default {
  classicPredictPosition,
  classicFindTarget,
  classicFindClosestTarget,
  classicShouldSmoothAim,
};
