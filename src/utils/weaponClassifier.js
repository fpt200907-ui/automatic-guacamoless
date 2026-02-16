/**
 * Weapon Classification & Stats Utility
 * Categorizes weapons and provides metadata for Aimbot/ESP optimization
 */

export const WEAPON_CLASSES = {
  SMG: 'smg',
  AR: 'ar',
  LMG: 'lmg',
  DMR: 'dmr',
  SNIPER: 'sniper',
  SHOTGUN: 'shotgun',
  PISTOL: 'pistol',
  LAUNCHER: 'launcher',
  MELEE: 'melee',
  THROWABLE: 'throwable',
};

// Weapon classification mapping
export const WEAPON_TYPE_MAP = {
  // SMG
  mp5: WEAPON_CLASSES.SMG,
  mac10: WEAPON_CLASSES.SMG,
  ump9: WEAPON_CLASSES.SMG,
  vector: WEAPON_CLASSES.SMG,
  vector45: WEAPON_CLASSES.SMG,
  cz3a1: WEAPON_CLASSES.SMG,
  vss: WEAPON_CLASSES.SMG,
  scorpion: WEAPON_CLASSES.SMG,

  // AR
  famas: WEAPON_CLASSES.AR,
  m416: WEAPON_CLASSES.AR,
  m4a1: WEAPON_CLASSES.AR,
  hk416: WEAPON_CLASSES.AR,
  ak47: WEAPON_CLASSES.AR,
  an94: WEAPON_CLASSES.AR,
  groza: WEAPON_CLASSES.AR,
  grozas: WEAPON_CLASSES.AR,
  scar: WEAPON_CLASSES.AR,
  scarssr: WEAPON_CLASSES.AR,

  // LMG
  l86a2: WEAPON_CLASSES.LMG,
  m249: WEAPON_CLASSES.LMG,
  qbb97: WEAPON_CLASSES.LMG,
  dp28: WEAPON_CLASSES.LMG,
  bar: WEAPON_CLASSES.LMG,
  pkp: WEAPON_CLASSES.LMG,
  m134: WEAPON_CLASSES.LMG,

  // DMR
  mk12: WEAPON_CLASSES.DMR,
  m39: WEAPON_CLASSES.DMR,
  svd63: WEAPON_CLASSES.DMR,
  blr81: WEAPON_CLASSES.DMR,

  // Sniper
  scout_elite: WEAPON_CLASSES.SNIPER,
  mosin: WEAPON_CLASSES.SNIPER,
  sv98: WEAPON_CLASSES.SNIPER,
  awm: WEAPON_CLASSES.SNIPER,
  m1garand: WEAPON_CLASSES.SNIPER,

  // Shotgun
  m870: WEAPON_CLASSES.SHOTGUN,
  m1100: WEAPON_CLASSES.SHOTGUN,
  mp220: WEAPON_CLASSES.SHOTGUN,
  saiga12: WEAPON_CLASSES.SHOTGUN,
  spas12: WEAPON_CLASSES.SHOTGUN,
  m1014: WEAPON_CLASSES.SHOTGUN,
  usas12: WEAPON_CLASSES.SHOTGUN,
  super90: WEAPON_CLASSES.SHOTGUN,

  // Pistol
  model94: WEAPON_CLASSES.PISTOL,
  mk45g: WEAPON_CLASSES.PISTOL,
  m1911: WEAPON_CLASSES.PISTOL,
  m1a1: WEAPON_CLASSES.PISTOL,
  deagle: WEAPON_CLASSES.PISTOL,
  peacemaker: WEAPON_CLASSES.PISTOL,
  glock: WEAPON_CLASSES.PISTOL,
  flare_gun: WEAPON_CLASSES.LAUNCHER,

  // Special/Launcher
  m79: WEAPON_CLASSES.LAUNCHER,
  potato_cannon: WEAPON_CLASSES.LAUNCHER,
  flamethrower: WEAPON_CLASSES.LAUNCHER,
  lasr_gun: WEAPON_CLASSES.LAUNCHER,
  rainbow_blaster: WEAPON_CLASSES.LAUNCHER,

  // Throwables
  frag_grenade: WEAPON_CLASSES.THROWABLE,
  smoke_grenade: WEAPON_CLASSES.THROWABLE,
  mirv: WEAPON_CLASSES.THROWABLE,
  martyr: WEAPON_CLASSES.THROWABLE,

  // Melee
  crowbar: WEAPON_CLASSES.MELEE,
  baseball_bat: WEAPON_CLASSES.MELEE,
  machete: WEAPON_CLASSES.MELEE,
  katana: WEAPON_CLASSES.MELEE,
  sledgehammer: WEAPON_CLASSES.MELEE,
  fireaxe: WEAPON_CLASSES.MELEE,
  sabre: WEAPON_CLASSES.MELEE,
};

