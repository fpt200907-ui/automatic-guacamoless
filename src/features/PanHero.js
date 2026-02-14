import { settings, gameManager } from '@/core/state.js';
import { findTeam } from '@/utils/constants.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';
import { AimState } from '@/core/aimController.js';
import { isLayerSpoofActive, originalLayerValue } from '@/features/LayerSpoofer.js';
import { outerDocument, outer } from '@/core/outer.js';

const state = {
  panTarget_: null,
  lastPanAngle_: null,
  lastPanPos_: { x: 0, y: 0 },
  lastUpdateTime_: Date.now(),
};

const PAN_ANGLE_OFFSET = (135 * Math.PI) / 180; // 135° in radians

function lerp(x, x2, i) {
  return x * (1.0 - i) + x2 * i;
}

const computeAimAngle = (point) => {
  if (!point) return 0;
  const centerX = outer.innerWidth / 2;
  const centerY = outer.innerHeight / 2;
  return Math.atan2(point.y - centerY, point.x - centerX);
};
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

const normalizeAngle = (angle) => Math.atan2(Math.sin(angle), Math.cos(angle));

/**
 * Calculate pan position (135° offset from enemy)
 * @param {Object} localPlayer - Local player object
 * @param {Object} targetPlayer - Target player object
 * @returns {Object} Screen position for pan hero aim
 */
function calculatePanPosition(localPlayer, targetPlayer) {
  if (!localPlayer || !targetPlayer) return null;

  const game = gameManager.game;
  if (!game) return null;

  const localPos = localPlayer[translations.visualPos_];
  const targetPos = targetPlayer[translations.visualPos_];

  // Calculate angle from local to target
  const dx = targetPos.x - localPos.x;
  const dy = targetPos.y - localPos.y;
  const angleToTarget = Math.atan2(dy, dx);

  // Add 135° offset to angle
  const panAngle = angleToTarget + PAN_ANGLE_OFFSET;

  // Create a point far away at the pan angle
  const panDistance = 100; // Arbitrary distance for the pan direction
  const panPos = {
    x: localPos.x + Math.cos(panAngle) * panDistance,
    y: localPos.y + Math.sin(panAngle) * panDistance,
  };

  // Convert to screen position
  const screenPos = game[translations.camera_][translations.pointToScreen_](panPos);
  return screenPos;
}

/**
 * Find closest visible target for pan hero
 */
function findPanTarget(players, localPlayer, localLayer, isLocalOnBypass) {
  const meTeam = findTeam(localPlayer);
  let closestEnemy = null;
  let minDistance = Infinity;

  for (const player of players) {
    if (!player.active) continue;
    if (player[translations.netData_][translations.dead_]) continue;
    if (!settings.panHero_.targetKnocked_ && player.downed) continue;
    if (localPlayer.__id === player.__id) continue;
    if (!meetsLayerCriteria(player.layer, localLayer, isLocalOnBypass)) continue;
    if (findTeam(player) === meTeam) continue;

    const mePos = localPlayer[translations.visualPos_];
    const playerPos = player[translations.visualPos_];
    const distance = Math.hypot(mePos.x - playerPos.x, mePos.y - playerPos.y);

    if (distance < minDistance) {
      minDistance = distance;
      closestEnemy = player;
    }
  }

  return closestEnemy;
}

/**
 * Update pan hero positioning
 * @returns {AimState|null} Pan aim state or null if not active
 */
export function updatePanHero(localPlayer) {
  try {
    const game = gameManager.game;
    if (!game || !game.initialized || !settings.panHero_?.enabled_) {
      state.panTarget_ = null;
      return null;
    }

    // If local player is dead, disable pan hero
    if (localPlayer[translations.netData_][translations.dead_]) {
      state.panTarget_ = null;
      return null;
    }

    const players = game[translations.playerBarn_].playerPool[translations.pool_];
    if (!players) return null;

    const isLocalOnBypassLayer = isBypassLayer(localPlayer.layer);
    const localLayer = getLocalLayer(localPlayer);

    // Always pick the closest valid target on each update (fix sticky target issue)
    const candidate = findPanTarget(players, localPlayer, localLayer, isLocalOnBypassLayer);
    if (!candidate) {
      state.panTarget_ = null;
      return null;
    }
    // Update pan target to the current closest candidate
    state.panTarget_ = candidate;
    const target = candidate;

    if (!target) {
      state.panTarget_ = null;
      return null;
    }

    // Calculate pan position (135° from enemy)
    const panScreenPos = calculatePanPosition(localPlayer, target);
    if (!panScreenPos) {
      // Failed to calculate pan position - disable pan hero
      return null;
    }

    state.lastPanAngle_ = {
      x: panScreenPos.x,
      y: panScreenPos.y,
    };

    // Return pan hero aim state
    return new AimState('panHero', { x: panScreenPos.x, y: panScreenPos.y }, null, false);
  } catch (error) {
    console.error('[PanHero] Error:', error);
    state.panTarget_ = null;
    return null;
  }
}

export function getPanHeroTarget() {
  return state.panTarget_;
}

export default function () {
  // Initialize module
  if (typeof globalThis !== 'undefined') {
    globalThis.__PANHERO_MODULE__ = {
      updatePanHero,
      getPanHeroTarget,
    };
  }
}
