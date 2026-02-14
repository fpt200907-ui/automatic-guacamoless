import { gameManager, settings, inputState, aimState } from '@/core/state.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';
import { inputCommands, PIXI } from '@/utils/constants.js';
import { setAimState, AimState } from '@/core/aimController.js';
import { outer } from '@/core/outer.js';
import { ref_addEventListener } from '@/core/hook.js';
import { collisionHelpers } from '@/utils/math.js';

const getAimbotData = () => {
  try {
    const AimbotModule = globalThis.__AIMBOT_MODULE__ || {};
    return {
      hasValidTarget: AimbotModule.hasValidTarget || (() => false),
      getCurrentTarget: AimbotModule.getCurrentTarget || (() => null),
      isEnemyBehindWall: AimbotModule.isEnemyBehindWall || (() => false),
      getAimbotShootableState: AimbotModule.getAimbotShootableState || (() => false),
    };
  } catch (e) {
    return {
      hasValidTarget: () => false,
      getCurrentTarget: () => null,
      isEnemyBehindWall: () => false,
      getAimbotShootableState: () => false,
    };
  }
};

const CRATE_PATTERNS = [

  // CRATES (với loot: tier_world, tier_soviet, tier_airdrop...)
  'crate_01', 'crate_02', 'crate_03', 'crate_04', 'crate_05', 'crate_06', 'crate_07', 'crate_08', 'crate_09',
  'crate_10', 'crate_11', 'crate_12', 'crate_13', 'crate_14', 'crate_15', 'crate_16', 'crate_18', 'crate_19', 'crate_20', 'crate_21', 'crate_22',
  'crate_01x', 'crate_02d', 'crate_02f', 'crate_02sv', 'crate_02x', 'crate_03x', 'crate_07b', 'crate_07sv', 'crate_09bh',
  'crate_10sv', 'crate_11de', 'crate_11h', 'crate_11sv', 'crate_11tr', 'crate_14a', 'crate_21b', 'crate_22d',
  
  // CLASS CRATES (với loot: tier specific cho từng class)
  'class_crate_common_assault', 'class_crate_common_demo', 'class_crate_common_healer', 'class_crate_common_scout', 'class_crate_common_sniper', 'class_crate_common_tank',
  'class_crate_rare_assault', 'class_crate_rare_demo', 'class_crate_rare_healer', 'class_crate_rare_scout', 'class_crate_rare_sniper', 'class_crate_rare_tank',
  'class_crate_mythic',
  
  // MILITARY CRATES
  'mil_crate_01', 'mil_crate_02', 'mil_crate_03', 'mil_crate_04', 'mil_crate_05',
  
  // CHESTS (với loot: tier_chest)
  'chest_01', 'chest_02', 'chest_03', 'chest_04',
  
  // CASES (với loot: tier_hatchet, tier_ring_case, tier_chrys_case...)
  'case_01', 'case_02', 'case_03', 'case_04', 'case_05', 'case_06', 'case_07',
  
  // BARRELS (với loot: tier_world, tier_surviv) - CHỈ dùng wood barrel (không nổ)
  'barrel_02', 'barrel_03', 'barrel_04', 'barrel_05',
  
  // LOCKERS (với loot: tier_world, tier_police)
  'locker_01', 'locker_02', 'locker_03',
  
  // GUN MOUNTS (với loot: m870, mp220, qbb97, axes, m1100, cutlass)
  'gun_mount_01', 'gun_mount_02', 'gun_mount_03', 'gun_mount_04', 'gun_mount_05', 'gun_mount_06',
  
  // VENDING MACHINES (với loot: tier_vending_soda, soda)
  'vending_01', 'vending',
  
  // BOOKSHELVES (với loot: tier_world, tier_soviet)
  'bookshelf_01', 'bookshelf_02',
  
  // TREES (với loot: tier_surviv, mosin, woodaxe, scout_elite)
  'tree_02', 'tree_02h', 'tree_03', 'tree_03x', 'tree_03sv', 'tree_03d', 'tree_03f', 'tree_03w', 'tree_03h', 'tree_03sp', 'tree_03su', 'tree_03cb', 'tree_03bh',
  
  // STONES (với loot: tier_eye_block, tier_eye_stone)
  'stone_04', 'stone_04x', 'stone_05',
  // TOILETS (với loot: tier_toilet)
  'toilet_',
  
  'crate_',
  'chest_',
  'case_',
  'locker',
  'deposit',
  'drawers',
  'toilet',
  'gun_mount_01', 'gun_mount_02', 'gun_mount_03', 'gun_mount_04', 'gun_mount_05',
  'planter',
  'rack',
  'stand',
  'book',
  'vending',
  'bookshelf',
  'towelrack_01',
  'pot',
  'potato',
  'egg',
  'pumpkin',
];

