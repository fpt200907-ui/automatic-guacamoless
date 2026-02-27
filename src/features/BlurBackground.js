import { outer, outerDocument } from '@/core/outer.js';
import { settings } from '@/core/state.js';

const STYLE_ID = 'surt-blur-start-overlay';

// Google Ads Blocker Configuration
const AD_BLOCK_KEYWORDS = [
  'doubleclick.net',
  '2mdn.net',
  'googlesyndication',
  'googleads',
  'adservice',
  'google-analytics',
  'pagead2.googlesyndication'
];

// Ads Blocker functions
let adObserver = null;

const isAdUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return AD_BLOCK_KEYWORDS.some(keyword => url.toLowerCase().includes(keyword));
};

const removeAds = () => {
  if (!outerDocument) return;
  try {
    outerDocument.querySelectorAll(
      '.GoogleCreativeContainerClass,' +
      '[id^="gcc_"],' +
      'iframe[src*="doubleclick"],' +
      'iframe[src*="2mdn"],' +
      'iframe[src*="googleads"],' +
      'iframe[src*="googlesyndication"],' +
      'iframe[src*="adservice"],' +
      '.adsbygoogle,' +
      '.ad-container,' +
      '[class*="ad-container"],' +
      '[id*="ad-container"]'
    ).forEach(el => {
      try {
        el.remove();
      } catch { }
    });
  } catch { }
};

const setupAdObserver = () => {
  if (adObserver) return; // Đã setup rồi
  
  try {
    if (!outerDocument || !outerDocument.body) return;
    
    // Remove ads lần đầu
    removeAds();
    
    // Setup observer chống inject lại
    adObserver = new MutationObserver(() => {
      removeAds();
    });
    
    adObserver.observe(outerDocument.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'href', 'id', 'class']
    });
  } catch { }
};

const cleanupAdObserver = () => {
  if (adObserver) {
    try {
      adObserver.disconnect();
      adObserver = null;
    } catch { }
  }
};

