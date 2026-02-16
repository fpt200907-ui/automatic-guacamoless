const { ipcRenderer } = require('electron');

console.log('[SurMinus Launcher] Preload script loaded for survev.io');

// Wait for DOM to be ready and inject script
function waitForDOMAndInject() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSurMinusScript);
  } else {
    injectSurMinusScript();
  }
}

// Main injection function
async function injectSurMinusScript() {
  try {
    console.log('[Preload] Requesting SurMinus script from main process...');
    
    const result = await ipcRenderer.invoke('get-surminus-script');
    
    if (!result.success) {
      console.error('[Preload] Failed to get script:', result.error);
      return;
    }
    
    const surmaplusScript = result.script;
    
    if (!surmaplusScript || surmaplusScript.length === 0) {
      console.warn('[Preload] SurMinus script is empty');
      return;
    }

    // Create a script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = surmaplusScript;
    script.async = false;

    // Inject into page at document_start equivalent (head before other scripts)
    const target = document.head || document.documentElement;
    if (target.firstChild) {
      target.insertBefore(script, target.firstChild);
    } else {
      target.appendChild(script);
    }

    console.log('[Preload] SurMinus script injected successfully into survev.io');
  } catch (error) {
    console.error('[Preload] Error injecting script:', error);
  }
}

// Start injection process
waitForDOMAndInject();

