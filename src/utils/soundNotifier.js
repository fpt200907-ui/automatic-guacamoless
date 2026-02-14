// Sound URLs
const ENABLE_SOUND_URL = 'https://raw.githubusercontent.com/surminusclient1/bac/main/enable.wav';
const DISABLE_SOUND_URL = 'https://raw.githubusercontent.com/surminusclient1/bac/main/disable.wav';

// Audio cache
const audioCache = {
  enable: null,
  disable: null,
};

// Preload sounds
const preloadSound = async (type) => {
  if (audioCache[type]) return;

  try {
    const url = type === 'enable' ? ENABLE_SOUND_URL : DISABLE_SOUND_URL;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioCache[type] = { audioBuffer, audioContext };
  } catch (error) {
    console.error(`[SurMinus] Failed to preload ${type} sound:`, error);
  }
};

// Play sound
export const playSound = async (type = 'enable') => {
  try {
    // Preload if not cached
    if (!audioCache[type]) {
      await preloadSound(type);
    }

    const { audioBuffer, audioContext } = audioCache[type];
    if (!audioBuffer || !audioContext) return;

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  } catch (error) {
    console.error(`[SurMinus] Failed to play ${type} sound:`, error);
  }
};

// Preload both sounds on init
export const initSounds = async () => {
  try {
    await Promise.all([preloadSound('enable'), preloadSound('disable')]);
  } catch (error) {
    console.error('[SurMinus] Failed to init sounds:', error);
  }
};
