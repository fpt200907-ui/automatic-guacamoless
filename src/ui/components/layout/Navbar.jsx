import React from 'react';
import { 
  Crosshair, Target, Eye, Settings, HelpCircle, Palette, Sliders
} from 'lucide-preact';

const Navbar = ({ activeTab, onTabChange }) => {
  const categories = [
    { id: 'main', label: 'Search', icon: Crosshair },
    { id: 'combat', label: 'Combat', icon: Target },
    { id: 'visuals', label: 'Visuals', icon: Eye },
    { id: 'misc', label: 'Misc', icon: Settings },
    { id: 'themes', label: 'Themes', icon: Palette },
    { id: 'config', label: 'Config', icon: Sliders },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;
          const IconComponent = cat.icon;

          return (
            <button
              key={cat.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              data-category={cat.id}
              onClick={() => onTabChange(cat.id)}
            >
              <IconComponent className="sidebar-icon" />
              <span className="sidebar-label">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
