import React, { useRef, useState } from 'react';
import { Download, Upload, Cloud, HardDrive, Settings, Sliders } from 'lucide-preact';

const Config = ({ settings, onSettingChange }) => {
  const fileInputRef = useRef(null);
  const [activePresetTab, setActivePresetTab] = useState('cloud');

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
          </button>
        </div>

        {/* Cloud Presets Tab */}
        {activePresetTab === 'cloud' && (
          <div className="preset-content">
            <div className="preset-buttons-grid">
              <button className="preset-button preset-button-legit" onClick={applyLegitPreset}>
                <div className="preset-name">Legit</div>
                <div className="preset-description">Undetectable settings</div>
              </button>
              <button className="preset-button preset-button-nocheat" onClick={applyNoCheatPreset}>
                <div className="preset-name">No Cheat</div>
                <div className="preset-description">Vanilla gameplay</div>
              </button>
              <button className="preset-button preset-button-blatant" onClick={applyBlatantPreset}>
                <div className="preset-name">Blatant</div>
                <div className="preset-description">Obvious advantage</div>
              </button>
            </div>
          </div>
        )}

        {/* Local Presets Tab */}
        {activePresetTab === 'local' && (
          <div className="preset-content">
            <div className="preset-placeholder">
              <p>No local presets saved yet</p>
            </div>
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
