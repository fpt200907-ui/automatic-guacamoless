import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from '@/ui/components/Menu.jsx';
import DiscordNotification from '@/ui/components/DiscordNotification.jsx';
import { defaultSettings, settings, setUIRoot, markConfigLoaded } from '@/core/state.js';
import { ref_addEventListener } from '@/core/hook.js';
import { read, initStore } from '@/utils/store.js';
import { encryptDecrypt } from '@/utils/crypto.js';
import { globalStylesheet } from '@/ui/components/styles.css';
import { outer, outerDocument, shadowRoot, versionPromise } from '@/core/outer.js';
import { FONT_NAME } from '@/core/hook.js';
import { playSound, initSounds } from '@/utils/soundNotifier.js';
import { applyM3Theme } from '@/ui/theme/m3-theme.js';

export let menuElement;

let reactRoot = null;
let notificationRoot = null;
let setMenuVisible = () => {};
let menuVersion = '';
let settingsLoaded = false;

const renderMenu = () => {
  if (!reactRoot || !settingsLoaded) return;
  reactRoot.render(
    <Menu
      settings={settings}
      onSettingChange={handleSettingChange}
      onClose={() => setMenuVisible(false)}
      version={menuVersion}
    />
  );
};

const checkIfNotificationShown = () => {
  return settings.misc_.discordNotifShown_ === true;
};

const renderNotification = () => {
  if (!notificationRoot || !settingsLoaded) return;

  if (!checkIfNotificationShown()) {
    notificationRoot.render(
      <DiscordNotification settings={settings} onSettingChange={handleSettingChange} />
    );
  }
};



function handleSettingChange(updater) {
  try {
    // Store old settings state for comparison
    const oldSettings = JSON.parse(JSON.stringify(settings));
    
    // Apply the updater
    updater(settings);
    
    // Detect enable/disable changes
    const detectChanges = (oldObj, newObj, soundPlayed = false) => {
      if (!oldObj || !newObj) return soundPlayed;
      
      for (const key in newObj) {
        if (typeof newObj[key] === 'object' && newObj[key] !== null && !soundPlayed) {
          if (newObj[key].enabled_ !== undefined) {
            const oldEnabled = oldObj[key]?.enabled_;
            const newEnabled = newObj[key].enabled_;
            
            // Play sound if state changed
            if (oldEnabled !== newEnabled) {
              if (newEnabled === true) {
                playSound('enable');
              } else if (newEnabled === false) {
                playSound('disable');
              }
              return true; // Only play one sound per change
            }
          }
          // Recursively check nested objects
          if (detectChanges(oldObj[key] || {}, newObj[key], soundPlayed)) {
            return true;
          }
        }
      }
      return soundPlayed;
    };
    
    detectChanges(oldSettings, settings);
  } catch (error) {
    console.error('[SurMinus] Error in handleSettingChange:', error);
  }
  
  renderMenu();
}

const attachFont = async () => {
  const base =
    'https://cdn.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/';
  const fonts = [
    { name: FONT_NAME, file: 'GothamPro.woff2', weight: 200, style: 'normal' },
    { name: FONT_NAME, file: 'GothamPro-Italic.woff2', weight: 200, style: 'italic' },
    { name: FONT_NAME, file: 'GothamPro-Medium.woff2', weight: 400, style: 'normal' },
    { name: FONT_NAME, file: 'GothamPro-MediumItalic.woff2', weight: 400, style: 'italic' },
    { name: FONT_NAME, file: 'GothamPro-Bold.woff2', weight: 600, style: 'normal' },
  ];

  const loadPromises = fonts.map(async (font) => {
    try {
      const fontFace = new FontFace(font.name, `url(${base}${font.file})`, {
        weight: font.weight.toString(),
        style: font.style,
      });
      await fontFace.load();
      outerDocument.fonts.add(fontFace);
    } catch {}
  });

  await Promise.all(loadPromises);
};

const createShadowRoot = () => {
  setUIRoot(shadowRoot);
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStylesheet.replace(/GothamPro/g, FONT_NAME);
  shadowRoot.appendChild(styleElement);
  return shadowRoot;
};

const createMenuContainer = (shadow) => {
  const root = document.createElement('div');
  shadow.appendChild(root);
  reactRoot = ReactDOM.createRoot(root);
  menuElement = root;
  return root;
};

const createNotificationContainer = (shadow) => {
  const root = document.createElement('div');
  shadow.appendChild(root);
  notificationRoot = ReactDOM.createRoot(root);
  return root;
};