// Configuration
const DEFAULT_DETECTION_RADIUS = 7.6; // Radius to detect crates
const DEFAULT_ATTACK_RADIUS = 7.5; // Attack when very close (melee range)
const DEFAULT_MOVEMENT_RADIUS = 8; // Move towards crate until within this range
const MELEE_SLOT = 2; // Assuming melee weapon is in slot 2

// ESP Configuration
const ESP_LINE_COLOR = 0xFFFF00; // Yellow
const ESP_LINE_ALPHA = 0.8;
const ESP_LINE_WIDTH = 2.5;
// Mouse button constant
const PRIMARY_BUTTON = 0;

// State
let currentTarget = null;
let lastAttackTime = 0;
let isAutoAttacking = false;
let lastMeleeSwitchTime = -Infinity; // Start with very old time so first attack doesn't wait
const MELEE_SWITCH_DELAY = 50; // Wait 50ms after switching to melee before attacking

/**
 * Check if an object is a breakable crate/container
 */
function isCrate(obj) {
  if (!obj || obj.dead) return false;
  // Don't require collider - some objects might not have it
  const type = obj.type || '';
  return CRATE_PATTERNS.some(pattern => type.includes(pattern));
}

/**
 * Check if player and object are on same layer
 */
function sameLayer(objLayer, playerLayer) {
  if (objLayer === 2 || objLayer === 3) return true;
  if (playerLayer === 2 || playerLayer === 3) return true;
  return objLayer === playerLayer;
}

const BLOCKING_PATTERNS = [
  'bollard_',
  'sandbags_',
  'hedgehog',
  'silo_',
  'metal_wall_',
  'brick_wall_',
  'concrete_wall_',
  'container_wall_',
  'warehouse_wall_',
];

/**
 * Check if an obstacle is blocking the path to a crate
 */
function isObstacleBlocking(obstacle) {
  if (obstacle.collidable === false) return false;
  if (obstacle.dead) return false;
  
  const type = obstacle.type || '';
  
  if (obstacle.isWall === true || obstacle.destructible === false) {
    // Exception: Don't block if it's the target itself (unlikely here but safe)
    return true;
  }

  return BLOCKING_PATTERNS.some(pattern => type.includes(pattern));
}

/**
 * Check if target is visible from player position (not behind wall)
 */
function isTargetVisible(playerPos, targetPos, playerLayer) {
  const game = gameManager.game;
  const idToObj = game?.[translations.objectCreator_]?.[translations.idToObj_];
  if (!idToObj) return true;

  const dist = Math.hypot(targetPos.x - playerPos.x, targetPos.y - playerPos.y);
  if (dist < 1) return true; // Too close to be blocked accurately

  for (const obj of Object.values(idToObj)) {
    if (!obj.collider || obj.dead) continue;
    if (obj.layer !== undefined && !sameLayer(obj.layer, playerLayer)) continue;
    if (!isObstacleBlocking(obj)) continue;

    // Raycast check using collider intersection
    const hit = collisionHelpers.intersectSegment_(obj.collider, playerPos, targetPos);
    if (hit) {
      // Check if hit point is significantly before the target
      const hitDist = Math.hypot(hit.point.x - playerPos.x, hit.point.y - playerPos.y);
      if (hitDist < dist - 0.5) return false;
    }
  }
  return true;
}

/**
 * Find the closest crate to the player
 */
function findClosestCrate(player) {
  const detectionRadius = settings.autoCrateBreak_?.detectionRadius_ ?? DEFAULT_DETECTION_RADIUS;
  const game = gameManager.game;
  const idToObj = game?.[translations.objectCreator_]?.[translations.idToObj_];
  if (!idToObj) return null;
  
  const playerPos = player[translations.visualPos_];
  if (!playerPos) return null;
  
  const playerLayer = player.layer;
  let bestCrate = null;
  let bestDistance = Infinity;
  
  for (const obj of Object.values(idToObj)) {
    if (!isCrate(obj)) continue;
    if (!sameLayer(obj.layer, playerLayer)) continue;
    
    const objPos = obj[translations.visualPos_] || obj.pos;
    if (!objPos) continue;
    
    const distance = Math.hypot(playerPos.x - objPos.x, playerPos.y - objPos.y);
    if (distance > detectionRadius) continue;
    
    // Check if target is visible (not behind wall)
    if (!isTargetVisible(playerPos, objPos, playerLayer)) continue;
    
    if (distance < bestDistance) {
      bestDistance = distance;
      bestCrate = obj;
    }
  }
  return bestCrate ? { obj: bestCrate, distance: bestDistance } : null;
}

