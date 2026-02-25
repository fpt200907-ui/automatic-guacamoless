import { outerDocument, outer } from '@/core/outer.js';
import { settings, gameManager } from '@/core/state.js';

const STYLE_ID = 'surt-pingfps-overlay';

let fpsContainer = null;
let pingContainer = null;
let serverContainer = null;
let networkContainer = null;
let canvasContainer = null;

let fpsEl = null;
let pingEl = null;
let canvasEl = null;
let networkEl = null;
let serverEl = null;
let canvasCtx = null;

const STORAGE_KEY = 'surminus_pingfps_pos';

// Position data for each box
const positions = {
  fps: { x: 10, y: window.innerHeight * 0.4 },
  ping: { x: 170, y: window.innerHeight * 0.4 },
  server: { x: 330, y: window.innerHeight * 0.4 },
  network: { x: 10, y: window.innerHeight * 0.4 + 120 },
  canvas: { x: 170, y: window.innerHeight * 0.4 + 120 },
};

const loadPositions = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      Object.assign(positions, JSON.parse(saved));
    }
  } catch (e) {
    console.error('Error loading PingFPS positions:', e);
  }
};

const savePositions = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch (e) {
    console.error('Error saving PingFPS positions:', e);
  }
};

// State variables
let m = [];
let f = [];
let y = [];
let b = [];
let g = new Array(50).fill(0);
let w = 0;
let x = [];
let k = 0;
let d = null; // server region
let c = null; // webSocket
let p = null; // ping check timestamp
let u = null; // now timestamp
let h = null; // timeout handle
let T = 0; // last frame time
let E = 0; // lerp time

let v = {
  in: {
    bytes: [],
    lastTime: 0,
    pps: '0.0',
    lastSizeStr: '0B',
    kbps: '0.0',
  },
  out: {
    bytes: [],
    lastTime: 0,
    pps: '0.0',
    kbps: '0.0',
  },
};

const createUIElements = () => {
  if (!outerDocument) return;

  try {
    loadPositions();

    const panelStyle = "color:#ffffff;font-size:12px;font-family:'GothamPro', -apple-system, BlinkMacSystemFont, sans-serif;font-weight:600;background-color:#1e1e1e;border:1px solid rgba(255,255,255,0.1);padding:6px 8px;border-radius:6px;white-space:nowrap;width:fit-content;line-height:1.4;box-shadow:0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24);pointer-events: auto;cursor: move;user-select: none;";

    const createPanel = (text, posKey) => {
      const container = outerDocument.createElement('div');
      container.style.cssText = `position: fixed; left: ${positions[posKey].x}px; top: ${positions[posKey].y}px; z-index: 10000;`;
      
      const panel = outerDocument.createElement('div');
      panel.style.cssText = panelStyle;
      panel.innerHTML = text;
      
      container.appendChild(panel);
      outerDocument.body.appendChild(container);
      
      setupDragHandler(container, posKey);
      return { container, panel };
    };

    const fps = createPanel('0FPS | 0.1% 0FPS | 0ms', 'fps');
    fpsContainer = fps.container;
    fpsEl = fps.panel;

    const ping = createPanel('0ms | ↑0% | lerp 0ms', 'ping');
    pingContainer = ping.container;
    pingEl = ping.panel;

    const server = createPanel('server: 0Hz | missed 0%', 'server');
    serverContainer = server.container;
    serverEl = server.panel;

    const network = createPanel('in: 0B | 0.0kbps | 0.0pps<br>out: 0.0kbps | 0.0pps', 'network');
    networkContainer = network.container;
    networkEl = network.panel;

    const canvasWrap = outerDocument.createElement('div');
    canvasWrap.style.cssText = `position: fixed; left: ${positions.canvas.x}px; top: ${positions.canvas.y}px; z-index: 10000;`;
    
    const canvasWrapper = outerDocument.createElement('div');
    canvasWrapper.style.cssText = "color:#ffffff;font-size:12px;font-family:'GothamPro', -apple-system, BlinkMacSystemFont, sans-serif;font-weight:600;background-color:#1e1e1e;border:1px solid rgba(255,255,255,0.1);padding:6px 8px;border-radius:6px;width:fit-content;box-shadow:0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24);pointer-events: auto;cursor: move;user-select: none;";
    canvasWrap.appendChild(canvasWrapper);
    outerDocument.body.appendChild(canvasWrap);

    canvasEl = outerDocument.createElement('canvas');
    canvasEl.width = 150;
    canvasEl.height = 40;
    canvasWrapper.appendChild(canvasEl);
    canvasCtx = canvasEl.getContext('2d');
    canvasContainer = canvasWrap;

    setupDragHandler(canvasWrap, 'canvas');
    hideUI();
  } catch (e) {
    console.error('Error creating PingFPS UI elements:', e);
  }
};