const CSS_CONTENT = `
#start-overlay{
  backdrop-filter:blur(5.21px) brightness(0.6);
}
#btn-game-quit {
  background-image: url("../img/gui/quit.svg") !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
}
#news-block {
  opacity: 0 !important;
  pointer-events: none !important;
}
#start-bottom-right {
  opacity: 0 !important;
  transition: 0.3s !important;
}
#start-bottom-right:hover {
  opacity: 1 !important;
}
#btn-help, .account-details-top-buttons .account-leaderboard-link span, .account-details-top-buttons .account-details-button .account-link, .account-block .account-details-top .account-details-top-buttons, #ad-block-left, #social-share-block, #start-bottom-middle .footer-after, #start-bottom-middle, .publift-widget-sticky_footer-container .publift-widget-sticky_footer-container-background, .publift-widget-sticky_footer-container .publift-widget-sticky_footer, .ad-block-header div iframe, .ad-block-header .fuse-slot div, .publift-widget-sticky_footer-container .publift-widget-sticky_footer-container-background, .publift-widget-sticky_footer-container .publift-widget-sticky_footer {
  pointer-events: none !important;
  opacity: 0 !important;
}
#start-row-header{
  background-image:url("https://i.postimg.cc/7Zc6VXvN/logo.png");
  top: -100px;
  opacity: 1 !important;
}
.GoogleCreativeContainerClass {
  display: none !important;
}
#btns-quick-start a, #server-select-main, #start-menu {
 border-top-left-radius:14px;
 border-top-right-radius:14px;
 border-bottom-left-radius:14px;
 border-bottom-right-radius:14px;
}
#start-menu .btn-custom-mode-no-indent, #btn-join-team, #btn-create-team, #btn-customize, #player-name-input-solo {
  border-top-left-radius:14px;
  border-top-right-radius:14px;
  border-bottom-left-radius:14px;
  border-bottom-right-radius:14px;
}
#btn-start-mode-0, #btn-start-team, #team-menu-options .btn-darken, #team-menu-options :nth-child(1), #btn-team-queue-mode-2 , #team-server-select , #btn-team-fill-auto , #btn-start-team, #btn-team-queue-mode-1 , #btn-team-queue-mode-2 , #team-server-select , #btn-team-fill-auto , #btn-start-team, #btn-team-fill-none , #btn-team-queue-mode-1 , #btn-team-queue-mode-2 , #team-server-select , #btn-team-fill-auto , #btn-start-team, #btn-team-leave, .name-self, .name-text {
  border-top-left-radius:14px;
  border-top-right-radius:14px;
  border-bottom-left-radius:14px;
  border-bottom-right-radius:14px;
}


/* Google Ads Blocker CSS */
[id^="gcc_"] {
  display: none !important;
  visibility: hidden !important;
}

iframe[src*="doubleclick"],
iframe[src*="2mdn"],
iframe[src*="googleads"],
iframe[src*="googlesyndication"],
iframe[src*="adservice"] {
  display: none !important;
  visibility: hidden !important;
  width: 0 !important;
  height: 0 !important;
}

.adsbygoogle,
.ad-container,
[class*="ad-"],
[id*="ad-"],
.ads,
#ads {
  display: none !important;
  visibility: hidden !important;
}


.surt-stat {
  display: block;
  margin-bottom: 6px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1;
  border-radius: 12px;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow: 
    0 8px 24px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.15);
  backdrop-filter: blur(12px) saturate(180%) brightness(1.1);
  -webkit-backdrop-filter: blur(12px) saturate(180%) brightness(1.1);
  text-shadow: 0 2px 4px rgba(0,0,0,0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
  overflow: hidden;
  position: relative;
}

/* Glass edge highlight */
.surt-stat::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255,255,255,0.3), 
    transparent);
  z-index: 1;
}

.surt-stat:hover {
  transform: translateY(-1px);
  box-shadow: 
    0 12px 28px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.2);
}

.surt-stat.surt-fps, .surt-stat.surt-ping {
  position: relative;
  left: 5px;
  top: -5px;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 14px;
  border-radius: 14px;
}

.surt-stat.surt-health, .surt-stat.surt-adr {
  position: fixed;
  top: 12px;
  z-index: 9999;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 16px;
  min-width: 100px;
  text-align: center;
  letter-spacing: 0.5px;
}

.surt-stat.surt-health { 
  right: 15px; 
  background: linear-gradient(135deg, 
    rgba(255,255,255,0.1) 0%, 
    rgba(255,107,107,0.08) 100%);
}

.surt-stat.surt-adr { 
  left: 15px; 
  background: linear-gradient(135deg, 
    rgba(255,255,255,0.1) 0%, 
    rgba(124,252,0,0.08) 100%);
}

/* Enhanced Glow & pulse effects */
.surt-low {
  color: #FFB8B8 !important;
  background: linear-gradient(135deg, 
    rgba(255,255,255,0.1) 0%, 
    rgba(255,107,107,0.15) 100%) !important;
  border-color: rgba(255,107,107,0.35) !important;
  text-shadow: 0 1px 3px rgba(255,107,107,0.3);
}

.surt-warn {
  color: #FFE8A3 !important;
  background: linear-gradient(135deg, 
    rgba(255,255,255,0.1) 0%, 
    rgba(255,209,102,0.15) 100%) !important;
  border-color: rgba(255,209,102,0.35) !important;
  text-shadow: 0 1px 3px rgba(255,209,102,0.3);
}

.surt-good {
  color: #58fc00 !important;
  background: linear-gradient(135deg, 
    rgba(255,255,255,0.1) 0%, 
    rgba(124,252,0,0.15) 100%) !important;
  border-color: rgba(124,252,0,0.35) !important;
  text-shadow: 0 1px 3px rgba(124,252,0,0.3);
}

/* Add subtle background noise for more glass texture */
.surt-stat::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(
      circle at 30% 30%,
      rgba(255,255,255,0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 70%,
      rgba(255,255,255,0.03) 0%,
      transparent 50%
    );
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
}

/* Optional: Add a subtle shine effect on hover */
.surt-stat:hover::after {
  animation: surt-shine 0.8s ease-out;
}

@keyframes surt-shine {
  0% {
    background-position: -100px;
  }
  100% {
    background-position: 200px;
  }
}

/* Responsive adjustments */
@media (max-width: 850px) {
  .surt-stat.surt-health, .surt-stat.surt-adr {
    padding: 8px 12px;
    font-size: 14px;
    min-width: 80px;
  }
}

@media (min-width: 851px) {
  #start-row-header {
    height: 140px;
    margin-bottom: 0px;
  }
}
`;

