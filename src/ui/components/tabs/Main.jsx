import React, { useState, useMemo } from 'react';
import Checkbox, { WarningCheckbox } from '@/ui/components/interaction/Checkbox.jsx';
import Dropdown from '@/ui/components/interaction/Dropdown.jsx';
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
      id: 'aimbot',
      title: 'Aimbot',
      category: 'Combat',
      description: 'Auto-aim at enemies',
      keywords: ['aimbot', 'aim', 'lock', 'autoaim'],
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
      keywords: ['meleelock', 'melee', 'lock', 'aim', 'close-combat'],
      enabled: settings.meleeLock_.enabled_,
      onToggle: () => onSettingChange((s) => (s.meleeLock_.enabled_ = !s.meleeLock_.enabled_)),
      keybind: settings.keybinds_.toggleMeleeLock_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleMeleeLock_ = newKey)),
    },
    {
      id: 'autofire',
      title: 'Bumpfire',
      category: 'Combat',
      description: 'Automatic shooting when holding fire button',
      keywords: ['autofire', 'auto-fire', 'fire', 'shoot', 'shooting'],
      enabled: settings.autoFire_.enabled_,
      onToggle: () => onSettingChange((s) => (s.autoFire_.enabled_ = !s.autoFire_.enabled_)),
      keybind: settings.keybinds_.toggleAutoFire_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAutoFire_ = newKey)),
    },
    {
      id: 'autoheal',
      title: 'Auto Heal',
      category: 'Misc',
      description: 'Automatically uses healing items',
      keywords: ['autoheal', 'heal', 'healing', 'bandage', 'med'],
      enabled: settings.autoHeal_.enabled_,
      onToggle: () => onSettingChange((s) => (s.autoHeal_.enabled_ = !s.autoHeal_.enabled_)),
      keybind: settings.keybinds_.toggleAutoHeal_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAutoHeal_ = newKey)),
    },
    {
      id: 'esp',
      title: 'ESP',
      category: 'Visuals',
      description: 'Show players and grenades through walls',
      keywords: ['esp', 'wallhack', 'wall', 'see-through'],
      enabled: settings.esp_.enabled_,
      onToggle: () => onSettingChange((s) => (s.esp_.enabled_ = !s.esp_.enabled_)),
      keybind: settings.keybinds_.toggleESP_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleESP_ = newKey)),
    },
    {
      id: 'xray',
      title: 'X-Ray',
      category: 'Visuals',
      description: 'Make smokes/ceilings transparent',
      keywords: ['xray', 'x-ray', 'smoke', 'transparent', 'ceiling'],
      enabled: settings.xray_.enabled_,
      onToggle: () => onSettingChange((s) => (s.xray_.enabled_ = !s.xray_.enabled_)),
      keybind: settings.keybinds_.toggleXRay_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleXRay_ = newKey)),
    },
    {
      id: 'panhero',
      title: 'Pan Hero',
      category: 'Combat',
      description: 'Reflect bullets with a pan',
      keywords: ['panhero', 'pan', 'hero', 'turn', 'away'],
      enabled: settings.panHero_.enabled_,
      onToggle: () => onSettingChange((s) => (s.panHero_.enabled_ = !s.panHero_.enabled_)),
      keybind: settings.keybinds_.togglePanHero_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.togglePanHero_ = newKey)),
    },
    {
      id: 'infinitezoom',
      title: 'Infinite Zoom',
      category: 'Visuals',
      description: 'Unlimited camera zoom',
      keywords: ['infinitezoom', 'infinite', 'zoom', 'camera', 'view'],
      enabled: settings.infiniteZoom_.enabled_,
      onToggle: () => onSettingChange((s) => (s.infiniteZoom_.enabled_ = !s.infiniteZoom_.enabled_)),
      keybind: settings.keybinds_.toggleInfiniteZoom_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleInfiniteZoom_ = newKey)),
    },
    {
      id: 'maphighlights',
      title: 'Map Highlights',
      category: 'Visuals',
      description: 'Highlight map details',
      keywords: ['maphighlights', 'map', 'highlight', 'details', 'Visuals'],
      enabled: settings.mapHighlights_.enabled_,
      onToggle: () => onSettingChange((s) => (s.mapHighlights_.enabled_ = !s.mapHighlights_.enabled_)),
      keybind: settings.keybinds_.toggleMapHighlights_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleMapHighlights_ = newKey)),
    },
    {
      id: 'layerspoof',
      title: 'Layer Spoofer',
      category: 'Visuals',
      description: 'Change your visible layer',
      keywords: ['layerspoof', 'layer', 'spoof', 'dimension'],
      enabled: settings.layerSpoof_.enabled_,
      onToggle: () => onSettingChange((s) => (s.layerSpoof_.enabled_ = !s.layerSpoof_.enabled_)),
      keybind: settings.keybinds_.toggleLayerSpoof_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleLayerSpoof_ = newKey)),
    },
    {
      id: 'autoloot',
      title: 'Auto Loot',
      category: 'Misc',
      description: 'Automatically pick up items',
      keywords: ['autoloot', 'auto-loot', 'loot', 'pickup', 'items'],
      enabled: settings.autoLoot_.enabled_,
      onToggle: () => onSettingChange((s) => (s.autoLoot_.enabled_ = !s.autoLoot_.enabled_)),
      keybind: settings.keybinds_.toggleAutoLoot_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAutoLoot_ = newKey)),
    },
    {
      id: 'autocrate',
      title: 'Auto Crate Break',
      category: 'Misc',
      description: 'Automatically break supply crates',
      keywords: ['autocrate', 'auto-crate', 'crate', 'break', 'supply'],
      enabled: settings.autoCrateBreak_.enabled_,
      onToggle: () => onSettingChange((s) => (s.autoCrateBreak_.enabled_ = !s.autoCrateBreak_.enabled_)),
      keybind: settings.keybinds_.toggleAutoCrate_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAutoCrate_ = newKey)),
    },
    {
      id: 'autoswitch',
      title: 'Auto Switch',
      category: 'Combat',
      description: 'Automatically switch weapons',
      keywords: ['autoswitch', 'auto-switch', 'switch', 'weapon', 'gun'],
      enabled: settings.autoSwitch_.enabled_,
      onToggle: () => onSettingChange((s) => (s.autoSwitch_.enabled_ = !s.autoSwitch_.enabled_)),
      keybind: settings.keybinds_.toggleAutoSwitch_,
      onKeybindChange: (newKey) => onSettingChange((s) => (s.keybinds_.toggleAutoSwitch_ = newKey)),
    },
    {
      id: 'backgroundchange',
      title: 'Background Change',
      category: 'Visuals',
      description: 'Customize game background',
      keywords: ['background', 'change', 'customize', 'background', 'image'],
      enabled: settings.backgroundChange_.enabled_,
      onToggle: () => onSettingChange((s) => (s.backgroundChange_.enabled_ = !s.backgroundChange_.enabled_)),
    },
  ];

  const normalizedQuery = (searchQuery || '').trim().toLowerCase();
  const filtered = normalizedQuery
    ? features.filter((f) => {
        const searchableText = [
          f.title,
          f.description,
          f.category,
          f.keywords ? f.keywords.join(' ') : ''
        ].join(' ').toLowerCase();
        return searchableText.includes(normalizedQuery);
      })
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
                {f.id === 'autoheal' && (
                  <>
                    <Slider id="bandage-threshold" label="Bandage Threshold" value={settings.autoHeal_.bandageThreshold_} onChange={(v) => onSettingChange((s) => (s.autoHeal_.bandageThreshold_ = v))} />
                    <Slider id="kit-threshold" label="Kit Threshold" value={settings.autoHeal_.kitThreshold_} onChange={(v) => onSettingChange((s) => (s.autoHeal_.kitThreshold_ = v))} />
                    <Slider id="boost-threshold" label="Boost Threshold" value={settings.autoHeal_.boostThreshold_} onChange={(v) => onSettingChange((s) => (s.autoHeal_.boostThreshold_ = v))} />
                    <Checkbox id="auto-heal-enemy-check" label="Enemy Check" checked={settings.autoHeal_.enemyCheck_} onChange={(v) => onSettingChange((s) => (s.autoHeal_.enemyCheck_ = v))} />
                    <Slider id="enemy-distance" label="Enemy Distance" value={settings.autoHeal_.enemyDistance_} onChange={(v) => onSettingChange((s) => (s.autoHeal_.enemyDistance_ = v))} />
                  </>
                )}
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
                {f.id === 'maphighlights' && (
                  <Checkbox id="smaller-trees" label="Smaller Trees" checked={settings.mapHighlights_.smallerTrees_} onChange={(v) => onSettingChange((s) => (s.mapHighlights_.smallerTrees_ = v))} />
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