/**
 * Weapon-specific aimbot parameters
 * Adjust sensitivity, smoothing, and prediction based on weapon type
 */
export const WEAPON_AIMBOT_PARAMS = {
  [WEAPON_CLASSES.SNIPER]: {
    sensitivity: 0.5,      // Low sensitivity for precision
    smoothing: 0.85,       // High smoothing for stable tracking
    predictionFactor: 1.2, // More prediction needed for slow fire rate
    recoilCompensation: 0.3,
  },
  [WEAPON_CLASSES.DMR]: {
    sensitivity: 0.65,
    smoothing: 0.8,
    predictionFactor: 1.1,
    recoilCompensation: 0.5,
  },
  [WEAPON_CLASSES.AR]: {
    sensitivity: 0.9,
    smoothing: 0.75,
    predictionFactor: 0.9,
    recoilCompensation: 0.7,
  },
  [WEAPON_CLASSES.SMG]: {
    sensitivity: 1.1,      // High sensitivity for close range
    smoothing: 0.65,       // Less smoothing for quick target switching
    predictionFactor: 0.8,
    recoilCompensation: 0.8,
  },
  [WEAPON_CLASSES.LMG]: {
    sensitivity: 0.85,
    smoothing: 0.7,
    predictionFactor: 0.85,
    recoilCompensation: 0.6,
  },
  [WEAPON_CLASSES.SHOTGUN]: {
    sensitivity: 1.2,
    smoothing: 0.6,        // Minimal smoothing needed
    predictionFactor: 0.7,
    recoilCompensation: 0.9,
  },
  [WEAPON_CLASSES.PISTOL]: {
    sensitivity: 1.0,
    smoothing: 0.7,
    predictionFactor: 0.85,
    recoilCompensation: 0.6,
  },
  [WEAPON_CLASSES.LAUNCHER]: {
    sensitivity: 0.7,
    smoothing: 0.8,
    predictionFactor: 1.3,  // High prediction for projectile arc
    recoilCompensation: 0.4,
  },
};

/**
 * Weapon fire rate tiers (for balance awareness)
 */
export const FIRE_RATE_TIERS = {
  ULTRA_FAST: { min: 0.05, max: 0.07 },   // Vector, MAC-10
  VERY_FAST: { min: 0.07, max: 0.09 },    // USAS, MP5
  FAST: { min: 0.09, max: 0.12 },         // Most ARs, SMGs
  MEDIUM: { min: 0.12, max: 0.15 },       // DMR, some LMGs
  SLOW: { min: 0.15, max: 0.4 },          // Shotgun, Pistol
  VERY_SLOW: { min: 0.4, max: 1.0 },      // Sniper
};

/**
 * Get weapon class from weapon name/id
 * @param {string} weaponId - Weapon identifier
 * @returns {string} Weapon class
 */
export const getWeaponClass = (weaponId) => {
  if (!weaponId) return WEAPON_CLASSES.AR; // Default
  const normalized = weaponId.toLowerCase().replace(/[_\s]/g, '');
  
  // Direct lookup
  if (WEAPON_TYPE_MAP[weaponId]) {
    return WEAPON_TYPE_MAP[weaponId];
  }
  
  // Fuzzy matching
  for (const [key, value] of Object.entries(WEAPON_TYPE_MAP)) {
    if (weaponId.includes(key) || key.includes(normalizedId)) {
      return value;
    }
  }
  
  return WEAPON_CLASSES.AR; // Default fallback
};

/**
 * Get aimbot parameters for a weapon
 * @param {string} weaponId - Weapon identifier
 * @returns {object} Aimbot parameters
 */
export const getAimbotParams = (weaponId) => {
  const weaponClass = getWeaponClass(weaponId);
  return WEAPON_AIMBOT_PARAMS[weaponClass] || WEAPON_AIMBOT_PARAMS[WEAPON_CLASSES.AR];
};

/**
 * Determine if weapon is hitscan (instant) vs projectile
 * @param {string} weaponId - Weapon identifier
 * @returns {boolean} True if hitscan
 */
export const isHitscan = (weaponId) => {
  const launchers = [
    'm79',
    'flare_gun',
    'potato_cannon',
    'flamethrower',
    'lasr_gun',
  ];
  return !launchers.some((l) => weaponId.includes(l));
};

/**
 * Get visual color for weapon class (for ESP highlighting)
 * @param {string} weaponId - Weapon identifier
 * @returns {number} Hex color
 */
