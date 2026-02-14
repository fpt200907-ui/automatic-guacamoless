import React from 'react';
import { Icons } from '@/ui/components/icons.jsx';

const Titlebar = ({ onMouseDown, version, onClose }) => {
  const handleMouseDown = (e) => {
    if (e.target.closest('.close-btn')) return;
    onMouseDown(e);
  };

  return (
    <div className="titlebar" onMouseDown={handleMouseDown}>
      <div className="titlebar-left">
        <Icons.Surplus_ className="menu-icon" />
        <div className="titlebar-info">
          <div className="title-row">
            <div className="title">SurMinus</div>
            {version && <div className="version-text">{version}</div>}
          </div>
          <div className="credit">by shiroko & winzy</div>
        </div>
      </div>
      <button className="close-btn" onClick={onClose}>
          ×
        </button>
    </div>
  );
};

export default Titlebar;
