import React from 'react';
import KeybindSlot from '@/ui/components/interaction/KeybindSlot.jsx';

const FeatureCard = ({ title, category, description, enabled, onToggle, keybind, onKeybindChange, className = '' }) => {
  return (
    <div className={`feature-card ${enabled ? 'enabled' : 'disabled'} ${className}`} onClick={() => onToggle && onToggle()}>
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
