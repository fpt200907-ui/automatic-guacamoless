import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/ui/components/layout/Navbar.jsx';
import CombatTab from '@/ui/components/tabs/Combat.jsx';
import MainTab from '@/ui/components/tabs/Main.jsx';
import VisualsTab from '@/ui/components/tabs/Visuals.jsx';
import MiscTab from '@/ui/components/tabs/Misc.jsx';
import HelpTab from '@/ui/components/tabs/Help.jsx';
import ThemesTab from '@/ui/components/tabs/Themes.jsx';
import { outer, outerDocument } from '@/core/outer.js';
import { ref_addEventListener, ref_removeEventListener } from '@/core/hook';

const Menu = ({ settings, onSettingChange, onClose, version }) => {
  const [activeTab, setActiveTab] = useState('main');
  const [position, setPosition] = useState({ x: 175, y: 125 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  const convertToSuperscript = (text) => {
    const superscriptMap = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      '.': '.',
    };
    return text.split('').map(char => superscriptMap[char] || char).join('');
  };
  const menuRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const menuElement = menuRef.current;
        if (!menuElement) return;

        const menuWidth = menuElement.offsetWidth;
        const minVisibleWidth = 100;

        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;

        const minX = -(menuWidth - minVisibleWidth);
        const maxX = outer.innerWidth - minVisibleWidth;

        const minY = 0;
        const maxY = outer.innerHeight - 50;

        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(minY, Math.min(maxY, newY));

        setPosition({
          x: newX,
          y: newY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      Reflect.apply(ref_addEventListener, outerDocument, ['mousemove', handleMouseMove]);
      Reflect.apply(ref_addEventListener, outerDocument, ['mouseup', handleMouseUp]);
    }

    return () => {
      Reflect.apply(ref_removeEventListener, outerDocument, ['mousemove', handleMouseMove]);
      Reflect.apply(ref_removeEventListener, outerDocument, ['mouseup', handleMouseUp]);
    };
  }, [isDragging, dragStart]);

  useEffect(() => {
    const clampPosition = () => {
      const menuElement = menuRef.current;
      if (!menuElement) return;

      const titlebarElement = menuElement.querySelector('.titlebar');
      if (!titlebarElement) return;

      const titlebarRect = titlebarElement.getBoundingClientRect();
      const menuWidth = menuElement.offsetWidth;
      const minVisibleWidth = 100;

      const minX = -(menuWidth - minVisibleWidth);
      const maxX = outer.innerWidth - minVisibleWidth;
      const minY = 0;
      const maxY = outer.innerHeight - titlebarRect.height;

      setPosition((prev) => ({
        x: Math.max(minX, Math.min(maxX, prev.x)),
        y: Math.max(minY, Math.min(maxY, prev.y)),
      }));
    };

    Reflect.apply(ref_addEventListener, outer, ['resize', clampPosition]);

    return () => {
      Reflect.apply(ref_removeEventListener, outer, ['resize', clampPosition]);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const containerStyle = {
    position: 'fixed',
    zIndex: '99999',
    left: `${position.x}px`,
    top: `${position.y}px`,
    willChange: isDragging ? 'transform' : 'auto',
    transition: isDragging ? 'none' : undefined,
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'combat':
        return <CombatTab settings={settings} onSettingChange={onSettingChange} />;
      case 'main':
      case 'search':
        return <MainTab settings={settings} onSettingChange={onSettingChange} searchQuery={searchQuery} />;
      case 'visuals':
        return <VisualsTab settings={settings} onSettingChange={onSettingChange} />;
      case 'misc':
        return <MiscTab settings={settings} onSettingChange={onSettingChange} />;
      case 'themes':
        return <ThemesTab settings={settings} onSettingChange={onSettingChange} />;
      case 'help':
        return <HelpTab settings={settings} onSettingChange={onSettingChange} />;
      default:
        return <MainTab settings={settings} onSettingChange={onSettingChange} searchQuery={searchQuery} />;
    }
  };

  return (
    <>
    <div
      id="ui"
      ref={menuRef}
      style={containerStyle}
      onClick={handleClick}
      onMouseDown={handleClick}
      onPointerDown={handleClick}
      onPointerUp={handleClick}
      onTouchStart={handleClick}
      onTouchEnd={handleClick}
    >
      <div className="popup">
        <div className="search-header" onMouseDown={(e) => {
          setIsDragging(true);
          setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
          });
        }}>
        <div className="logo-text">
          <span className="logo-char-green">S</span>
          <span className="logo-char-white">ur</span>
          <span className="logo-char-white">M</span>
          <span className="logo-char-white">i</span>
          <span className="logo-char-white">n</span>
          <span className="logo-char-white">u</span>
          <span className="logo-char-white">s</span>
          {version && <span className="version-text">{convertToSuperscript(version)}</span>}
        </div>
          <div className="search-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              className="search-input"
              placeholder="Start typing to search..."
              value={searchQuery}
              onChange={(e) => {
                const v = e.target.value;
                setSearchQuery(v);
                if (v.trim() !== '') setActiveTab('main');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchQuery('');
                }
              }}
            />
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="menu-layout">
          <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="main-panel">
            <div key={activeTab} className={`content-container ${activeTab ? 'active' : ''}`}>{renderActiveTab()}</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Menu;
