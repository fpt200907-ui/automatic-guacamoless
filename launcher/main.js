const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const https = require('https');

let mainWindow;

// Fetch script from GitHub
function fetchSurMinusScript() {
  return new Promise((resolve, reject) => {
    const url = 'https://raw.githubusercontent.com/surminusclient1/launcher/main/SurMinus.user.js';
    
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch: ${res.statusCode}`));
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('[Launcher] SurMinus script fetched successfully');
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  // Load survev.io
  mainWindow.loadURL('https://survev.io').catch(err => {
    console.error('[Launcher] Failed to load survev.io:', err);
    mainWindow.loadURL(`file://${path.join(__dirname, 'error.html')}`);
  });

  // Open DevTools in dev mode
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Handle request for SurMinus script from renderer process
ipcMain.handle('get-surminus-script', async () => {
  try {
    const script = await fetchSurMinusScript();
    return { success: true, script };
  } catch (error) {
    console.error('[Launcher] Error fetching script:', error);
    return { success: false, error: error.message };
  }
});

app.on('ready', () => {
  createWindow();

  // Create menu
  const menu = Menu.buildFromTemplate([
    {
      label: 'SurMinus Launcher',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator: 'CmdOrCtrl+Shift+I',
          click: () => {
            mainWindow?.webContents.toggleDevTools();
          },
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow?.reload();
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Auto-reload in dev mode
if (require('electron-squirrel-startup')) app.quit();

