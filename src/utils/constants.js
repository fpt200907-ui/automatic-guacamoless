import { hook } from '@/core/hook.js';
import { outer } from '@/core/outer.js';
import { gameManager } from '@/core/state.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';

export const inputCommands = {
  MoveLeft_: 0,
  MoveRight_: 1,
  MoveUp_: 2,
  MoveDown_: 3,
  Fire_: 4,
  Reload_: 5,
  Cancel_: 6,
  Interact_: 7,
  Revive_: 8,
  Use_: 9,
  Loot_: 10,
  EquipPrimary_: 11,
  EquipSecondary_: 12,
  EquipMelee_: 13,
  EquipThrowable_: 14,
  EquipFragGrenade_: 15,
  EquipSmokeGrenade_: 16,
  EquipNextWeap_: 17,
  EquipPrevWeap_: 18,
  EquipLastWeap_: 19,
  EquipOtherGun_: 20,
  EquipPrevScope_: 21,
  EquipNextScope_: 22,
  UseBandage_: 23,
  UseHealthKit_: 24,
  UseSoda_: 25,
  UsePainkiller_: 26,
  StowWeapons_: 27,
  SwapWeapSlots_: 28,
  ToggleMap_: 29,
  CycleUIMode_: 30,
  EmoteMenu_: 31,
  TeamPingMenu_: 32,
  Fullscreen_: 33,
  HideUI_: 34,
  TeamPingSingle_: 35,
  Count_: 36,
};

export const packetTypes = {
  None_: 0,
  Join_: 1,
  Disconnect_: 2,
  Input_: 3,
  Edit_: 4,
  Joined_: 5,
  Update_: 6,
  Kill_: 7,
  GameOver_: 8,
  Pickup_: 9,
  Map_: 10,
  Spectate_: 11,
  DropItem_: 12,
  Emote_: 13,
  PlayerStats_: 14,
  AdStatus_: 15,
  Loadout_: 16,
  RoleAnnouncement_: 17,
  Stats_: 18,
  UpdatePass_: 19,
  AliveCounts_: 20,
  PerkModeRoleSelect_: 21,
};

export let gameObjects;

hook(outer.Object, 'keys', {
  apply(f, th, args) {
    if (
      args[0]?.bullet_mp5?.type == 'bullet' &&
      args[0]?.explosion_frag?.type == 'explosion' &&
      args[0]?.mp5?.type == 'gun' &&
      args[0]?.frag?.type == 'throwable'
    ) {
      gameObjects = args[0];
      outer.Object.keys = f;
    }
    return Reflect.apply(f, th, args);
  },
});

export function isGameReady() {
  return (
    gameManager.game?.[translations.ws_] &&
    gameManager.game?.[translations.activePlayer_]?.[translations.localData_]?.[
    translations.curWeapIdx_
    ] != null &&
    gameManager.game?.initialized
  );
}

export function findTeam(player) {
  return Object.keys(gameManager.game[translations.playerBarn_].teamInfo).find((team) =>
    gameManager.game[translations.playerBarn_].teamInfo[team].playerIds.includes(player.__id)
  );
}

export function findWeapon(player) {
  const weaponType = player[translations.netData_][translations.activeWeapon_];
  return weaponType && gameObjects[weaponType] ? gameObjects[weaponType] : null;
}

export function findBullet(weapon) {
  return weapon ? gameObjects[weapon.bulletType] : null;
}

/**
 * Check if player's weapon is currently reloading
 * Checks netData for action type values: 0=None, 1=Reload, 2=ReloadAlt, 3=UseItem, 4=Revive
 */
export function isWeaponReloading(player) {
  try {
    if (!player || !player[translations.netData_]) return false;
    
    const netData = player[translations.netData_];
    
    // Look for action type in netData
    // The action type is usually a small integer (0-5) that indicates player state
    for (const key in netData) {
      const value = netData[key];
      
      // Check if this is an action type object with a 'type' property
      if (value && typeof value === 'object' && 'type' in value) {
        const actionType = value.type;
        // 1 = Reload, 2 = ReloadAlt
        if (actionType === 1 || actionType === 2) {
          return true;
        }
      }
      
      // Alternative: check if key name suggests it's action-related
      if (key.toLowerCase().includes('action') && typeof value === 'number') {
        if (value === 1 || value === 2) return true;
      }
    }
    
    return false;
  } catch {
    return false;
  }
}

/**
 * Check if player is currently healing/using a healing item
 */
export function isPlayerHealing(player) {
  try {
    const netData = player?.[translations.netData_];
    const activeWeapon = netData?.[translations.activeWeapon_];
    if (!activeWeapon) return false;

    const w = activeWeapon.toLowerCase();
    return w.includes('bandage') || w.includes('health') || w.includes('medkit') || w.includes('soda') || w.includes('pill');
  } catch {
    return false;
  }
}

export let PIXI = {
  Graphics_: undefined,
  Container_: undefined,
};