export default function () {
  // Keep the style in sync with the user's setting.
  let applied = false;

  const applyStyle = () => {
    try {
      if (!outerDocument) return;
      const existing = outerDocument.getElementById(STYLE_ID);

      if (settings.blurBackground_ && settings.blurBackground_.enabled_) {
        if (!existing) {
          const s = outerDocument.createElement('style');
          s.id = STYLE_ID;
          s.type = 'text/css';
          s.innerHTML = CSS_CONTENT;
          outerDocument.head.appendChild(s);
        }
        setupAdObserver(); // Setup DOM ad observer
        applied = true;
      } else {
        if (existing) existing.remove();
        cleanupAdObserver(); // Cleanup ad observer
        applied = false;
      }
    } catch { }
  };

  // Apply immediately and then poll occasionally so toggling in UI works.
  applyStyle();
  const interval = setInterval(applyStyle, 500);

  // Extras: FPS, Ping, Health, Armor highlights and optional FPS cap.
  let extrasInitialized = false;
  let healthEl = null;
  let adrEl = null;
  let healthInterval = null;
  let lastKills = 0;
  let killSound = null;
  let armorObservers = [];
  let weaponObservers = [];

  const getKills = () => {
    try {
      const killsElement = outerDocument.querySelector('.ui-player-kills.js-ui-player-kills');
      return Number.parseInt(killsElement?.textContent || "0", 10) || 0;
    } catch {
      return 0;
    }
  };

  const playKillSound = async () => {
    try {
      if (!killSound) {
        killSound = new Audio('https://raw.githubusercontent.com/surminusclient1/bac/main/bonk.wav');
        killSound.volume = 0.5;
      }
      killSound.currentTime = 0;
      await killSound.play();
    } catch (e) {
      console.error('Failed to play kill sound:', e);
    }
  };

  const setupWeaponBorderHandler = () => {
    try {
      if (!outerDocument) return;
      const weaponContainers = Array.from(outerDocument.getElementsByClassName("ui-weapon-switch"));
      weaponContainers.forEach((container) => {
        container.style.border = container.id === "ui-weapon-id-4" ? "3px solid #2f4032" : "3px solid #FFFFFF";
      });
      const weaponNames = Array.from(outerDocument.getElementsByClassName("ui-weapon-name"));
      weaponNames.forEach((weaponNameElement) => {
        const weaponContainer = weaponNameElement.closest(".ui-weapon-switch");
        if (!weaponContainer)
          return;
        const observer = new MutationObserver(() => {
          try {
            const weaponName = (weaponNameElement.textContent || "").trim();
            let border = "#FFFFFF";
            switch (weaponName.toUpperCase()) {
              case "CZ-3A1":
              case "G18C":
              case "M9":
              case "M93R":
              case "MAC-10":
              case "MP5":
              case "P30L":
              case "DUAL P30L":
              case "UMP9":
              case "VECTOR":
              case "VSS":
              case "FLAMETHROWER":
                border = "#FFAE00";
                break;
              case "AK-47":
              case "OT-38":
              case "OTS-38":
              case "M39 EMR":
              case "DP-28":
              case "MOSIN-NAGANT":
              case "SCAR-H":
              case "SV-98":
              case "M1 GARAND":
              case "PKP PECHENEG":
              case "AN-94":
              case "BAR M1918":
              case "BLR 81":
              case "SVD-63":
              case "M134":
              case "GROZA":
              case "GROZA-S":
                border = "#007FFF";
                break;
              case "FAMAS":
              case "M416":
              case "M249":
              case "QBB-97":
              case "MK 12 SPR":
              case "M4A1-S":
              case "SCOUT ELITE":
              case "L86A2":
                border = "#0f690d";
                break;
              case "M870":
              case "MP220":
              case "SAIGA-12":
              case "SPAS-12":
              case "USAS-12":
              case "SUPER 90":
              case "LASR GUN":
              case "M1100":
                border = "#FF0000";
                break;
              case "MODEL 94":
              case "PEACEMAKER":
              case "MK45G":
              case "M1911":
              case "M1A1":
                border = "#800080";
                break;
              case "DEAGLE 50":
              case "RAINBOW BLASTER":
                border = "#000000";
                break;
              case "AWM-S":
              case "MK 20 SSR":
                border = "#808000";
                break;
              case "POTATO CANNON":
              case "SPUD GUN":
                border = "#A52A2A";
                break;
              case "FLARE GUN":
                border = "#FF4500";
                break;
              case "M79":
                border = "#008080";
                break;
              case "HEART CANNON":
                border = "#FFC0CB";
                break;
              default:
                break;
            }
            if (weaponContainer.id !== "ui-weapon-id-4") {
              weaponContainer.style.border = `3px solid ${border}`;
            }
          } catch { }
        });
        observer.observe(weaponNameElement, { childList: true, characterData: true, subtree: true });
        weaponObservers.push(observer);
      });
    } catch { }
  };

  const startPingTest = () => {
    // Ping test removed
  };

  const initExtras = () => {
    if (extrasInitialized) return;
    try {
      // Health & ADR display (from pingfps.js style)
      try {
        const healthContainer = outerDocument.querySelector('#ui-health-container');
        if (healthContainer) {
          let lastHP = 0;
          
          healthEl = outerDocument.createElement('span');
          healthEl.style.cssText = 'display:block;position:fixed;z-index: 2;margin:6px 0 0 0;right: 15px;mix-blend-mode: difference;font-weight: bold;font-size:large;';
          healthContainer.appendChild(healthEl);

          adrEl = outerDocument.createElement('span');
          adrEl.style.cssText = 'display:block;position:fixed;z-index: 2;margin:6px 0 0 0;left: 15px;mix-blend-mode: difference;font-weight: bold;font-size: large;';
          healthContainer.appendChild(adrEl);

          healthInterval = setInterval(() => {
            try {
              const hpPercent = outerDocument.getElementById('ui-health-actual').style.width.slice(0, -1);
              if (hpPercent !== lastHP) {
                lastHP = hpPercent;
                healthEl.innerHTML = Number.parseFloat(hpPercent).toFixed(1);
              }
              
              const boost0Width = parseFloat(outerDocument.getElementById('ui-boost-counter-0').querySelector('.ui-bar-inner').style.width.slice(0, -1)) / 100;
              const boost1Width = parseFloat(outerDocument.getElementById('ui-boost-counter-1').querySelector('.ui-bar-inner').style.width.slice(0, -1)) / 100;
              const boost2Width = parseFloat(outerDocument.getElementById('ui-boost-counter-2').querySelector('.ui-bar-inner').style.width.slice(0, -1)) / 100;
              const boost3Width = parseFloat(outerDocument.getElementById('ui-boost-counter-3').querySelector('.ui-bar-inner').style.width.slice(0, -1)) / 100;
              
              const adrTotal = 25 * boost0Width + 25 * boost1Width + 37.5 * boost2Width + 12.5 * boost3Width;
              adrEl.innerHTML = Math.round(adrTotal);
              
              // Detect kill count increase and trigger sound (no visual display)
              const currentKills = getKills();
              if (currentKills > lastKills) {
                lastKills = currentKills;
                playKillSound();
              }
            } catch { }
          }, 1000);
        }
      } catch { }

      // Armor color border
      try {
        const boxes = Array.from(outerDocument.getElementsByClassName('ui-armor-level'));
        boxes.forEach((box) => {
          const callback = () => {
            try {
              const armorlv = box.textContent?.trim();
              let color = '#000000';
              switch (armorlv) {
                case 'Lvl. 0':
                case 'Lvl. 1':
                  color = '#FFFFFF';
                  break;
                case 'Lvl. 2':
                  color = '#808080';
                  break;
                case 'Lvl. 3':
                  color = '#0C0C0C';
                  break;
                case 'Lvl. 4':
                  color = '#FFF00F';
                  break;
                default:
                  color = '#000000';
              }
              box.parentNode.style.border = `solid ${color}`;
            } catch { }
          };

          const mo = new MutationObserver(callback);
          mo.observe(box, { characterData: true, subtree: true, childList: true });
          armorObservers.push(mo);
        });
      } catch { }
      // Weapon border handler
      try {
        setupWeaponBorderHandler();
      } catch { }

      extrasInitialized = true; 
    } catch { }
  };

  const cleanupExtras = () => {
    try {
      if (healthEl && healthEl.parentNode) healthEl.remove();
      if (adrEl && adrEl.parentNode) adrEl.remove();
      if (healthInterval) clearInterval(healthInterval);
      lastKills = 0;
      killSound = null;
      
      // Cleanup weapon observers and borders
      weaponObservers.forEach((mo) => mo.disconnect());
      weaponObservers.length = 0;
      try {
        const weaponContainers = Array.from(outerDocument.getElementsByClassName('ui-weapon-switch'));
        weaponContainers.forEach((container) => {
          if (container && container.style) container.style.border = '';
        });
      } catch { }

      armorObservers.forEach((mo) => mo.disconnect());
      armorObservers.length = 0;
      cleanupAdObserver(); // Cleanup ad observer
      extrasInitialized = false;
    } catch { }
  };

  const applyExtras = () => {
    if (settings.blurBackground_ && settings.blurBackground_.enabled_) {
      initExtras();
      startPingTest();
    } else {
      cleanupExtras();
    }
  };

  applyExtras();
  const extrasInterval = setInterval(() => {
    applyExtras();
    startPingTest();
  }, 1000);

  // We intentionally do not clear the intervals; they're lightweight and ensure toggles are applied.
}
