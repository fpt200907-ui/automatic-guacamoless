import React, { useRef, useState, useEffect } from 'react';
import { Download, Upload, Cloud, HardDrive, Settings, Sliders, Save, Trash2, Copy, Check } from 'lucide-preact';

const Config = ({ settings, onSettingChange }) => {
  const fileInputRef = useRef(null);
  const [activePresetTab, setActivePresetTab] = useState('cloud');
  const [localPresets, setLocalPresets] = useState([]);
  const [presetName, setPresetName] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('surminus-theme') || 'yellow');

  // Theme color mapping - matches Themes.jsx
  const themeColorMap = {
    yellow: '#ffb800',
    mint: '#6fd89f',
    peach: '#f5c69b',
    lavender: '#c8b5e6',
    pistachio: '#b5d89f',
    rose: '#f5bcd4',
    blush: '#f5d4e0',
    skyblue: '#b5d9f0',
    green: '#6edb72',
    cyan: '#00d9ff',
    pink: '#ff006e',
    purple: '#b537f2',
    red: '#ff3333'
  };

  // Load local presets from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('surminus-local-presets');
    if (stored) {
      try {
        setLocalPresets(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse local presets:', e);
      }
    }
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'surminus-theme') {
        setCurrentTheme(e.newValue || 'yellow');
      }
    };

    // Listen to storage events (for other tabs)
    window.addEventListener('storage', handleStorageChange);

    // Poll for theme changes (for same tab)
    const pollTheme = setInterval(() => {
      const newTheme = localStorage.getItem('surminus-theme');
      if (newTheme && newTheme !== currentTheme) {
        setCurrentTheme(newTheme);
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollTheme);
    };
  }, [currentTheme]);

  // Save local presets to localStorage
  const savePresetsToStorage = (presets) => {
    try {
      localStorage.setItem('surminus-local-presets', JSON.stringify(presets));
      setLocalPresets(presets);
    } catch (e) {
      console.error('Failed to save presets:', e);
    }
  };

  // Save current settings as a new local preset
  const saveCurrentAsPreset = () => {
    if (!presetName.trim()) {
      alert('❌ Please enter a preset name');
      return;
    }

    const newPreset = {
      id: Date.now(),
      name: presetName,
      settings: JSON.parse(JSON.stringify(settings)),
      createdAt: new Date().toISOString(),
    };

    const updated = [...localPresets, newPreset];
    savePresetsToStorage(updated);
    setPresetName('');
    alert('✅ Preset saved!');
  };

  // Load and apply a local preset
  const applyLocalPreset = (preset) => {
    onSettingChange(() => {
      Object.assign(settings, preset.settings);
    });
    alert(`✅ Preset "${preset.name}" applied!`);
  };

  // Delete a local preset
  const deleteLocalPreset = (id) => {
    if (!window.confirm('Are you sure you want to delete this preset?')) {
      return;
    }

    setLocalPresets(prevPresets => {
      const updated = prevPresets.filter(p => p.id !== id);
      savePresetsToStorage(updated);
      alert('✅ Preset deleted!');
      return updated;
    });
  };

  // Export a cloud preset
  const exportCloudPreset = (presetName, presetSettings) => {
    const preset = {
      name: presetName,
      settings: presetSettings,
      type: 'cloud',
      exportedAt: new Date().toISOString()
    };
    const json = JSON.stringify(preset, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `surminus-preset-${presetName}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export a local preset
  const exportLocalPreset = (preset) => {
    const json = JSON.stringify(preset, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `surminus-preset-${preset.name}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy preset name to clipboard
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleExportSettings = () => {
    const settingsJson = JSON.stringify(settings, null, 2);
    const blob = new Blob([settingsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `surminus-settings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result);
        // Apply imported settings
        onSettingChange(() => {
          Object.assign(settings, importedSettings);
        });
        alert('✅ Settings imported successfully!');
      } catch (error) {
        alert('❌ Failed to import settings: Invalid JSON file');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const applyLegitPreset = () => {
    onSettingChange((s) => {
      // Disable: aimbot, melee lock, panhero, esp
      s.aimbot_.enabled_ = false;
      s.meleeLock_.enabled_ = false;
      s.panHero_.enabled_ = false;
      s.esp_.enabled_ = false;
      s.blurBackground_.enabled_ = true; // Enable subtle blur for privacy without being too obvious
    });
    alert('✅ Legit preset applied!');
  };

  const applyNoCheatPreset = () => {
    onSettingChange((s) => {
      // Disable ALL features
      s.aimbot_.enabled_ = false;
      s.meleeLock_.enabled_ = false;
      s.mobileMovement_.enabled_ = false;
      s.autoFire_.enabled_ = false;
      s.autoHeal_.enabled_ = false;
      s.blurBackground_.enabled_ = false;
      s.backgroundChange_.enabled_ = false;
      s.xray_.enabled_ = false;
      s.esp_.enabled_ = false;
      s.autoLoot_.enabled_ = false;
      s.mapHighlights_.enabled_ = false;
      s.infiniteZoom_.enabled_ = false;
      s.autoSwitch_.enabled_ = false;
      s.autoCrateBreak_.enabled_ = false;
      s.panHero_.enabled_ = false;
      s.layerSpoof_.enabled_ = false;
    });
    alert('✅ No Cheat preset applied!');
  };

  const applyBlatantPreset = () => {
    onSettingChange((s) => {
      // Enable all features except panhero
      s.aimbot_.enabled_ = true;
      s.aimbot_.mode_ = 'modern';
      s.meleeLock_.enabled_ = true;
      s.mobileMovement_.enabled_ = false;
      s.autoFire_.enabled_ = true;
      s.autoHeal_.enabled_ = true;
      s.blurBackground_.enabled_ = true;
      s.backgroundChange_.enabled_ = true;
      s.xray_.enabled_ = true;
      s.esp_.enabled_ = true;
      s.autoLoot_.enabled_ = true;
      s.mapHighlights_.enabled_ = true;
      s.infiniteZoom_.enabled_ = true;
      s.autoSwitch_.enabled_ = true;
      s.autoCrateBreak_.enabled_ = true;
      s.panHero_.enabled_ = false; // Explicitly disable
      s.layerSpoof_.enabled_ = true;
    });
    alert('✅ Blatant preset applied!');
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Get current theme color
  const getThemeColor = () => themeColorMap[currentTheme] || '#ffb800';

  // Helper to darken/lighten colors
  const adjustColor = (hex, percent) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  };

  const themeColor = getThemeColor();

  return (
    <div className="section">
      <div className="config-container">
        {/* Presets Section */}
        <div className="config-section-title">
          <Sliders size={20} />
          Presets
        </div>

        {/* Preset Tabs */}
        <div className="preset-tabs">
          <button
            className={`preset-tab ${activePresetTab === 'cloud' ? 'preset-tab-active' : ''}`}
            onClick={() => setActivePresetTab('cloud')}
          >
            <Cloud size={18} />
            Cloud Presets
          </button>
          <button
            className={`preset-tab ${activePresetTab === 'local' ? 'preset-tab-active' : ''}`}
            onClick={() => setActivePresetTab('local')}
          >
            <HardDrive size={18} />
            Local Presets
            {localPresets.length > 0 && (
              <span style={{
                fontSize: 'var(--md-font-body-small)',
                color: 'var(--md-primary)',
                marginLeft: '0.25rem'
              }}>({localPresets.length})</span>
            )}
          </button>
        </div>

        {/* Cloud Presets Tab */}
        {activePresetTab === 'cloud' && (
          <div className="preset-content">
            <div className="preset-local-grid">
              {/* Legit Preset Card */}
              <div className="preset-card" style={{
                borderColor: themeColor,
                '--preset-card-color': themeColor
              }}>
                <div className="preset-card-header">
                  <div className="preset-card-title" style={{ color: themeColor }}>Legit</div>
                </div>
                <div className="preset-card-time">
                  Undetectable settings
                </div>
                <div style={{
                  display: 'flex',
                  gap: 'var(--md-spacing-2)',
                  marginTop: 'auto',
                }}>
                  <button
                    onClick={applyLegitPreset}
                    style={{
                      flex: 1,
                      padding: 'var(--md-spacing-3)',
                      border: `1px solid ${themeColor}`,
                      borderRadius: 'var(--md-shape-corner-small)',
                      background: `rgba(255, 184, 0, 0.1)`,
                      color: themeColor,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all var(--md-motion-duration-short2) var(--md-motion-easing-standard)',
                    }}
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => exportCloudPreset('Legit', {
                      aimbot_: { enabled_: false },
                      meleeLock_: { enabled_: false },
                      panHero_: { enabled_: false },
                      esp_: { enabled_: false },
                      blurBackground_: { enabled_: true }
                    })}
                    style={{
                      padding: 'var(--md-spacing-3)',
                      border: '1px solid var(--md-outline)',
                      borderRadius: 'var(--md-shape-corner-small)',
                      background: 'var(--md-surface-container)',
                      color: 'var(--md-on-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all var(--md-motion-duration-short2) var(--md-motion-easing-standard)',
                    }}
                    title="Export preset"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>

              {/* No Cheat Preset Card */}
              <div className="preset-card" style={{
                borderColor: themeColor,
                '--preset-card-color': themeColor
              }}>
                <div className="preset-card-header">
                  <div className="preset-card-title" style={{ color: themeColor }}>No Cheat</div>
                </div>
                <div className="preset-card-time">
                  Vanilla gameplay
                </div>
                <div style={{
                  display: 'flex',
                  gap: 'var(--md-spacing-2)',
                  marginTop: 'auto',
                }}>
                  <button
                    onClick={applyNoCheatPreset}
                    style={{
                      flex: 1,
                      padding: 'var(--md-spacing-3)',
                      border: `1px solid ${themeColor}`,
                      borderRadius: 'var(--md-shape-corner-small)',
                      background: `rgba(255, 184, 0, 0.1)`,
                      color: themeColor,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all var(--md-motion-duration-short2) var(--md-motion-easing-standard)',
                    }}
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => exportCloudPreset('No Cheat', {
                      aimbot_: { enabled_: false },
                      meleeLock_: { enabled_: false },
                      mobileMovement_: { enabled_: false },
                      autoFire_: { enabled_: false },
                      autoHeal_: { enabled_: false },
                      blurBackground_: { enabled_: false },
                      backgroundChange_: { enabled_: false },
                      xray_: { enabled_: false },
                      esp_: { enabled_: false },
                      autoLoot_: { enabled_: false },
                      mapHighlights_: { enabled_: false },
                      infiniteZoom_: { enabled_: false },
                      autoSwitch_: { enabled_: false },
                      autoCrateBreak_: { enabled_: false },
                      panHero_: { enabled_: false },
                      layerSpoof_: { enabled_: false }
                    })}
                    style={{
                      padding: 'var(--md-spacing-3)',
                      border: '1px solid var(--md-outline)',
                      borderRadius: 'var(--md-shape-corner-small)',
                      background: 'var(--md-surface-container)',
                      color: 'var(--md-on-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all var(--md-motion-duration-short2) var(--md-motion-easing-standard)',
                    }}
                    title="Export preset"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>

              {/* Blatant Preset Card */}
              <div className="preset-card" style={{
                borderColor: themeColor,
                '--preset-card-color': themeColor
              }}>
                <div className="preset-card-header">
                  <div className="preset-card-title" style={{ color: themeColor }}>Blatant</div>
                </div>
                <div className="preset-card-time">
                  Obvious advantage
                </div>
                <div style={{
                  display: 'flex',
                  gap: 'var(--md-spacing-2)',
                  marginTop: 'auto',
                }}>
                  <button
                    onClick={applyBlatantPreset}
                    style={{
                      flex: 1,
                      padding: 'var(--md-spacing-3)',
                      border: `1px solid ${themeColor}`,
                      borderRadius: 'var(--md-shape-corner-small)',
                      background: `rgba(255, 184, 0, 0.1)`,
                      color: themeColor,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all var(--md-motion-duration-short2) var(--md-motion-easing-standard)',
                    }}
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => exportCloudPreset('Blatant', {
                      aimbot_: { enabled_: true, mode_: 'modern' },
                      meleeLock_: { enabled_: true },
                      mobileMovement_: { enabled_: false },
                      autoFire_: { enabled_: true },
                      autoHeal_: { enabled_: true },
                      blurBackground_: { enabled_: true },
                      backgroundChange_: { enabled_: true },
                      xray_: { enabled_: true },
                      esp_: { enabled_: true },
                      autoLoot_: { enabled_: true },
                      mapHighlights_: { enabled_: true },
                      infiniteZoom_: { enabled_: true },
                      autoSwitch_: { enabled_: true },
                      autoCrateBreak_: { enabled_: true },
                      panHero_: { enabled_: false },
                      layerSpoof_: { enabled_: true }
                    })}
                    style={{
                      padding: 'var(--md-spacing-3)',
                      border: '1px solid var(--md-outline)',
                      borderRadius: 'var(--md-shape-corner-small)',
                      background: 'var(--md-surface-container)',
                      color: 'var(--md-on-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all var(--md-motion-duration-short2) var(--md-motion-easing-standard)',
                    }}
                    title="Export preset"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Local Presets Tab */}
        {activePresetTab === 'local' && (
          <div className="preset-content">
            {/* Save Current Preset */}
            <div className="preset-subsection-title">
              <Save size={18} />
              Save Current Settings
            </div>
            <div style={{
              display: 'flex',
              gap: 'var(--md-spacing-2)',
              marginBottom: 'var(--md-spacing-5)',
            }}>
              <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Enter preset name..."
                style={{
                  flex: 1,
                  padding: 'var(--md-spacing-3) var(--md-spacing-4)',
                  border: '1px solid var(--md-outline)',
                  borderRadius: 'var(--md-shape-corner-small)',
                  background: 'var(--md-surface-container)',
                  color: 'var(--md-on-surface)',
                  fontSize: 'var(--md-font-body-medium)',
                  transition: 'all var(--md-motion-duration-short2) var(--md-motion-easing-standard)',
                }}
                onKeyPress={(e) => e.key === 'Enter' && saveCurrentAsPreset()}
              />
              <button
                onClick={saveCurrentAsPreset}
                style={{
                  padding: 'var(--md-spacing-3) var(--md-spacing-4)',
                  border: 'none',
                  borderRadius: 'var(--md-shape-corner-small)',
                  background: 'var(--md-primary)',
                  color: 'var(--md-on-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--md-motion-duration-short2) var(--md-motion-easing-standard)',
                }}
              >
                <Save size={18} />
              </button>
            </div>

            {/* Local Presets Grid */}
            {localPresets.length > 0 ? (
              <div className="preset-local-grid">
                {console.log('[Render] LocalPresets count:', localPresets.length) || localPresets.map((preset) => (
                  <div key={preset.id} className="preset-card">
                    <div className="preset-card-header">
                      <div className="preset-card-title">{preset.name}</div>
                      <div className="preset-card-actions">
                        <button
                          className="preset-card-action-btn"
                          onClick={() => copyToClipboard(preset.name, preset.id)}
                          title="Copy name"
                        >
                          {copiedId === preset.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="preset-card-time">
                      {formatDate(preset.createdAt)}
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: 'var(--md-spacing-2)',
                      marginTop: 'auto',
                    }}>
                      {/* Apply Button - Flex 1 */}
                      <button
                        onClick={() => applyLocalPreset(preset)}
                        style={{
                          flex: 1,
                          padding: 'var(--md-spacing-3)',
                          border: '1px solid var(--md-primary)',
                          borderRadius: 'var(--md-shape-corner-small)',
                          background: 'rgba(255, 184, 0, 0.1)',
                          color: 'var(--md-primary)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all var(--md-motion-duration-short2) var(--md-motion-easing-standard)',
                        }}
                      >
                        Apply
                      </button>

                      {/* Export Button */}
                      <button
                        onClick={() => exportLocalPreset(preset)}
                        style={{
                          padding: 'var(--md-spacing-3)',
                          border: '1px solid var(--md-outline)',
                          borderRadius: 'var(--md-shape-corner-small)',
                          background: 'var(--md-surface-container)',
                          color: 'var(--md-on-surface)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all var(--md-motion-duration-short2) var(--md-motion-easing-standard)',
                        }}
                        title="Export preset"
                      >
                        <Download size={16} />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => deleteLocalPreset(preset.id)}
                        style={{
                          padding: 'var(--md-spacing-3)',
                          border: '2px solid #ff3333',
                          borderRadius: 'var(--md-shape-corner-small)',
                          background: 'rgba(255, 51, 51, 0.15)',
                          color: '#ff3333',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          zIndex: 10,
                          pointerEvents: 'auto',
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 51, 51, 0.25)';
                          e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 51, 51, 0.4)';
                          e.currentTarget.style.transform = 'scale(1.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 51, 51, 0.15)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = 'scale(0.95)';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = 'scale(1.08)';
                        }}
                        title="Delete this preset permanently"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="preset-placeholder">
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: 'var(--md-spacing-3)',
                  opacity: 0.5,
                }}>
                  📦
                </div>
                <div style={{
                  fontSize: 'var(--md-font-title-medium)',
                  fontWeight: 600,
                  color: 'var(--md-on-surface)',
                  marginBottom: 'var(--md-spacing-1)',
                }}>
                  No presets saved yet
                </div>
                <p style={{
                  fontSize: 'var(--md-font-body-small)',
                  color: 'var(--md-on-surface-variant)',
                }}>
                  Save your current settings to create a new preset
                </p>
              </div>
            )}
          </div>
        )}

        {/* Client Control */}
        <div className="config-section-title">
          <Settings size={20} />
          Client Config
        </div>

        <div className="config-button-group">
          <button
            className="config-button config-button-primary"
            onClick={handleExportSettings}
          >
            <Download size={18} />
            Export Settings
          </button>
          <p className="config-button-description">
            Download your current settings as a JSON file
          </p>
        </div>

        <div className="config-button-group">
          <button
            className="config-button config-button-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={18} />
            Import Settings
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportSettings}
            style={{ display: 'none' }}
          />
          <p className="config-button-description">
            Load settings from a JSON file you previously exported
          </p>
        </div>
      </div>
    </div>
  );
};

export default Config;
