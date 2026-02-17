/**
 * AimbotClassic - Aimbot logic từ SurMinus v1.5.1 (old version)
 * Simpler, faster prediction với ít optimization layers
 * Tối ưu cho gameplay nhanh và responsive
 */

import { findTeam, findBullet, findWeapon } from '@/utils/constants.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';
import { gameManager, settings } from '@/core/state.js';

const isBypassLayer = (layer) => layer === 2 || layer === 3;

const getLocalLayer = (player) => {
  if (isBypassLayer(player.layer)) return player.layer;
  return player.layer;
};

const meetsLayerCriteria = (targetLayer, localLayer, isLocalOnBypass) => {
  if (isBypassLayer(targetLayer) || isLocalOnBypass) return true;
  return targetLayer === localLayer;
};

/**
 * Classic velocity prediction - simpler approach
 * Uses only first and last history points for velocity calc
 */
export function classicPredictPosition(enemy, currentPlayer, history) {
  if (!enemy || !currentPlayer) return null;

  const enemyPos = enemy[translations.visualPos_];
  const currentPlayerPos = currentPlayer[translations.visualPos_];

  // Need minimum 20 history points (old version requirement)
  if (!history || history.length < 20) {
    const screenPos = gameManager.game[translations.camera_][translations.pointToScreen_]({
      x: enemyPos.x,
      y: enemyPos.y,
    });
    return screenPos;
  }

  // Simple velocity calc: (current - oldest) / time elapsed
  const deltaTime = (history[history.length - 1][0] - history[0][0]) / 1000;
  
  if (deltaTime <= 0) {
    const screenPos = gameManager.game[translations.camera_][translations.pointToScreen_]({
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

  const weapon = findWeapon(currentPlayer);
  const bullet = findBullet(weapon);
  const bulletSpeed = bullet?.speed || 1000;

  const vex = velocity.x;
  const vey = velocity.y;
  const dx = enemyPos.x - currentPlayerPos.x;
  const dy = enemyPos.y - currentPlayerPos.y;
  const vb = bulletSpeed;

  // Quadratic equation: (vb² - vex² - vey²)t² - 2(vex·dx + vey·dy)t - (dx² + dy²) = 0
  const a = vb * vb - vex * vex - vey * vey;
  const b = -2 * (vex * dx + vey * dy);
  const c = -(dx * dx + dy * dy);

  let t;

  if (Math.abs(a) < 1e-6) {
    // Linear case
    if (Math.abs(b) < 1e-6) {
      t = 0;
    } else {
      t = -c / b;
    }
  } else {
    // Quadratic case
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      // No real solution
      const screenPos = gameManager.game[translations.camera_][translations.pointToScreen_]({
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

    // Clamp time to reasonable range
    if (t < 0 || t > 5) {
      const screenPos = gameManager.game[translations.camera_][translations.pointToScreen_]({
        x: enemyPos.x,
        y: enemyPos.y,
      });
      return screenPos;
    }
  }

  const predictedPos = {
    x: enemyPos.x + vex * t,
    y: enemyPos.y + vey * t,
  };

  return gameManager.game[translations.camera_][translations.pointToScreen_](predictedPos);
}

/**
 * Classic target finding - prioritize nearest to mouse on screen
 */
export function classicFindTarget(players, me) {
  const meTeam = findTeam(me);
  const isLocalOnBypassLayer = isBypassLayer(me.layer);
  const localLayer = getLocalLayer(me);
  let enemy = null;
  let minDistance = Infinity;

  const mousePos = gameManager.game[translations.input_].mousePos;

  for (const player of players) {
    if (!player.active) continue;
    if (player[translations.netData_][translations.dead_]) continue;
    if (!settings.aimbot_.targetKnocked_ && player.downed) continue;
    if (me.__id === player.__id) continue;
    if (!meetsLayerCriteria(player.layer, localLayer, isLocalOnBypassLayer)) continue;
    if (findTeam(player) === meTeam) continue;

    const screenPos = gameManager.game[translations.camera_][translations.pointToScreen_]({
      x: player[translations.visualPos_].x,
      y: player[translations.visualPos_].y,
    });

    const distance =
      (screenPos.x - mousePos._x) ** 2 + (screenPos.y - mousePos._y) ** 2;

    if (distance < minDistance) {
      minDistance = distance;
      enemy = player;
    }
  }

  return enemy;
}

/**
 * Classic closest target - for melee lock
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
    const distance =
      (mePos.x - playerPos.x) ** 2 + (mePos.y - playerPos.y) ** 2;

    if (distance < minDistance) {
      minDistance = distance;
      enemy = player;
    }
  }

  return enemy;
}

/**
 * Simple aim smoothing - old version logic
 */
export function classicShouldSmoothAim(currentPos, nextPos) {
  if (!nextPos) return false;
  if (!currentPos) return true;

  const AIM_SMOOTH_DISTANCE_PX = 6;
  const AIM_SMOOTH_ANGLE = Math.PI / 90;

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
