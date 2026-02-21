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
 * Accounts for bullet speed, enemy velocity, and ping
 */
export function classicPredictPosition(enemy, currentPlayer, history) {
  if (!enemy || !currentPlayer) return null;

  const enemyPos = enemy[translations.visualPos_];
  const currentPlayerPos = currentPlayer[translations.visualPos_];
  const game = gameManager.game;

  // Need minimum history for accurate prediction
  if (!history || history.length < 20) {
    const screenPos = game[translations.camera_][translations.pointToScreen_]({
      x: enemyPos.x,
      y: enemyPos.y,
    });
    return screenPos;
  }

  // Calculate velocity from full history range
  const deltaTime = (history[history.length - 1][0] - history[0][0]) / 1000;

  if (deltaTime <= 0) {
    const screenPos = game[translations.camera_][translations.pointToScreen_]({
      x: enemyPos.x,
      y: enemyPos.y,
    });
    return screenPos;
  }

  const oldestPos = history[0][1];
  const velocity = {
    x: (enemyPos.x - oldestPos.x) / deltaTime,
    y: (enemyPos.y - oldestPos.y) / deltaTime,
  };

  // Get bullet speed for ballistic calculation
  const weapon = findWeapon(currentPlayer);
  const bullet = findBullet(weapon);
  const bulletSpeed = bullet?.speed || 1000;

  // Ping compensation - add half ping to prediction
  const ping = (getPing?.() || 50) / 2000; // Convert to seconds

  const vex = velocity.x;
  const vey = velocity.y;
  const dx = enemyPos.x - currentPlayerPos.x;
  const dy = enemyPos.y - currentPlayerPos.y;
  const vb = bulletSpeed;

  // Ballistic equation: (vb² - vex² - vey²)t² - 2(vex·dx + vey·dy)t - (dx² + dy²) = 0
  const a = vb * vb - vex * vex - vey * vey;
  const b = -2 * (vex * dx + vey * dy);
  const c = -(dx * dx + dy * dy);

  let t;

  if (Math.abs(a) < 1e-6) {
    // Linear case (bullet speed ≈ enemy speed)
    if (Math.abs(b) < 1e-6) {
      t = 0;
    } else {
      t = -c / b;
    }
  } else {
    // Quadratic case
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      // No real solution - return current position
      const screenPos = game[translations.camera_][translations.pointToScreen_]({
        x: enemyPos.x,
        y: enemyPos.y,
      });
      return screenPos;
    }

    const sqrtD = Math.sqrt(discriminant);
    const t1 = (-b - sqrtD) / (2 * a);
    const t2 = (-b + sqrtD) / (2 * a);

    // Choose smallest positive time
    t = Math.min(t1, t2) > 0 ? Math.min(t1, t2) : Math.max(t1, t2);

    // Clamp to reasonable range and add ping compensation
    if (t < 0 || t > 5) {
      const screenPos = game[translations.camera_][translations.pointToScreen_]({
        x: enemyPos.x,
        y: enemyPos.y,
      });
      return screenPos;
    }
  }

  // Add ping compensation to prediction time
  t += ping;

  const predictedPos = {
    x: enemyPos.x + vex * t,
    y: enemyPos.y + vey * t,
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
 * Determine if aim should be smoothed
 * Uses classicSmooth_ setting (0-100)
 */
export function classicShouldSmoothAim(currentPos, nextPos) {
  if (!nextPos) return false;
  if (!currentPos) return true;

  // Scale thresholds based on smooth setting (0-100)
  const smoothIntensity = (settings.aimbot_.classicSmooth_ || 50) / 100;
  
  // Higher smooth = tighter thresholds (slower changes)
  const AIM_SMOOTH_DISTANCE_PX = 6 + smoothIntensity * 4; // 6-10px based on setting
  const AIM_SMOOTH_ANGLE = Math.PI / (90 - smoothIntensity * 30); // Tighter at high smooth

  const distance = Math.hypot(nextPos.x - currentPos.x, nextPos.y - currentPos.y);
  if (distance > AIM_SMOOTH_DISTANCE_PX) return true;

  const computeAimAngle = (point) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    return Math.atan2(point.y - centerY, point.x - centerX);
  };

  const normalizeAngle = (angle) => Math.atan2(Math.sin(angle), Math.cos(angle));

  const angleDiff = Math.abs(
    normalizeAngle(computeAimAngle(nextPos) - computeAimAngle(currentPos))
  );
  return angleDiff > AIM_SMOOTH_ANGLE;
}

export default {
  classicPredictPosition,
  classicFindTarget,
  classicFindClosestTarget,
  classicShouldSmoothAim,
};