/**
 * Calculate movement direction towards crate
 */
function getMoveDirection(playerPos, cratePos) {
  const dx = cratePos.x - playerPos.x;
  const dy = cratePos.y - playerPos.y;
  const angle = Math.atan2(dy, dx);
  
  return {
    touchMoveActive: true,
    touchMoveLen: 255,
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
}

/**
 * Queue melee weapon switch
 */
function switchToMelee() {
  if (!inputState.queuedInputs_.includes(inputCommands.EquipMelee_)) {
    inputState.queuedInputs_.push(inputCommands.EquipMelee_);
    lastMeleeSwitchTime = performance.now();
  }
}

/**
 * Simulate mouse down for attack
 */
function simulateMouseDown() {
  const mouseDownEvent = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: outer,
    button: PRIMARY_BUTTON,
  });
  outer.dispatchEvent(mouseDownEvent);
}

/**
 * Simulate mouse up to stop attack
 */
function simulateMouseUp() {
  const mouseUpEvent = new MouseEvent('mouseup', {
    bubbles: true,
    cancelable: true,
    view: outer,
    button: PRIMARY_BUTTON,
  });
  outer.dispatchEvent(mouseUpEvent);
}

/**
 * Initialize settings
 */
export function initAutoCrateBreakSettings() {
  if (!settings.autoCrateBreak_) {
    settings.autoCrateBreak_ = {
      enabled_: false,
      autoSwitchMelee_: true,
      autoAttack_: true,
      detectionRadius_: DEFAULT_DETECTION_RADIUS,
    };
  }
}

/**
 * Draw ESP line to the current target
 */
function drawESPLine(game, me, target) {
  if (!me || !me.container) return;
  const container = me.container;
  const targetId = 'autoCrateESP';
  
  if (!container[targetId]) {
    if (!PIXI.Graphics_) return;
    container[targetId] = new PIXI.Graphics_();
    container.addChild(container[targetId]);
  }

  const graphics = container[targetId];
  if (!graphics) return;
  graphics.clear();

  if (!target || !settings.autoCrateBreak_?.enabled_) return;

  const cratePos = target[translations.visualPos_] || target.pos;
  const mePos = me[translations.visualPos_];
  if (!cratePos || !mePos) return;
  const endX = (cratePos.x - mePos.x) * 16; 
  const endY = (mePos.y - cratePos.y) * 16;

  graphics.lineStyle(ESP_LINE_WIDTH, ESP_LINE_COLOR, ESP_LINE_ALPHA);
  graphics.moveTo(0, 0);
  graphics.lineTo(endX, endY);
}

/**
 * Check if player is currently healing
 * Based on AutoHeal.js mechanism: check activeWeapon in netData
 */
function isPlayerHealing(player) {
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
}

/**
 * Check if player has switched to a gun (non-melee weapon)
 */
function isPlayerWithGun(player) {
  if (!player) return false;
  
  const currentWeaponIndex = player[translations.localData_]?.[translations.curWeapIdx_];
  // If weapon index is not melee (slot 2), and not empty slot, player has a gun
  return currentWeaponIndex !== MELEE_SLOT && currentWeaponIndex !== undefined && currentWeaponIndex !== null;
}

/**
 * Main update function
 */
