import React, { useState } from 'react';
import Checkbox, { WarningCheckbox } from '@/ui/components/interaction/Checkbox.jsx';
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
      id: 'autoheal',
      title: 'Auto Heal',
      category: 'Player',
      description: 'Automatically uses healing items',
      enabled: settings.autoHeal_.enabled_,
      onToggle: () => onSettingChange((s) => (s.autoHeal_.enabled_ = !s.autoHeal_.enabled_)),
      keybind: settings.keybinds_.toggleAutoHeal_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAutoHeal_ = newKey)),
    },
    {
      id: 'maphighlights',
      title: 'Map Highlights',
      category: 'Visual',
      description: 'Highlight map details',
      enabled: settings.mapHighlights_.enabled_,
      onToggle: () => onSettingChange((s) => (s.mapHighlights_.enabled_ = !s.mapHighlights_.enabled_)),
      keybind: settings.keybinds_.toggleMapHighlights_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleMapHighlights_ = newKey)),
    },
    {
      id: 'autoloot',
      title: 'Auto Loot',
      category: 'Player',
      description: 'Automatically pick up items',
      enabled: settings.autoLoot_.enabled_,
      onToggle: () => onSettingChange((s) => (s.autoLoot_.enabled_ = !s.autoLoot_.enabled_)),
      keybind: settings.keybinds_.toggleAutoLoot_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAutoLoot_ = newKey)),
    },
    {
      id: 'autocrate',
      title: 'Auto Crate Break',
      category: 'Combat',
      description: 'Automatically break supply crates',
      enabled: settings.autoCrateBreak_.enabled_,
      onToggle: () => onSettingChange((s) => (s.autoCrateBreak_.enabled_ = !s.autoCrateBreak_.enabled_)),
      keybind: settings.keybinds_.toggleAutoCrate_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAutoCrate_ = newKey)),
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
                {f.id === 'autoheal' && (
                  <>
                    <Slider id="bandage-threshold" label="Bandage Threshold" value={settings.autoHeal_.bandageThreshold_} onChange={(v) => onSettingChange((s) => (s.autoHeal_.bandageThreshold_ = v))} />
                    <Slider id="kit-threshold" label="Kit Threshold" value={settings.autoHeal_.kitThreshold_} onChange={(v) => onSettingChange((s) => (s.autoHeal_.kitThreshold_ = v))} />
                                        <Slider id="boost-threshold" label="Boost Threshold" value={settings.autoHeal_.boostThreshold_} onChange={(v) => onSettingChange((s) => (s.autoHeal_.boostThreshold_ = v))} />
                    <Checkbox id="auto-heal-enemy-check" label="Enemy Check" checked={settings.autoHeal_.enemyCheck_} onChange={(v) => onSettingChange((s) => (s.autoHeal_.enemyCheck_ = v))} />
                    <Slider id="enemy-distance" label="Enemy Distance" value={settings.autoHeal_.enemyDistance_} onChange={(v) => onSettingChange((s) => (s.autoHeal_.enemyDistance_ = v))} />
                  </>
                )}
                {f.id === 'maphighlights' && (
                  <Checkbox id="smaller-trees" label="Smaller Trees" checked={settings.mapHighlights_.smallerTrees_} onChange={(v) => onSettingChange((s) => (s.mapHighlights_.smallerTrees_ = v))} />
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
