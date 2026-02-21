import React from 'react';
import KeybindSlot from '@/ui/components/interaction/KeybindSlot.jsx';
import { Icons } from '@/ui/components/icons.jsx';

const FeatureCard = ({ title, category, description, enabled, onToggle, keybind, onKeybindChange, featureId, className = '' }) => {
  // Map feature IDs to icon keys
  const iconMap = {
    'aimbot': 'Aimbot_',
    'meleelock': 'MeleeLock_',
    'autofire': 'SemiAuto_',
    'autoheal': 'AutoHeal_',
    'esp': 'ESP_',
    'xray': 'XRay_',
    'panhero': 'PanHero_',
    'infinitezoom': 'InfiniteZoom_',
    'maphighlights': 'Map_',
    'layerspoof': 'LayerSpoof_',
    'autoloot': 'AutoLoot_',
    'autocrate': 'Autocrate_',
  };
  
  const iconKey = featureId ? iconMap[featureId] : null;
  const IconComponent = iconKey ? Icons[iconKey] : null;
  
  return (
    <div className={`feature-card ${enabled ? 'enabled' : 'disabled'} ${className}`} onClick={() => onToggle && onToggle()}>
      {IconComponent && (
        <div className="feature-card-icon">
          <IconComponent width={20} height={20} />
        </div>
      )}
      <div className="feature-card-body">
        <div className="feature-card-title">
          <div className="feature-title-text">{title}</div>
          {keybind && (
            <KeybindSlot
              keybind={keybind}
              editable={true}
              onClick={(newKey) => onKeybindChange && onKeybindChange(newKey)}
            />
          )}
          <div className="feature-category">{category}</div>
        </div>
        <div className="feature-desc">{description}</div>
      </div>
      <div className="feature-card-toggle" onClick={(e) => { e.stopPropagation(); onToggle && onToggle(); }}>
        <div className={`toggle ${enabled ? 'on' : 'off'}`}></div>
      </div>
    </div>
  );
};

export default FeatureCard;