export const getWeaponClassColor = (weaponId) => {
  const weaponClass = getWeaponClass(weaponId);
  
  const colorMap = {
    [WEAPON_CLASSES.SMG]: 0xffc66d,      // M3 Tertiary (Orange)
    [WEAPON_CLASSES.AR]: 0x7dd5e6,       // M3 Secondary (Cyan)
    [WEAPON_CLASSES.LMG]: 0x9ca3af,      // M3 On Surface Variant
    [WEAPON_CLASSES.DMR]: 0xffb800,      // M3 Primary (Yellow)
    [WEAPON_CLASSES.SNIPER]: 0xf28482,   // M3 Error (Red)
    [WEAPON_CLASSES.SHOTGUN]: 0xff6b6b,  // Red variant
    [WEAPON_CLASSES.PISTOL]: 0xb3b3b3,   // Gray
    [WEAPON_CLASSES.LAUNCHER]: 0xff9800,  // Orange
    [WEAPON_CLASSES.MELEE]: 0x8b4513,    // Brown
    [WEAPON_CLASSES.THROWABLE]: 0xffaa00, // Gold
  };
  
  return colorMap[weaponClass] || 0xffffff;
};

/**
 * Get weapon tier (rarity/quality)
 * @param {string} weaponId - Weapon identifier
 * @returns {number} Tier level (0-6+)
 */
export const getWeaponTier = (weaponId) => {
  const weaponClass = getWeaponClass(weaponId);
  
  const tierMap = {
    [WEAPON_CLASSES.SNIPER]: 5,
    [WEAPON_CLASSES.DMR]: 4,
    [WEAPON_CLASSES.LMG]: 4,
    [WEAPON_CLASSES.AR]: 2,
    [WEAPON_CLASSES.SMG]: 0,
    [WEAPON_CLASSES.SHOTGUN]: 3,
    [WEAPON_CLASSES.PISTOL]: 0,
    [WEAPON_CLASSES.LAUNCHER]: 5,
    [WEAPON_CLASSES.THROWABLE]: 3,
    [WEAPON_CLASSES.MELEE]: 0,
  };
  
  return tierMap[weaponClass] || 0;
};

/**
 * Check if weapon is long-range focused
 * @param {string} weaponId - Weapon identifier
 * @returns {boolean}
 */
export const isLongRangeWeapon = (weaponId) => {
  const weaponClass = getWeaponClass(weaponId);
  return [WEAPON_CLASSES.SNIPER, WEAPON_CLASSES.DMR, WEAPON_CLASSES.AR].includes(
    weaponClass
  );
};

/**
 * Check if weapon is close-range focused
 * @param {string} weaponId - Weapon identifier
 * @returns {boolean}
 */
export const isCloseRangeWeapon = (weaponId) => {
  const weaponClass = getWeaponClass(weaponId);
  return [WEAPON_CLASSES.SHOTGUN, WEAPON_CLASSES.SMG, WEAPON_CLASSES.MELEE].includes(
    weaponClass
  );
};

/**
 * Get expected accuracy tier for weapon
 * @param {string} weaponId - Weapon identifier
 * @returns {string} 'high', 'medium', or 'low'
 */
export const getAccuracyTier = (weaponId) => {
  const weaponClass = getWeaponClass(weaponId);
  
  if ([WEAPON_CLASSES.SNIPER, WEAPON_CLASSES.DMR].includes(weaponClass)) {
    return 'high';
  }
  
  if ([WEAPON_CLASSES.AR, WEAPON_CLASSES.PISTOL].includes(weaponClass)) {
    return 'medium';
  }
  
  return 'low'; // SMG, Shotgun, etc.
};

/**
 * Get action priority for conflict resolution
 * Higher priority = should execute first
 * @param {number} actionType - Action type from netData
 * @returns {number} Priority level (0=none, 1=attack, 2=heal, 3=reload)
 */
export const getActionPriority = (actionType) => {
  if (!actionType) return 0;
  
  // 1 = Reload, 2 = ReloadAlt
  if (actionType === 1 || actionType === 2) return 3; // Reload = highest priority
  
  // 3 = UseItem (healing)
  if (actionType === 3) return 2; // Heal = second priority
  
  // 0 = None, 4 = Revive, 5+ = other
  // Gun attack implicitly is lower priority than active actions
  return 1;
};

/**
 * Check if player is in critical action (reload/heal/revive)
 * These should block other actions
 * @param {number} actionType - Action type from netData
 * @returns {boolean} True if player should not switch actions
 */
export const isInCriticalAction = (actionType) => {
  // 1 = Reload, 2 = ReloadAlt, 3 = UseItem, 4 = Revive
  return actionType >= 1 && actionType <= 4;
};

export default {
  WEAPON_CLASSES,
  WEAPON_TYPE_MAP,
  WEAPON_AIMBOT_PARAMS,
  FIRE_RATE_TIERS,
  getWeaponClass,
  getAimbotParams,
  isHitscan,
  getWeaponClassColor,
  getWeaponTier,
  isLongRangeWeapon,
  isCloseRangeWeapon,
  getAccuracyTier,
  getActionPriority,
  isInCriticalAction,
};