const setupDragHandler = (container, posKey) => {
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };

  const handleMouseDown = (e) => {
    isDragging = true;
    dragStart.x = e.clientX - positions[posKey].x;
    dragStart.y = e.clientY - positions[posKey].y;
    container.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;

    // Clamp to viewport bounds
    const minX = -container.offsetWidth + 50;
    const maxX = (outer?.innerWidth || window.innerWidth) - 50;
    const minY = 0;
    const maxY = (outer?.innerHeight || window.innerHeight) - 50;

    newX = Math.max(minX, Math.min(maxX, newX));
    newY = Math.max(minY, Math.min(maxY, newY));

    positions[posKey].x = newX;
    positions[posKey].y = newY;

    container.style.left = newX + 'px';
    container.style.top = newY + 'px';
  };

  const handleMouseUp = () => {
    isDragging = false;
    container.style.cursor = 'move';
    savePositions();
  };

  container.addEventListener('mousedown', handleMouseDown);
  outerDocument.addEventListener('mousemove', handleMouseMove);
  outerDocument.addEventListener('mouseup', handleMouseUp);
};

const showUI = () => {
  if (fpsContainer) fpsContainer.style.display = settings.pingFps_?.showFps_ ? 'block' : 'none';
  if (pingContainer) pingContainer.style.display = settings.pingFps_?.showPing_ ? 'block' : 'none';
  if (serverContainer) serverContainer.style.display = settings.pingFps_?.showServer_ ? 'block' : 'none';
  if (networkContainer) networkContainer.style.display = settings.pingFps_?.showNetwork_ ? 'block' : 'none';
  if (canvasContainer) canvasContainer.style.display = settings.pingFps_?.showGraphPing_ ? 'block' : 'none';
};

const updateVisibility = () => {
  // Only update visibility if we're in-game
  if (!gameManager?.game) return;
  
  // Update visibility based on current settings only when in-game
  if (fpsContainer) fpsContainer.style.display = settings.pingFps_?.showFps_ ? 'block' : 'none';
  if (pingContainer) pingContainer.style.display = settings.pingFps_?.showPing_ ? 'block' : 'none';
  if (serverContainer) serverContainer.style.display = settings.pingFps_?.showServer_ ? 'block' : 'none';
  if (networkContainer) networkContainer.style.display = settings.pingFps_?.showNetwork_ ? 'block' : 'none';
  if (canvasContainer) canvasContainer.style.display = settings.pingFps_?.showGraphPing_ ? 'block' : 'none';
};

const hideUI = () => {
  if (fpsContainer) fpsContainer.style.display = 'none';
  if (pingContainer) pingContainer.style.display = 'none';
  if (serverContainer) serverContainer.style.display = 'none';
  if (networkContainer) networkContainer.style.display = 'none';
  if (canvasContainer) canvasContainer.style.display = 'none';
};

const setupDragHandlers = () => {
  // No longer needed - drag is now per-box in setupDragHandler()
};

const updatePingDisplay = (latency, lerpTime) => {
  if (!pingEl) return;
  const n = x.reduce((a, b) => a + b, 0) / (x.length || 1);
  const o = latency - n;
  const i = o >= 0 ? `↑${Math.abs((o / n) * 100).toFixed(0)}%` : `↓${Math.abs((o / n) * 100).toFixed(0)}%`;
  // M3 Colors: error=#f28482, tertiary=#ffc66d, primary=#ffb800, onSurfaceVariant=rgba(255,255,255,0.7)
  pingEl.style.color = latency >= 120 ? '#f28482' : latency >= 90 ? '#ffc66d' : latency >= 60 ? '#ffb800' : 'rgba(255,255,255,0.7)';
  pingEl.innerHTML = `${latency}ms | ${i} | lerp ${lerpTime}ms`;
};

const resetMonitor = () => {
  if (c) {
    c.close();
    c = null;
  }
  if (h) clearTimeout(h);
  if (pingEl) {
    pingEl.innerHTML = '0ms | ↑0% | lerp 0ms';
    pingEl.style.color = 'rgba(255,255,255,0.7)';
  }
  if (serverEl) serverEl.innerHTML = 'server: 0Hz | missed 0%';
  if (networkEl) networkEl.innerHTML = 'in: 0B | 0.0kbps | 0.0pps<br>out: 0.0kbps | 0.0pps';
  g.fill(0);
  if (canvasCtx) canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  v.in.bytes = [];
  v.out.bytes = [];
  y = [];
  b = [];
  T = 0;
  E = 0;
  k = 0;
};

const updateNetworkDisplay = () => {
  if (!networkEl) return;
  networkEl.innerHTML = `in: ${v.in.lastSizeStr} | ${v.in.kbps} kbps | ${v.in.pps} pps<br>out: ${v.out.kbps} kbps | ${v.out.pps} pps`;
};

