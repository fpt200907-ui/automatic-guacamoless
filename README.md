# SurMinus - Advanced Game Client

**SurMinus** (v4.1) is an advanced browser extension client for Surviv.io, providing powerful features to enhance your gameplay experience.

## ✨ Features

### Combat Features
- **Aimbot** - Automatic targeting with customizable options (sticky target, wallcheck, show dot)
- **Auto Fire** - Automatic weapon firing when aiming
- **Auto Heal** - Automatically use bandages and med kits based on health thresholds
- **Auto Switch** - Intelligent weapon switching
- **Melee Lock** - Enhanced melee attack precision
- **Auto Crate Break** - Automatically break supply crates with detection radius

### Visual Features
- **ESP (Player Detection)** - Display player positions and information
- **X-Ray** - See through walls (reduces smoke and tree opacity)
- **Infinite Zoom** - Zoom without limits
- **Grenade Timer** - Visual countdown for grenade cooking
- **Map Highlights** - Highlight important map locations
- **Layer Spoofer** - Manipulate render layer for visibility
- **Blur Background** - Blur background for better focus
- **Pan Hero** - Advanced camera control

### Utility Features
- **Auto Loot** - Automatically pick up items
- **Mobile Movement** - Smooth mobile-style movement
- **Keybind System** - Fully customizable hotkeys for all features

## 📖 How to Install

### Method 1: Tampermonkey Userscript (Recommended)

#### Prerequisites
- Tampermonkey extension (Chrome, Firefox, Safari, Edge)
- Latest version of your browser

#### Installation Steps

1. **Install Tampermonkey**
   - Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobblbi)
   - Firefox: [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - Safari/Edge: Available on respective stores

2. **Add the Script**
   - Download or copy `Surplus.user.js`
   - Open Tampermonkey Dashboard
   - Click "Create new script"
   - Paste the script contents
   - Save (Ctrl+S or Cmd+S)

3. **Enable & Launch**
   - Go to surviv.io
   - Press `Shift+Right` to open the menu
   - Configure features as needed

### Method 2: Chrome Extension

#### Installation Steps

1. **Prepare Extension Files**
   - Get the latest extension build from `dist/`
   - Keep the folder ready on your computer

2. **Load Extension**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Drag and drop the `dist/` folder into the page
   - The extension will load automatically

3. **Configure & Use**
   - Go to surviv.io
   - Click the SurMinus icon in the toolbar
   - Press `Shift+Right` to open the in-game menu
   - Configure features as needed

4. **Updates**
   - Simply drag the updated `dist/` folder again
   - Chrome will refresh the extension automatically

### Quick Start
- **Toggle Menu:** `Shift + Right`
- **Toggle Aimbot:** `B`
- **Toggle Zoom:** `Shift + Left`
- **Toggle Layer Spoof:** `T`
- **Toggle Sticky Target:** `N`

All keybinds are customizable in the in-game menu.

## ⚙️ Configuration

### Default Keybinds
| Key | Action |
|-----|--------|
| `Shift + Right` | Toggle Menu |
| `B` | Toggle Aimbot |
| `Shift + Left` | Toggle Infinite Zoom |
| `T` | Toggle Layer Spoof |
| `N` | Toggle Sticky Target |

### In-Game Menu Tabs
- **Combat Tab** - Aimbot, Auto Fire, Auto Heal, Auto Switch, Melee Lock
- **Visuals Tab** - ESP, X-Ray, Infinite Zoom, Layer Spoof, Map Highlights
- **Misc Tab** - Auto Loot, Mobile Movement, Blur Background, Pan Hero
- **Help Tab** - Feature descriptions and tips

### Settings Persistence
- All settings are automatically saved to browser storage
- Settings persist across browser sessions
- You can customize each feature individually

## 🐛 Troubleshooting

### Menu not appearing
- Verify Tampermonkey is enabled for surviv.io
- Try pressing `Shift+Right` multiple times
- Refresh the page and try again
- Check if your browser blocks pop-ups/overlays

### Aimbot not working
- Ensure Aimbot is toggled ON (green indicator)
- Check if wallcheck is enabled when behind walls
- Verify you're looking at a valid target
- Try disabling and re-enabling the feature

### Features not saving
- Clear browser cache and reload
- Verify localStorage is enabled
- Try disabling other extensions
- Reinstall the script

### Performance issues
- Disable X-Ray if experiencing lag
- Reduce ESP render distance in settings
- Disable Grenade Timer if stuttering
- Close other tabs/applications

### Script not loading
- Verify you're on surviv.io
- Check Tampermonkey is running (icon should be colored)
- Try updating Tampermonkey to latest version
- Reinstall the script

## 📄 License

Proprietary - Unauthorized distribution and modification prohibited

---

**Version:** 4.2
**Last Updated:** February 2026
