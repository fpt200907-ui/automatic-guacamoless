import { initialize } from '@/core/loader.js';
import { hook } from '@/core/hook.js';
import { initStore, read } from '@/utils/store.js';
import { encryptDecrypt } from '@/utils/crypto.js';
import { loadSettings, markConfigLoaded } from '@/core/state.js';
import { outer, outerDocument, setLocation } from '@/core/outer.js';

if (!DEV) {
  try {
    const consoleProxy = new Proxy({}, {
      get: () => function () {},
      set: () => true,
      has: () => true,
      apply: () => function () {},
      construct: () => ({}),
    });
    Object.defineProperty(window, 'console', {
      value: consoleProxy,
      configurable: false,
      writable: false,
    });
  } catch (_) {}

  try { window.onerror = function () {}; } catch (_) {}
  try { window.onunhandledrejection = function () {}; } catch (_) {}
  try { window.onrejectionhandled = function () {}; } catch (_) {}
  try { window.onabort = function () {}; } catch (_) {}
  try { window.onunload = function () {}; } catch (_) {}
  try { window.onbeforeunload = function () {}; } catch (_) {}

  try {
    window.addEventListener('error', function () {}, true);
    window.addEventListener('unhandledrejection', function () {}, true);
    window.addEventListener('rejectionhandled', function () {}, true);
    window.addEventListener('abort', function () {}, true);
  } catch (_) {}

  try {
    Object.defineProperty(window, 'Error', {
      value: undefined,
      configurable: false,
      writable: false,
    });
  } catch (_) {}

  try { window.alert = function () {}; } catch (_) {}
  try { window.confirm = function () {}; } catch (_) {}
  try { window.prompt = function () {}; } catch (_) {}

  try { Object.freeze(window.console); } catch (_) {}
  try { Object.freeze(window); } catch (_) {}
}

(async () => {
  if (DEV) {
    console.warn('CHEAT IS OVER HERE');
  }

  // Check version before initializing
  const time = Date.now();
  try {
    const data = await (window.pr || Promise.reject());
    // Extract version safely from response - support both tag_name and version fields
    const availableVersion = data?.tag_name || data?.version || null;

    // Force update if outdated and past deadline
    // Only redirect if we have a valid available version that differs from current
    if (availableVersion && VERSION !== availableVersion && time > EPOCH) {
      setLocation('https://surminusclient1.github.io/');
      try {
        outerDocument.head.innerHTML = '';
        outerDocument.body.innerHTML =
          '<h1>This version of SurMinus is outdated and may not function properly.<br>For safety & security please update to the new one!<br>Redirecting in 3 seconds...</h1>';
      } catch (_) {}
      // Hang forever - prevent any further execution
      await new Promise(() => {});
      ''();
    }
  } catch (_) {
    // Version check error - continue normally (network error, etc)
  }
  
  // Initialize store and load saved settings
  initStore();
  try {
    const encrypted = read();
    if (encrypted) {
      const decrypted = encryptDecrypt(encrypted);
      const data = JSON.parse(decrypted);
      loadSettings(data);
    }
  } catch (e) {
    // Failed to load settings, use defaults
  }
  markConfigLoaded();
  
  initialize();
})();