const connectPingSocket = () => {
  if (c) c.close();
  g.fill(0);

  const serverMap = { na: 'usr', eu: 'eur', asia: 'asr', sa: 'sa', ru: 'russia' };
  const serverDomain = serverMap[d] || 'usr';

  try {
    c = new WebSocket(`wss://${serverDomain}.mathsiscoolfun.com:8001/ptc`);

    c.onopen = () => {
      if (h) clearTimeout(h);
      pingCheck();
    };

    c.onmessage = () => {
      u = Date.now();
      const latency = u - p;
      x.push(latency);
      if (x.length > 15) x.shift();
      g.push(Math.abs(latency - w));
      g.shift();

      if (canvasCtx && settings.pingFps_?.showGraphPing_) {
        canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        canvasCtx.beginPath();
        // M3 Secondary color (Cyan) for the latency graph
        canvasCtx.strokeStyle = '#7dd5e6';
        g.forEach((val, idx) => {
          const canvasX = (idx / 49) * canvasEl.width;
          const canvasY = canvasEl.height - (Math.min(val, 40) / 40) * canvasEl.height;
          if (idx === 0) canvasCtx.moveTo(canvasX, canvasY);
          else canvasCtx.lineTo(canvasX, canvasY);
        });
        canvasCtx.stroke();
      } else if (canvasCtx && !settings.pingFps_?.showGraphPing_) {
        canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      }

      w = latency;
      updatePingDisplay(w, E);
      setTimeout(pingCheck, 500);
    };

    c.onclose = (e) => {
      if (e.code === 1005) {
        resetMonitor();
      } else if (e.code === 1006) {
        c = null;
        h = setTimeout(connectPingSocket, 2500);
      }
    };
  } catch (e) {
    console.error('Error connecting ping socket:', e);
  }
};

const pingCheck = () => {
  if (c?.readyState === 1) {
    p = Date.now();
    c.send(new ArrayBuffer(1));
  }
};

const setupWebSocketInterception = () => {
  const OriginalWebSocket = window.WebSocket;

  window.WebSocket = function (url, protocols) {
    const ws = new OriginalWebSocket(url, protocols);

    if (!url.includes('ptc')) {
      ws.addEventListener('message', (e) => {
        const t = performance.now();
        const n = Date.now();
        if (T > 0) {
          const delta = t - T;
          E = Math.round(delta);
          updatePingDisplay(w, E);
          v.in.pps = (1000 / delta).toFixed(1);
          if (delta > (1000 / (y.length || 30)) * 1.5) {
            b.push(n);
          }
        }
        T = t;
        y.push(n);

        let size = 0;
        if (e.data instanceof ArrayBuffer) {
          size = e.data.byteLength;
        } else if (e.data instanceof Blob) {
          size = e.data.size;
        }

        v.in.lastSizeStr = size >= 1024 ? (size / 1024).toFixed(1) + ' KB' : size + ' B';
        v.in.bytes.push({ t: n, v: size });
        updateNetworkDisplay();
      });

      const originalSend = ws.send;
      ws.send = function (data) {
        const n = performance.now();
        if (v.out.lastTime > 0) {
          v.out.pps = (1000 / (n - v.out.lastTime)).toFixed(1);
        }
        v.out.lastTime = n;

        let size = 0;
        if (data?.byteLength) size = data.byteLength;
        else if (data?.size) size = data.size;

        v.out.bytes.push({ t: Date.now(), v: size });
        updateNetworkDisplay();
        return originalSend.apply(this, arguments);
      };
    }

    return ws;
  };

  window.WebSocket.prototype = OriginalWebSocket.prototype;
};

const startFPSMonitoring = () => {
  const monitorFPS = () => {
    window.requestAnimationFrame(() => {
      const now = performance.now();
      const deltaMs = m.length > 0 ? (now - m[m.length - 1]).toFixed(1) : 0;

      while (m.length > 0 && m[0] <= now - 1000) {
        m.shift();
      }

      m.push(now);
      const currentFPS = m.length;
      if (currentFPS > k) k = currentFPS;
      f.push(currentFPS);
      if (f.length > 300) f.shift();

      if (fpsEl) {
        // M3 Colors: error=#f28482 for low FPS, onSurfaceVariant for normal
        fpsEl.style.color = k > 0 && currentFPS < 0.85 * k ? '#f28482' : 'rgba(255,255,255,0.7)';
        const lowestFPS = [...f].sort((a, b) => a - b)[0] || 0;
        fpsEl.innerHTML = `${currentFPS}FPS | 0.1% ${lowestFPS}FPS | ${deltaMs}ms`;
      }

      monitorFPS();
    });
  };

  monitorFPS();
};

