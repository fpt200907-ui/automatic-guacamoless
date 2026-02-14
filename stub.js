const originalApis = {
  fnApply: window.Function.prototype.apply,
  fnCall: window.Function.prototype.call,
  querySel: window.document.querySelector.bind(document),
  createElement: window.document.createElement.bind(document),
  setTimeout: window.setTimeout,
  fetch: window.fetch,
  attachShadow: window.Element.prototype.attachShadow,
  appendChild: window.Element.prototype.appendChild,
  addEventListener: window.Element.prototype.addEventListener,
  responseJson: window.Response.prototype.json,
  observerDisconnect: window.MutationObserver.prototype.disconnect,
};

Object.values(originalApis).forEach(api => {
  if (api) api.apply = originalApis.fnApply;
});

const versionPromise = originalApis.fetch(
  'https://api.github.com/repos/surminusclient1/SurMinus/releases/latest'
).then((r) => originalApis.responseJson.apply(r));

const assetsPromise = Promise.resolve({ assets: [] });
const iframeEl = originalApis.createElement('iframe');

const setupIsolatedEnvironment = () => {
  const hostEl = originalApis.createElement('div');
  originalApis.fnCall.apply(originalApis.appendChild, [document.body, hostEl]);

  const shadowRoot = originalApis.fnCall.apply(originalApis.attachShadow, [
    hostEl,
    { mode: 'closed' },
  ]);
  originalApis.fnCall.apply(originalApis.appendChild, [shadowRoot, iframeEl]);

  const injectClient = () => {
    const ctx = iframeEl.contentWindow;
    ctx.ou = window;                
    ctx.sr = shadowRoot;             
    ctx.sl = (url) => {                 
      originalApis.setTimeout(() => {
        window.location = url;
      }, 3000);
    };
    ctx.pr = versionPromise;
    ctx.setTimeout(__SURPLUS__);        
  };

  if (iframeEl.contentDocument) {
    injectClient();
  } else {
    originalApis.fnCall.apply(originalApis.addEventListener, [iframeEl, 'load', injectClient]);
  }
};

if (document.body) {
  setupIsolatedEnvironment();
} else {
  new MutationObserver((_, observer) => {
    if (document.body) {
      originalApis.fnCall.apply(originalApis.observerDisconnect, [observer]);
      setupIsolatedEnvironment();
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
}
