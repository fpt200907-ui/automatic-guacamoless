import React, { useState, useMemo } from 'react';
import Checkbox, { WarningCheckbox } from '@/ui/components/interaction/Checkbox.jsx';
import Slider, { WarningSlider } from '@/ui/components/interaction/Slider.jsx';
import SectionTitle from '@/ui/components/layout/SectionTitle.jsx';
import { Icons } from '@/ui/components/icons.jsx';
import KeybindSlot from '@/ui/components/interaction/KeybindSlot.jsx';
import FeatureCard from '@/ui/components/FeatureCard.jsx';
import BackgroundChange from '@/features/BackgroundChange.js';
import { Upload, RotateCcw } from 'lucide-preact';

const Main = ({ settings, onSettingChange, searchQuery = '' }) => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const backgroundChangeInstance = useMemo(() => {
    const instance = BackgroundChange();
    instance.init();
    return instance;
  }, []);

  // Define which features have expandable settings
  const featuresWithSettings = ['aimbot', 'autoheal', 'esp', 'xray', 'panhero', 'maphighlights', 'meleelock', 'backgroundchange'];
  // Lightweight feature list used for the searchable view
  const features = [
    {
      id: 'esp',
      title: 'ESP',
      category: 'Render',
      description: 'Show players and grenades through walls',
      enabled: settings.esp_.enabled_,
      onToggle: () => onSettingChange((s) => (s.esp_.enabled_ = !s.esp_.enabled_)),
      keybind: settings.keybinds_.toggleESP_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleESP_ = newKey)),
    },
    {
      id: 'xray',
      title: 'X-Ray',
      category: 'Render',
      description: 'Make smokes/ceilings transparent',
      enabled: settings.xray_.enabled_,
      onToggle: () => onSettingChange((s) => (s.xray_.enabled_ = !s.xray_.enabled_)),
      keybind: settings.keybinds_.toggleXRay_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleXRay_ = newKey)),
    },
    {
      id: 'infinitezoom',
      title: 'Infinite Zoom',
      category: 'Visual',
      description: 'Unlimited camera zoom',
      enabled: settings.infiniteZoom_.enabled_,
      onToggle: () => onSettingChange((s) => (s.infiniteZoom_.enabled_ = !s.infiniteZoom_.enabled_)),
      keybind: settings.keybinds_.toggleInfiniteZoom_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleInfiniteZoom_ = newKey)),
    },
    {
      id: 'layerspoof',
      title: 'Layer Spoofer',
      category: 'Visual',
      description: 'Change your visible layer',
      enabled: settings.layerSpoof_.enabled_,
      onToggle: () => onSettingChange((s) => (s.layerSpoof_.enabled_ = !s.layerSpoof_.enabled_)),
      keybind: settings.keybinds_.toggleLayerSpoof_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleLayerSpoof_ = newKey)),
    },
    {
      id: 'backgroundchange',
      title: 'Background Change',
      category: 'Visual',
      description: 'Customize game background',
      enabled: settings.backgroundChange_.enabled_,
      onToggle: () => onSettingChange((s) => (s.backgroundChange_.enabled_ = !s.backgroundChange_.enabled_)),
    },
  ];

  const normalizedQuery = (searchQuery || '').trim().toLowerCase();
  const filtered = normalizedQuery
    ? features.filter((f) => f.title.toLowerCase().includes(normalizedQuery) || f.description.toLowerCase().includes(normalizedQuery) || f.category.toLowerCase().includes(normalizedQuery))
    : features;

  return (
    <div className="section">
      <div className="feature-list">
        {filtered.map((f) => (
          <div key={f.id} className="feature-card-wrapper">
            <div className="feature-card-header" onClick={() => featuresWithSettings.includes(f.id) && setExpandedFeature(expandedFeature === f.id ? null : f.id)}>
              <FeatureCard title={f.title} category={f.category} description={f.description} enabled={f.enabled} onToggle={f.onToggle} keybind={f.keybind} onKeybindChange={f.onKeybindChange} />
              {featuresWithSettings.includes(f.id) && (
                <div className={`chevron ${expandedFeature === f.id ? 'expanded' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              )}
            </div>
            {expandedFeature === f.id && featuresWithSettings.includes(f.id) && (
              <div className="feature-settings">
                {f.id === 'esp' && (
                  <>
                    <Checkbox id="esp-nametags" label="Visible Nametags" checked={settings.esp_.visibleNametags_} onChange={(v) => onSettingChange((s) => (s.esp_.visibleNametags_ = v))} />
                    <Checkbox id="esp-players" label="Players" checked={settings.esp_.players_} onChange={(v) => onSettingChange((s) => (s.esp_.players_ = v))} />
                    <Checkbox id="esp-grenade-explosions" label="Grenade Explosions" checked={settings.esp_.grenades_.explosions_} onChange={(v) => onSettingChange((s) => (s.esp_.grenades_.explosions_ = v))} />
                    <Checkbox id="esp-grenade-trajectory" label="Grenade Trajectory" checked={settings.esp_.grenades_.trajectory_} onChange={(v) => onSettingChange((s) => (s.esp_.grenades_.trajectory_ = v))} />
                    <Checkbox id="esp-flashlight-own" label="Own Flashlights" checked={settings.esp_.flashlights_.own_} onChange={(v) => onSettingChange((s) => (s.esp_.flashlights_.own_ = v))} />
                    <Checkbox id="esp-flashlight-others" label="Others Flashlights" checked={settings.esp_.flashlights_.others_} onChange={(v) => onSettingChange((s) => (s.esp_.flashlights_.others_ = v))} />
                    <Checkbox id="esp-flashlight-trajectory" label="Flashlight Trajectory" checked={settings.esp_.flashlights_.trajectory_} onChange={(v) => onSettingChange((s) => (s.esp_.flashlights_.trajectory_ = v))} />
                  </>
                )}
                {f.id === 'xray' && (
                  <>
                    <Slider id="smoke-opacity" label="Smoke Opacity" value={settings.xray_.smokeOpacity_} onChange={(v) => onSettingChange((s) => (s.xray_.smokeOpacity_ = v))} />
                    <Checkbox id="darker-smokes" label="Darker Smokes" checked={settings.xray_.darkerSmokes_} onChange={(v) => onSettingChange((s) => (s.xray_.darkerSmokes_ = v))} />
                    <Slider id="tree-opacity" label="Tree Opacity" value={settings.xray_.treeOpacity_} onChange={(v) => onSettingChange((s) => (s.xray_.treeOpacity_ = v))} />
                    <Checkbox id="remove-ceilings" label="Remove Ceilings" checked={settings.xray_.removeCeilings_} onChange={(v) => onSettingChange((s) => (s.xray_.removeCeilings_ = v))} />
                  </>
                )}
                {f.id === 'backgroundchange' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button 
                      onClick={() => {
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.accept = 'image/*';
                        fileInput.onchange = (e) => {
                          const file = e.target.files?.[0];
                          if (file) backgroundChangeInstance.setBackgroundFromFile(file);
                        };
                        fileInput.click();
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--md-on-surface-variant)',
                        padding: 'var(--md-spacing-3) var(--md-spacing-4)',
                        border: 'none',
                        borderRadius: 'var(--md-shape-corner-medium)',
                        cursor: 'pointer',
                        fontSize: 'var(--md-font-label-large)',
                        fontWeight: '500',
                        transition: 'all var(--md-motion-duration-short3) var(--md-motion-easing-standard)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--md-state-hover)';
                        e.currentTarget.style.color = 'var(--md-on-surface)';
                        e.currentTarget.style.boxShadow = 'var(--md-elevation-1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--md-on-surface-variant)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <Upload size={18} />
                      Set from File
                    </button>
                    <button 
                      onClick={() => {
                        backgroundChangeInstance.resetBackground();
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--md-on-surface-variant)',
                        padding: 'var(--md-spacing-3) var(--md-spacing-4)',
                        border: 'none',
                        borderRadius: 'var(--md-shape-corner-medium)',
                        cursor: 'pointer',
                        fontSize: 'var(--md-font-label-large)',
                        fontWeight: '500',
                        transition: 'all var(--md-motion-duration-short3) var(--md-motion-easing-standard)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--md-state-hover)';
                        e.currentTarget.style.color = 'var(--md-on-surface)';
                        e.currentTarget.style.boxShadow = 'var(--md-elevation-1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--md-on-surface-variant)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <RotateCcw size={18} />
                      Reset
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