const startNetworkStatsUpdate = () => {
  const updateStats = () => {
    const now = Date.now();
    const calculateKbps = (dataArray) => {
      while (dataArray.length > 0 && now - dataArray[0].t > 1000) {
        dataArray.shift();
      }
      return ((8 * dataArray.reduce((sum, item) => sum + item.v, 0)) / 1000).toFixed(1);
    };

    if (c) {
      v.in.kbps = calculateKbps(v.in.bytes);
      v.out.kbps = calculateKbps(v.out.bytes);

      while (y.length > 0 && now - y[0] > 1000) {
        y.shift();
      }
      while (b.length > 0 && now - b[0] > 1000) {
        b.shift();
      }

      const serverHz = y.length;
      const missedCount = b.length;
      const missedPercent = serverHz > 0 ? ((missedCount / serverHz) * 100).toFixed(0) : 0;

      if (serverEl) {
        serverEl.innerHTML = `server: ${serverHz}Hz | missed ${missedPercent}%`;
        // M3 Colors: error=#f28482 for bad connection, onSurfaceVariant for normal
        serverEl.style.color = serverHz < 20 || missedPercent > 5 ? '#f28482' : 'rgba(255,255,255,0.7)';
      }

      updateNetworkDisplay();
      updateVisibility();
    }
  };

  setInterval(updateStats, 500);
};

const setupMenuListeners = () => {
  if (!outerDocument) return;

  try {
    const buttons = outerDocument.getElementsByClassName('btn-green btn-darken menu-option');
    const handleServerSelect = () => {
      d = outerDocument.getElementById('server-select-main')?.value;
      if (d) connectPingSocket();
    };

    if (buttons.length >= 4) {
      for (let i = 0; i < 3; i++) {
        buttons[i].onclick = handleServerSelect;
      }
      buttons[3].onclick = () => {
        d = outerDocument.getElementById('team-server-select')?.value;
        if (d) connectPingSocket();
      };
    }

    ['btn-game-quit', 'btn-spectate-quit'].forEach((id) => {
      const btn = outerDocument.getElementById(id);
      if (btn) {
        btn.onclick = () => {
          resetMonitor();
          cleanup();
        };
      }
    });

    const statsOptions = outerDocument.getElementById('ui-stats-options');
    if (statsOptions) {
      const observer = new MutationObserver((mutations) => {
        if (mutations[0].addedNodes.length > 0) {
          const link = statsOptions.getElementsByTagName('a')[0];
          if (link) link.onclick = () => {
            resetMonitor();
            cleanup();
          };
        }
      });
      observer.observe(statsOptions, { childList: true });
    }
  } catch (e) {
    console.error('Error setting up menu listeners:', e);
  }
};

const init = () => {
  try {
    createUIElements();
    setupWebSocketInterception();
    startFPSMonitoring();
    startNetworkStatsUpdate();
    setupMenuListeners();

    // Always show UI when feature is enabled
    if (settings.pingFps_?.enabled_) {
      showUI();
    }
  } catch (e) {
    console.error('Error initializing PingFPS:', e);
  }
};

const cleanup = () => {
  try {
    resetMonitor();
    // Remove all individual containers
    if (fpsContainer?.parentNode) fpsContainer.remove();
    if (pingContainer?.parentNode) pingContainer.remove();
    if (serverContainer?.parentNode) serverContainer.remove();
    if (networkContainer?.parentNode) networkContainer.remove();
    if (canvasContainer?.parentNode) canvasContainer.remove();
    
    fpsContainer = null;
    pingContainer = null;
    serverContainer = null;
    networkContainer = null;
    canvasContainer = null;
    fpsEl = null;
    pingEl = null;
    serverEl = null;
    networkEl = null;
    canvasEl = null;
    canvasCtx = null;
    
    m = [];
    f = [];
    y = [];
    b = [];
    g.fill(0);
    x = [];
  } catch (e) {
    console.error('Error cleaning up PingFPS:', e);
  }
};

export const togglePingFPS = (enabled) => {
  // If in-game, apply changes immediately
  if (gameManager?.game) {
    if (enabled && !fpsContainer) {
      init();
    } else if (!enabled && fpsContainer) {
      cleanup();
    }
  }
  // If not in-game, just store the state - will be applied on game join
};

export const onGameStart = () => {
  // Called when player joins a game
  if (settings.pingFps_?.enabled_) {
    if (!fpsContainer) {
      init();
    }
  } else {
    if (fpsContainer) {
      cleanup();
    }
  }
};

export const onGameEnd = () => {
  // Called when player leaves a game
  if (fpsContainer) {
    cleanup();
  }
};

export default function () {
  // Don't initialize immediately - wait for game to start
  // The UI will be created when onGameStart() is called
}