export function updateAutoCrateBreak(player) {
  if (!settings.autoCrateBreak_?.enabled_) {
    currentTarget = null;
    if (isAutoAttacking) {
      simulateMouseUp();
      isAutoAttacking = false;
    }
    drawESPLine(gameManager.game, player, null);
    return null;
  }

  // CANCELLATION: If player is healing, stop auto break
  if (isPlayerHealing(player)) {
    currentTarget = null;
    if (isAutoAttacking) {
      simulateMouseUp();
      isAutoAttacking = false;
    }
    drawESPLine(gameManager.game, player, null);
    return null;
  }

  // CANCELLATION: If player switches to a gun, stop auto break
  if (isPlayerWithGun(player)) {
    currentTarget = null;
    if (isAutoAttacking) {
      simulateMouseUp();
      isAutoAttacking = false;
    }
    drawESPLine(gameManager.game, player, null);
    return null;
  }

  // CHECK AIMBOT: If aimbot has a valid target and it's shootable, stop crate break
  const aimbot = getAimbotData();
  if (aimbot.hasValidTarget?.()) {
    const aimbotTarget = aimbot.getCurrentTarget?.();
    if (aimbotTarget) {
      const player_ = gameManager.game?.[translations.activePlayer_];
      // Check if target is NOT behind wall or is shootable
      const isNotBehindWall = !aimbot.isEnemyBehindWall?.(player_, aimbotTarget);
      const isShootable = aimbot.getAimbotShootableState?.();
      
      if (isNotBehindWall || isShootable) {
        currentTarget = null;
        if (isAutoAttacking) {
          simulateMouseUp();
          isAutoAttacking = false;
        }
        drawESPLine(gameManager.game, player, null);
        return null;
      }
    }
  }

  // Find closest crate
  const crateInfo = findClosestCrate(player);
  if (!crateInfo) {
    currentTarget = null;
    if (isAutoAttacking) {
      simulateMouseUp();
      isAutoAttacking = false;
    }
    drawESPLine(gameManager.game, player, null);
    return null;
  }
  
  currentTarget = crateInfo.obj;
  drawESPLine(gameManager.game, player, currentTarget);
  
  const cratePos = currentTarget[translations.visualPos_] || currentTarget.pos;
  const game = gameManager.game;
  
  const currentWeaponIndex = player[translations.localData_]?.[translations.curWeapIdx_];
  const isMeleeEquipped = currentWeaponIndex === MELEE_SLOT;
  
  const screenPos = game[translations.camera_][translations.pointToScreen_]({
    x: cratePos.x,
    y: cratePos.y,
  });
  
  // Check engagement - start attacking when close enough
  if (crateInfo.distance <= DEFAULT_ATTACK_RADIUS) {
    if (!isMeleeEquipped && settings.autoCrateBreak_?.autoSwitchMelee_) {
      switchToMelee();
    }
    // Continue moving while attacking
    const moveDir = getMoveDirection(player[translations.visualPos_], cratePos);
    return new AimState('crateBreak', { x: screenPos.x, y: screenPos.y }, moveDir, true);
  }
  
  // If within movement range but not attack range - prepare melee
  if (crateInfo.distance <= DEFAULT_MOVEMENT_RADIUS) {
    if (!isMeleeEquipped && settings.autoCrateBreak_?.autoSwitchMelee_) {
      switchToMelee();
    }
  }
  
  // Movement logic - always move towards crate
  const moveDir = getMoveDirection(player[translations.visualPos_], cratePos);
  
  return new AimState('crateBreak', { x: screenPos.x, y: screenPos.y }, moveDir, true);
}

export function getCurrentCrateTarget() {
  return currentTarget;
}

/**
 * Auto attack ticker - runs every 16ms to maintain attack state
 */
function autoCrateAttackTicker() {
  if (!settings.autoCrateBreak_?.enabled_) {
    if (isAutoAttacking) {
      simulateMouseUp();
      isAutoAttacking = false;
    }
    return;
  }

  if (!currentTarget) {
    if (isAutoAttacking) {
      simulateMouseUp();
      isAutoAttacking = false;
    }
    return;
  }

  // Check if we should still be attacking
  const game = gameManager.game;
  if (!game) return;
  
  const player = game[translations.activePlayer_];
  if (!player) return;

  const cratePos = currentTarget[translations.visualPos_] || currentTarget.pos;
  const playerPos = player[translations.visualPos_];
  if (!cratePos || !playerPos) return;

  const distance = Math.hypot(playerPos.x - cratePos.x, playerPos.y - cratePos.y);
  const currentWeaponIndex = player[translations.localData_]?.[translations.curWeapIdx_];
  const isMeleeEquipped = currentWeaponIndex === MELEE_SLOT;

  // Check layer before attacking
  const playerLayer = player.layer;
  const crateLayer = currentTarget.layer;
  const onSameLayer = sameLayer(crateLayer, playerLayer);

  // Auto-hold attack while in attack range
  if (distance <= DEFAULT_ATTACK_RADIUS && isMeleeEquipped && onSameLayer && settings.autoCrateBreak_?.autoAttack_) {
    // Wait a bit after melee switch before attacking
    const timeSinceMeleeSwitch = performance.now() - lastMeleeSwitchTime;
    if (timeSinceMeleeSwitch > MELEE_SWITCH_DELAY) {
      if (!isAutoAttacking) {
        simulateMouseDown();
        isAutoAttacking = true;
      }
    }
  } else if (isAutoAttacking) {
    simulateMouseUp();
    isAutoAttacking = false;
  }
}

export default function autoCrateBreak() {
  initAutoCrateBreakSettings();
  
  // Handle mouse events to properly stop attacking
  const handleMouseUp = () => {
    if (isAutoAttacking) {
      isAutoAttacking = false;
    }
  };
  
  Reflect.apply(ref_addEventListener, outer, ['mouseup', handleMouseUp]);
  
  // Start auto attack ticker to maintain attack state
  setInterval(autoCrateAttackTicker, 16);
}