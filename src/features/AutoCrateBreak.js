import { gameManager, settings, inputState } from '@/core/state.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';
import { inputCommands, PIXI } from '@/utils/constants.js';
import { setAimState, AimState } from '@/core/aimController.js';
import { outer } from '@/core/outer.js';
import { ref_addEventListener } from '@/core/hook.js';

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

const MELEE_SLOT = 2;
const PRIMARY_BUTTON = 0;
const PROXIMITY_THRESHOLD = 5;

const ESP_LINE_COLOR = 0xFFFF00;
const ESP_LINE_ALPHA = 0.8;
const ESP_LINE_WIDTH = 2.5;

let currentTarget = null;
let isAutoAttacking = false;
let lastMeleeSwitchTime = -Infinity;
const MELEE_SWITCH_DELAY = 50;

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

/**
 * Find closest crate near player
 */
function findClosestCrate(player) {
  const game = gameManager.game;
  const idToObj = game?.[translations.objectCreator_]?.[translations.idToObj_];
  if (!idToObj) return null;
  
  const playerPos = player[translations.visualPos_];
  const playerLayer = player.layer;
  
  let bestCrate = null;
  let bestDistance = Infinity;
  
  for (const obj of Object.values(idToObj)) {
    if (!isCrate(obj)) continue;
    if (!sameLayer(obj.layer, playerLayer)) continue;
    
    const objPos = obj[translations.visualPos_] || obj.pos;
    if (!objPos) continue;
    
    const distance = Math.hypot(playerPos.x - objPos.x, playerPos.y - objPos.y);
    
    if (distance < bestDistance) {
      bestDistance = distance;
      bestCrate = obj;
    }
  }
  
  return bestCrate ? { obj: bestCrate, distance: bestDistance } : null;
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
 * Check if player is currently healing
 */
function isPlayerHealing(player) {
  if (!player) return false;
  
  const netData = player[translations.netData_];
  const activeWeapon = netData?.[translations.activeWeapon_];
  
  if (!activeWeapon) return false;
  
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
 * Main update function - detect crate proximity and attack
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

  // Stop if player is healing
  if (isPlayerHealing(player)) {
    currentTarget = null;
    if (isAutoAttacking) {
      simulateMouseUp();
      isAutoAttacking = false;
    }
    drawESPLine(gameManager.game, player, null);
    return null;
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

  const distance = crateInfo.distance;
  const crate = crateInfo.obj;
  
  // Activate auto-crate if within proximity threshold
  if (distance <= PROXIMITY_THRESHOLD) {
    currentTarget = crate;
    drawESPLine(gameManager.game, player, currentTarget);
    
    const cratePos = crate[translations.visualPos_] || crate.pos;
    const game = gameManager.game;
    
    const currentWeaponIndex = player[translations.localData_]?.[translations.curWeapIdx_];
    const isMeleeEquipped = currentWeaponIndex === MELEE_SLOT;
    
    // Switch to melee if needed
    if (!isMeleeEquipped && settings.autoCrateBreak_?.autoSwitchMelee_) {
      inputState.queuedInputs_.push(inputCommands.EquipMelee_);
      lastMeleeSwitchTime = performance.now();
    }
    
    // Start attacking
    if (settings.autoCrateBreak_?.autoAttack_) {
      const timeSinceMeleeSwitch = performance.now() - lastMeleeSwitchTime;
      if (timeSinceMeleeSwitch > MELEE_SWITCH_DELAY && isMeleeEquipped) {
        if (!isAutoAttacking) {
          simulateMouseDown();
          isAutoAttacking = true;
        }
      }
    }
    
    const screenPos = game[translations.camera_][translations.pointToScreen_]({
      x: cratePos.x,
      y: cratePos.y,
    });
    
    return new AimState('crateBreak', { x: screenPos.x, y: screenPos.y }, null, true);
  } else {
    // Outside proximity - stop attacking
    currentTarget = null;
    if (isAutoAttacking) {
      simulateMouseUp();
      isAutoAttacking = false;
    }
    drawESPLine(gameManager.game, player, null);
  }
  
  return null;
}

export function getCurrentCrateTarget() {
  return currentTarget;
}

/**
 * Maintain attack state
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
  
  // Stop attacking if moved away from crate
  if (distance > PROXIMITY_THRESHOLD) {
    if (isAutoAttacking) {
      simulateMouseUp();
      isAutoAttacking = false;
    }
    currentTarget = null;
    return;
  }

  // Maintain attack while in range and melee is equipped
  if (isMeleeEquipped && settings.autoCrateBreak_?.autoAttack_) {
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
  const handleMouseUp = () => {
    if (isAutoAttacking) {
      isAutoAttacking = false;
    }
  };
  
  Reflect.apply(ref_addEventListener, outer, ['mouseup', handleMouseUp]);
  
  setInterval(autoCrateAttackTicker, 16);
}