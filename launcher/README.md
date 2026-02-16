# SurMinus Electron Launcher

Electron launcher application that automatically loads and injects the SurMinus script into survev.io

## Features

- ✅ Opens survev.io in an Electron window
- ✅ Automatically fetches SurMinus script from GitHub (raw.githubusercontent.com)
- ✅ Injects script at document_start (like Tampermonkey)
- ✅ Custom menu with DevTools and reload
- ✅ Error handling with fallback error page
- ✅ Cross-platform (Windows, macOS, Linux)
- ✅ Context isolation for security

## Project Structure

```
launcher/
├── main.js          # Main Electron process
├── preload.js       # Preload script for injection
├── package.json     # Dependencies and scripts
├── error.html       # Error page fallback
├── README.md        # This file
└── .gitignore       # Git ignore rules
```

## Installation

### Prerequisites
- Node.js 14+ (or 16+)
- npm or yarn

### Steps

```bash
# Navigate to launcher folder
cd launcher

# Install dependencies
npm install

# The installation will download Electron (~150MB)
# This may take a few minutes on first install
```

## Usage

### Run Launcher (Production)
```bash
npm start
```

### Run with Developer Tools
```bash
npm run dev
```

## How It Works

1. **Startup Process**
   - Electron main process starts
   - Creates BrowserWindow
   - Loads survev.io URL
   - Preload script is initialized

2. **Script Injection Flow**
   - Preload script waits for DOM ready
   - Sends IPC message to main process requesting SurMinus script
   - Main process fetches script from GitHub
   - Preload injects script into document head
   - Script executes in page context (like Tampermonkey)

3. **Execution**
   - SurMinus userscript runs with full page access
   - Can interact with window, DOM, etc.
   - Features execute normally

## Configuration

### Change Target URL
Edit `main.js`, line with `mainWindow.loadURL()`:
```javascript
mainWindow.loadURL('https://survev.io');  // Change this URL
```

### Change Script Source
Edit `main.js`, line with GitHub URL:
```javascript
const url = 'https://raw.githubusercontent.com/surminusclient1/launcher/main/SurMinus.user.js';
```

### Adjust Window Size
Edit `main.js`, in `createWindow()`:
```javascript
mainWindow = new BrowserWindow({
  width: 1400,   // Change width
  height: 900,   // Change height
  webPreferences: {
    // ...
  },
});
```

## Keyboard Shortcuts

- **Ctrl+Q** / **Cmd+Q** - Exit launcher
- **Ctrl+Shift+I** / **Cmd+Shift+I** - Toggle Developer Tools
- **Ctrl+R** / **Cmd+R** - Reload page
- **F5** - Reload (Windows)

## Troubleshooting

### "Script is empty" or not loading
**Issue**: SurMinus script isn't being fetched
**Solutions**:
- Check internet connection
- Verify GitHub URL is accessible
- Try manually visiting: https://raw.githubusercontent.com/surminusclient1/launcher/main/SurMinus.user.js
- Check DevTools console (Ctrl+Shift+I) for error messages

### "Cannot find module Electron"
**Issue**: Dependencies not installed
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Window won't open
**Issue**: Electron installation failed
**Solution**:
```bash
npm install --save-dev electron --force
```

### survev.io won't load
**Issue**: Network or DNS issue
**Solutions**:
- Check internet connection
- Check if survev.io is online
- Try running in dev mode to see console: `npm run dev`
- Check firewall/proxy settings

### Script errors in console
**Issue**: SurMinus script has runtime errors
**Solutions**:
- Open DevTools (Ctrl+Shift+I)
- Check console for error messages
- Verify SurMinus.user.js is valid JavaScript
- Try fetching script manually from GitHub

## Developer Mode

Run with developer tools for debugging:

```bash
npm run dev
```

This will:
- Open DevTools automatically
- Show console, network, elements tabs
- Allow you to inspect the page
- Monitor script injection

## Building a Standalone App (Optional)

For distribution, you can package it using electron-builder:

```bash
npm install --save-dev electron-builder

# Add to package.json:
"build": {
  "appId": "com.surminus.launcher",
  "productName": "SurMinus Launcher",
  "files": [
    "main.js",
    "preload.js",
    "error.html",
    "node_modules/**/*"
  ],
  "win": {
    "target": ["nsis", "portable"]
  },
  "mac": {
    "target": ["dmg", "zip"]
  }
}

npx electron-builder
```

## File Descriptions

| File | Purpose |
|------|---------|
| `main.js` | Main Electron process, handles window creation and IPC |
| `preload.js` | Preload script (secure context), injects SurMinus script |
| `package.json` | Node.js dependencies and npm scripts |
| `error.html` | Fallback page when page fails to load |
| `.gitignore` | Git ignore rules (node_modules, etc.) |

## Security Notes

- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Remote module disabled
- ✅ Scripts run in script context (not Node.js)
- ✅ IPC communication for script retrieval

## Requirements

- **Electron**: ^29.0.0
- **Node.js**: 14.0.0+
- **Internet**: For fetching script from GitHub

## License

MIT

## Support

For issues with:
- **Launcher app**: Check this README
- **SurMinus script**: Visit https://github.com/surminusclient1/launcher
- **survev.io**: Check survev.io status