const toggleSetting = (getter, setter) => {
  handleSettingChange((s) => {
    const newValue = !getter(s);
    setter(s, newValue);
  });
};

const registerKeyboardShortcuts = (root) => {
  Reflect.apply(ref_addEventListener, outer, [
    'keydown',
    (event) => {
      if (event.code === settings.keybinds_.toggleMenu_) {
        const menu = root.querySelector('#ui');
        if (!menu) return;
        const hidden = menu.style.display === 'none';
        menu.style.display = hidden ? '' : 'none';
        setMenuVisible = (visible) => {
          if (menu) menu.style.display = visible ? '' : 'none';
        };
        return;
      }
      if (event.code === settings.keybinds_.toggleAimbot_) {
        toggleSetting(
          (s) => s.aimbot_.enabled_,
          (s, v) => (s.aimbot_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleAutoFire_) {
        toggleSetting(
          (s) => s.autoFire_.enabled_,
          (s, v) => (s.autoFire_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleAutoHeal_) {
        toggleSetting(
          (s) => s.autoHeal_.enabled_,
          (s, v) => (s.autoHeal_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleESP_) {
        toggleSetting(
          (s) => s.esp_.enabled_,
          (s, v) => (s.esp_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleXRay_) {
        toggleSetting(
          (s) => s.xray_.enabled_,
          (s, v) => (s.xray_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.togglePanHero_) {
        toggleSetting(
          (s) => s.panHero_.enabled_,
          (s, v) => (s.panHero_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleInfiniteZoom_) {
        toggleSetting(
          (s) => s.infiniteZoom_.enabled_,
          (s, v) => (s.infiniteZoom_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleLayerSpoof_) {
        toggleSetting(
          (s) => s.layerSpoof_.enabled_,
          (s, v) => (s.layerSpoof_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleMapHighlights_) {
        toggleSetting(
          (s) => s.mapHighlights_.enabled_,
          (s, v) => (s.mapHighlights_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleAutoLoot_) {
        toggleSetting(
          (s) => s.autoLoot_.enabled_,
          (s, v) => (s.autoLoot_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleAutoCrate_) {
        toggleSetting(
          (s) => s.autoCrateBreak_.enabled_,
          (s, v) => (s.autoCrateBreak_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleMeleeLock_) {
        toggleSetting(
          (s) => s.meleeLock_.enabled_,
          (s, v) => (s.meleeLock_.enabled_ = v)
        );
        return;
      }
      if (event.code === settings.keybinds_.toggleAutoSwitch_) {
        toggleSetting(
          (s) => s.autoSwitch_.enabled_,
          (s, v) => (s.autoSwitch_.enabled_ = v)
        );
        return;
      }
    },
  ]);
};

const createVisibilityController = (root) => {
  setMenuVisible = (visible) => {
    const menu = root.querySelector('#ui');
    if (menu) menu.style.display = visible ? '' : 'none';
  };
};

// Color presets matching Themes.jsx
const COLOR_PRESETS = [
  { id: 'yellow', primary: '#ffb800', gradient: 'linear-gradient(135deg, #ffb800 0%, #ff9500 100%)', primaryContainer: 'rgba(255, 184, 0, 0.15)', stateHover: 'rgba(255, 184, 0, 0.08)', stateFocus: 'rgba(255, 184, 0, 0.12)' },
  { id: 'mint', primary: '#6fd89f', gradient: 'linear-gradient(135deg, #6fd89f 0%, #5dd184 100%)', primaryContainer: 'rgba(111, 216, 159, 0.15)', stateHover: 'rgba(111, 216, 159, 0.08)', stateFocus: 'rgba(111, 216, 159, 0.12)' },
  { id: 'peach', primary: '#f5c69b', gradient: 'linear-gradient(135deg, #f5c69b 0%, #f0a476 100%)', primaryContainer: 'rgba(245, 198, 155, 0.15)', stateHover: 'rgba(245, 198, 155, 0.08)', stateFocus: 'rgba(245, 198, 155, 0.12)' },
  { id: 'lavender', primary: '#c8b5e6', gradient: 'linear-gradient(135deg, #c8b5e6 0%, #b895d4 100%)', primaryContainer: 'rgba(200, 181, 230, 0.15)', stateHover: 'rgba(200, 181, 230, 0.08)', stateFocus: 'rgba(200, 181, 230, 0.12)' },
  { id: 'pistachio', primary: '#b5d89f', gradient: 'linear-gradient(135deg, #b5d89f 0%, #a0ce84 100%)', primaryContainer: 'rgba(181, 216, 159, 0.15)', stateHover: 'rgba(181, 216, 159, 0.08)', stateFocus: 'rgba(181, 216, 159, 0.12)' },
  { id: 'rose', primary: '#f5bcd4', gradient: 'linear-gradient(135deg, #f5bcd4 0%, #f0a8c0 100%)', primaryContainer: 'rgba(245, 188, 212, 0.15)', stateHover: 'rgba(245, 188, 212, 0.08)', stateFocus: 'rgba(245, 188, 212, 0.12)' },
  { id: 'blush', primary: '#f5d4e0', gradient: 'linear-gradient(135deg, #f5d4e0 0%, #f0c4d0 100%)', primaryContainer: 'rgba(245, 212, 224, 0.15)', stateHover: 'rgba(245, 212, 224, 0.08)', stateFocus: 'rgba(245, 212, 224, 0.12)' },
  { id: 'skyblue', primary: '#b5d9f0', gradient: 'linear-gradient(135deg, #b5d9f0 0%, #80c8e8 100%)', primaryContainer: 'rgba(181, 217, 240, 0.15)', stateHover: 'rgba(181, 217, 240, 0.08)', stateFocus: 'rgba(181, 217, 240, 0.12)' },
  { id: 'green', primary: '#6edb72', gradient: 'linear-gradient(135deg, #6edb72 0%, #41d855 100%)', primaryContainer: 'rgba(110, 219, 114, 0.15)', stateHover: 'rgba(110, 219, 114, 0.08)', stateFocus: 'rgba(110, 219, 114, 0.12)' },
  { id: 'cyan', primary: '#00d9ff', gradient: 'linear-gradient(135deg, #00d9ff 0%, #00b8d4 100%)', primaryContainer: 'rgba(0, 217, 255, 0.15)', stateHover: 'rgba(0, 217, 255, 0.08)', stateFocus: 'rgba(0, 217, 255, 0.12)' },
  { id: 'pink', primary: '#ff006e', gradient: 'linear-gradient(135deg, #ff006e 0%, #e60062 100%)', primaryContainer: 'rgba(255, 0, 110, 0.15)', stateHover: 'rgba(255, 0, 110, 0.08)', stateFocus: 'rgba(255, 0, 110, 0.12)' },
  { id: 'purple', primary: '#b537f2', gradient: 'linear-gradient(135deg, #b537f2 0%, #9620d4 100%)', primaryContainer: 'rgba(181, 55, 242, 0.15)', stateHover: 'rgba(181, 55, 242, 0.08)', stateFocus: 'rgba(181, 55, 242, 0.12)' },
  { id: 'red', primary: '#ff3333', gradient: 'linear-gradient(135deg, #ff3333 0%, #e60000 100%)', primaryContainer: 'rgba(255, 51, 51, 0.15)', stateHover: 'rgba(255, 51, 51, 0.08)', stateFocus: 'rgba(255, 51, 51, 0.12)' }
];

// Load saved theme on page startup - apply immediately
const loadSavedTheme = (shadowRoot) => {
  const savedThemeId = localStorage.getItem('surminus-theme') || 'green'; // Default to green if no saved theme
  
  const theme = COLOR_PRESETS.find(t => t.id === savedThemeId);
  if (!theme) return;
  
  // Convert hex to RGB
  const hexToRgbObj = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      };
    }
    return { r: 110, g: 219, b: 114 };
  };
  
  const { r, g, b } = hexToRgbObj(theme.primary);
  
  // Apply to document root
  const styleTag = document.createElement('style');
  styleTag.id = 'surminus-theme-startup';
  styleTag.textContent = `
    :root {
      --md-primary: ${theme.primary} !important;
      --md-primary-container: ${theme.primaryContainer} !important;
      --md-state-hover: ${theme.stateHover} !important;
      --md-state-focus: ${theme.stateFocus} !important;
      --md-state-pressed: ${theme.stateFocus} !important;
      --md-state-dragged: rgba(${r}, ${g}, ${b}, 0.16) !important;
      --md-scrollbar-thumb: rgba(${r}, ${g}, ${b}, 0.5) !important;
      --md-scrollbar-thumb-hover: rgba(${r}, ${g}, ${b}, 0.8) !important;
    }
    
    #ui {
      --md-primary: ${theme.primary} !important;
      --md-primary-container: ${theme.primaryContainer} !important;
      --md-state-hover: ${theme.stateHover} !important;
      --md-state-focus: ${theme.stateFocus} !important;
      --md-state-pressed: ${theme.stateFocus} !important;
      --md-state-dragged: rgba(${r}, ${g}, ${b}, 0.16) !important;
      --md-scrollbar-thumb: rgba(${r}, ${g}, ${b}, 0.5) !important;
      --md-scrollbar-thumb-hover: rgba(${r}, ${g}, ${b}, 0.8) !important;
    }
    
    #ui ::-webkit-scrollbar-thumb {
      background: rgba(${r}, ${g}, ${b}, 0.5) !important;
    }
    #ui ::-webkit-scrollbar-thumb:hover {
      background: rgba(${r}, ${g}, ${b}, 0.8) !important;
    }
    #ui * {
      scrollbar-color: rgba(${r}, ${g}, ${b}, 0.5) rgba(255, 255, 255, 0.03) !important;
    }
  `;
  
  // Inject at the very start of head to ensure it applies immediately
  if (document.head) {
    document.head.insertBefore(styleTag, document.head.firstChild);
  } else {
    // Fallback if head doesn't exist yet
    document.addEventListener('DOMContentLoaded', () => {
      if (document.head) {
        document.head.insertBefore(styleTag, document.head.firstChild);
      }
    });
  }
  
  // Also apply to shadowRoot if provided
  if (shadowRoot) {
    try {
      let existing = shadowRoot.querySelector('style#surminus-shadow-theme');
      if (existing) existing.remove();
      
      const shadowStyleTag = document.createElement('style');
      shadowStyleTag.id = 'surminus-shadow-theme';
      shadowStyleTag.textContent = `
        * {
          --md-primary: ${theme.primary} !important;
          --md-primary-container: ${theme.primaryContainer} !important;
          --md-state-hover: ${theme.stateHover} !important;
          --md-state-focus: ${theme.stateFocus} !important;
          --md-state-pressed: ${theme.stateFocus} !important;
          --md-state-dragged: rgba(${r}, ${g}, ${b}, 0.16) !important;
          --md-scrollbar-thumb: rgba(${r}, ${g}, ${b}, 0.5) !important;
          --md-scrollbar-thumb-hover: rgba(${r}, ${g}, ${b}, 0.8) !important;
        }
      `;
      shadowRoot.insertBefore(shadowStyleTag, shadowRoot.firstChild);
    } catch (e) {
      console.log('Shadow DOM theme error:', e.message);
    }
  }
};

const scheduleSettingsLoad = () => {
  const parse = JSON.parse;
  setTimeout(() => {
    try {
      initStore();
      const stored = read();
      if (stored !== null && stored !== undefined) {
        const decrypted = encryptDecrypt(stored);
        const parsed = parse(decrypted);
        settings._deserialize(parsed);
      }
    } catch {
    } finally {
      markConfigLoaded();
      settingsLoaded = true;
      fetchVersion();
      renderMenu();
      renderNotification();
    }
  }, 1000);
};

const fetchVersion = async () => {
  try {
    // Display current version
    const currentVer = String(VERSION || '0.0.0').trim();
    menuVersion = currentVer;
    
    if (settingsLoaded) renderMenu();
  } catch (err) {
    console.error('[SurMinus] fetchVersion error:', err);
    menuVersion = String(VERSION || '0.0.0');
    if (settingsLoaded) renderMenu();
  }
};


function buildUI() {
  attachFont();
  const shadow = createShadowRoot();
  
  // Apply Material Design 3 theme
  applyM3Theme();
  
  // Load and apply saved theme color (overrides default) - pass shadowRoot to apply theme there too
  loadSavedTheme(shadow);
  
  const root = createMenuContainer(shadow);
  createNotificationContainer(shadow);
  registerKeyboardShortcuts(root);
  createVisibilityController(root);
  scheduleSettingsLoad();
  fetchVersion();
  
  // Initialize sounds (async, non-blocking)
  try {
    initSounds().catch(() => {});
  } catch (error) {
    console.error('[SurMinus] Failed to initialize sounds:', error);
  }
}

let uiInitialized = false;
export default function initUI() {
  if (uiInitialized) {
    return;
  }
  uiInitialized = true;

  const onReady = () => buildUI();
  if (outerDocument.readyState === 'loading') {
    Reflect.apply(ref_addEventListener, outerDocument, ['DOMContentLoaded', onReady]);
  } else {
    onReady();
  }
}
