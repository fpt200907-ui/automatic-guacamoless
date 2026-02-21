import React, { useState } from 'react';
import Checkbox, { WarningCheckbox } from '@/ui/components/interaction/Checkbox.jsx';
import Dropdown from '@/ui/components/interaction/Dropdown.jsx';
import Slider, { WarningSlider } from '@/ui/components/interaction/Slider.jsx';
import SectionTitle from '@/ui/components/layout/SectionTitle.jsx';
import { Icons } from '@/ui/components/icons.jsx';
import KeybindSlot from '@/ui/components/interaction/KeybindSlot.jsx';
import FeatureCard from '@/ui/components/FeatureCard.jsx';

const Main = ({ settings, onSettingChange, searchQuery = '' }) => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  // Define which features have expandable settings
  const featuresWithSettings = ['aimbot', 'autoheal', 'esp', 'xray', 'panhero', 'maphighlights', 'meleelock'];
  // Lightweight feature list used for the searchable view
  const features = [
    {
      id: 'aimbot',
      title: 'Aimbot',
      category: 'Combat',
      description: 'Auto-aim at enemies',
      enabled: settings.aimbot_.enabled_,
      onToggle: () => onSettingChange((s) => (s.aimbot_.enabled_ = !s.aimbot_.enabled_)),
      keybind: settings.keybinds_.toggleAimbot_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAimbot_ = newKey)),
    },
    {
      id: 'meleelock',
      title: 'Melee Lock',
      category: 'Combat',
      description: 'Lock melee aim on nearest enemy',
      enabled: settings.meleeLock_.enabled_,
      onToggle: () => onSettingChange((s) => (s.meleeLock_.enabled_ = !s.meleeLock_.enabled_)),
      keybind: settings.keybinds_.toggleMeleeLock_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleMeleeLock_ = newKey)),
    },
    {
      id: 'autofire',
      title: 'BumpFire',
      category: 'Combat',
      description: 'Automatic shooting when holding fire button',
      enabled: settings.autoFire_.enabled_,
      onToggle: () => onSettingChange((s) => (s.autoFire_.enabled_ = !s.autoFire_.enabled_)),
      keybind: settings.keybinds_.toggleAutoFire_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAutoFire_ = newKey)),
    },
    {
      id: 'panhero',
      title: 'Pan Hero',
      category: 'Combat',
      description: 'Reflect bullets with a pan',
      enabled: settings.panHero_.enabled_,
      onToggle: () => onSettingChange((s) => (s.panHero_.enabled_ = !s.panHero_.enabled_)),
      keybind: settings.keybinds_.togglePanHero_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.togglePanHero_ = newKey)),
    },
    {
      id: 'autoswitch',
      title: 'Auto Switch',
      category: 'Combat',
      description: 'Automatically switch weapons',
      enabled: settings.autoSwitch_.enabled_,
      onToggle: () => onSettingChange((s) => (s.autoSwitch_.enabled_ = !s.autoSwitch_.enabled_)),
      keybind: settings.keybinds_.toggleAutoSwitch_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAutoSwitch_ = newKey)),
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
              <FeatureCard title={f.title} category={f.category} description={f.description} enabled={f.enabled} onToggle={f.onToggle} keybind={f.keybind} onKeybindChange={f.onKeybindChange} featureId={f.id} />
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
                {f.id === 'aimbot' && (
                  <>
                    <Dropdown
                      id="aimbot-mode"
                      label="Aimbot Mode"
                      value={settings.aimbot_.mode_ || 'modern'}
                      options={[
                        { value: 'modern', label: 'Modern' },
                        { value: 'classic', label: 'Classic' },
                      ]}
                      onChange={(v) => onSettingChange((s) => (s.aimbot_.mode_ = v))}
                    />
                    {settings.aimbot_.mode_ === 'classic' && (
                      <>
                        <Slider id="classic-fov" label="FOV (°)" value={settings.aimbot_.classicFov_} onChange={(v) => onSettingChange((s) => (s.aimbot_.classicFov_ = v))} min="30" max="360" step="5" />
                        <Slider id="classic-smooth" label="Aim Smooth" value={settings.aimbot_.classicSmooth_} onChange={(v) => onSettingChange((s) => (s.aimbot_.classicSmooth_ = v))} min="0" max="100" />
                      </>
                    )}
                    <Checkbox id="aimbot-target-knocked" label="Target Knocked" checked={settings.aimbot_.targetKnocked_} onChange={(v) => onSettingChange((s) => (s.aimbot_.targetKnocked_ = v))} />
                    <Checkbox id="aimbot-sticky-target" label="Sticky Target" checked={settings.aimbot_.stickyTarget_} onChange={(v) => onSettingChange((s) => (s.aimbot_.stickyTarget_ = v))} />
                    <Checkbox id="aimbot-show-dot" label="Show Dot" checked={settings.aimbot_.showDot_} onChange={(v) => onSettingChange((s) => (s.aimbot_.showDot_ = v))} />
                    <Checkbox id="aimbot-show-fov-circle" label="Show FOV Circle" checked={settings.aimbot_.showFovCircle_} onChange={(v) => onSettingChange((s) => (s.aimbot_.showFovCircle_ = v))} />
                    <WarningCheckbox id="aimbot-wallcheck" label="Wallcheck" checked={settings.aimbot_.wallcheck_} onChange={(v) => onSettingChange((s) => (s.aimbot_.wallcheck_ = v))} />
                    <Checkbox id="aimbot-auto-attack" label="Auto Attack" checked={settings.aimbot_.autoAttack_} onChange={(v) => onSettingChange((s) => (s.aimbot_.autoAttack_ = v))} />
                  </>
                )}
                {f.id === 'meleelock' && (
                  <>
                    <Checkbox id="auto-melee" label="Auto Melee" checked={settings.meleeLock_.autoMelee_} onChange={(v) => onSettingChange((s) => (s.meleeLock_.autoMelee_ = v))} />
                    <Checkbox id="enable-strafe" label="Random Strafe" checked={settings.meleeLock_.enableStrafe_} onChange={(v) => onSettingChange((s) => (s.meleeLock_.enableStrafe_ = v))} />
                    {settings.meleeLock_.enableStrafe_ && (
                      <>
                        <Slider id="strafe-intensity" label="Strafe Intensity" value={settings.meleeLock_.strafeIntensity_} onChange={(v) => onSettingChange((s) => (s.meleeLock_.strafeIntensity_ = v))} />
                        <Slider id="strafe-chance" label="Strafe Chance" value={settings.meleeLock_.strafeChance_} onChange={(v) => onSettingChange((s) => (s.meleeLock_.strafeChance_ = v))} />
                      </>
                    )}
                    <Checkbox id="enable-evasion" label="Melee Range Evasion" checked={settings.meleeLock_.enableEvasion_} onChange={(v) => onSettingChange((s) => (s.meleeLock_.enableEvasion_ = v))} />
                    {settings.meleeLock_.enableEvasion_ && (
                      <>
                        <Slider id="evasion-range" label="Evasion Range" value={settings.meleeLock_.evasionRange_} onChange={(v) => onSettingChange((s) => (s.meleeLock_.evasionRange_ = v))} min="2" max="8" />
                        <Slider id="evasion-strength" label="Evasion Strength" value={settings.meleeLock_.evasionStrength_} onChange={(v) => onSettingChange((s) => (s.meleeLock_.evasionStrength_ = v))} />
                      </>
                    )}
                  </>
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
