import { outer, outerDocument } from '@/core/outer.js';
import { settings } from '@/core/state.js';

export default function BackgroundChange() {
  let initialized = false;
  let originalBackground = '';

  const saveBackgroundToLocalStorage = (value) => {
    if (typeof value === 'string') {
      localStorage.setItem('lastBackgroundType', 'url');
      localStorage.setItem('lastBackgroundValue', value);
      console.log('Background saved to localStorage');
    }
  };

  const loadBackgroundFromLocalStorage = () => {
    const backgroundType = localStorage.getItem('lastBackgroundType');
    const backgroundValue = localStorage.getItem('lastBackgroundValue');
    const backgroundElement = outerDocument.getElementById('background');
    if (backgroundElement && backgroundType && backgroundValue) {
      backgroundElement.style.backgroundImage = `url("${backgroundValue}")`;
      backgroundElement.style.backgroundSize = 'cover';
      backgroundElement.style.backgroundPosition = 'center';
      backgroundElement.style.backgroundRepeat = 'no-repeat';
    }
  };

  const setBackgroundFromUrl = (url) => {
    const backgroundElement = outerDocument.getElementById('background');
    if (!backgroundElement) {
      console.warn('Background element not found');
      return false;
    }
    if (!url || typeof url !== 'string' || url.trim() === '') {
      console.warn('Invalid URL provided');
      return false;
    }
    const trimmedUrl = url.trim();
    backgroundElement.style.backgroundImage = `url("${trimmedUrl}")`;
    backgroundElement.style.backgroundSize = 'cover';
    backgroundElement.style.backgroundPosition = 'center';
    backgroundElement.style.backgroundRepeat = 'no-repeat';
    saveBackgroundToLocalStorage(trimmedUrl);
    return true;
  };

  const setBackgroundFromFile = (file) => {
    const backgroundElement = outerDocument.getElementById('background');
    if (!backgroundElement) {
      console.warn('Background element not found');
      return false;
    }

    if (!file || !(file instanceof Blob)) {
      console.warn('Invalid file provided');
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        backgroundElement.style.backgroundImage = `url("${reader.result}")`;
        backgroundElement.style.backgroundSize = 'cover';
        backgroundElement.style.backgroundPosition = 'center';
        backgroundElement.style.backgroundRepeat = 'no-repeat';
        // Save the DataURL string directly
        saveBackgroundToLocalStorage(reader.result);
      }
    };
    reader.onerror = () => {
      console.error('Error reading file');
    };
    reader.readAsDataURL(file);
    return true;
  };

  const resetBackground = () => {
    const backgroundElement = outerDocument.getElementById('background');
    if (backgroundElement) {
      // Reset to the official survev.io splash image
      const defaultImage = 'https://survev.io/img/main_splash_0_6_10.png';
      backgroundElement.style.backgroundImage = `url("${defaultImage}")`;
      backgroundElement.style.backgroundSize = 'cover';
      backgroundElement.style.backgroundPosition = 'center';
      backgroundElement.style.backgroundRepeat = 'no-repeat';
      localStorage.removeItem('lastBackgroundType');
      localStorage.removeItem('lastBackgroundValue');
      return true;
    }
    return false;
  };

  const init = () => {
    if (!settings.backgroundChange_ || !settings.backgroundChange_.enabled_) return;
    if (initialized) return;

    try {
      const backgroundElement = outerDocument.getElementById('background');
      if (backgroundElement) {
        // Store the original computed background image (not inline style)
        const computedStyle = outer.getComputedStyle(backgroundElement);
        originalBackground = computedStyle.backgroundImage;
      }
      loadBackgroundFromLocalStorage();
      initialized = true;
    } catch (e) {
      console.error('BackgroundChange init error:', e);
    }
  };

  const cleanup = () => {
    // No cleanup needed for background change
    initialized = false;
  };

  // Public API
  return {
    init,
    cleanup,
    setBackgroundFromUrl,
    setBackgroundFromFile,
    resetBackground,
  };
}
