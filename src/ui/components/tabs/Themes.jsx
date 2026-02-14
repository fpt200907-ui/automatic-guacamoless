import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-preact';
import { shadowRoot } from '@/core/outer.js';

const Themes = ({ settings, onSettingChange }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('surminus-theme') || 'green';
  });
  const [notificationTheme, setNotificationTheme] = useState(null);

  const colorPresets = [
    {
      id: 'yellow',
      name: 'Golden Yellow',
      primary: '#ffb800',
      gradient: 'linear-gradient(135deg, #ffb800 0%, #ff9500 100%)',
      description: 'Warm and energetic golden yellow',
      colors: {
        primary: '#ffb800',
        primaryContainer: 'rgba(255, 184, 0, 0.15)',
        stateHover: 'rgba(255, 184, 0, 0.08)',
        stateFocus: 'rgba(255, 184, 0, 0.12)',
      }
    },
    {
      id: 'mint',
      name: 'Mint Green',
      primary: '#6fd89f',
      gradient: 'linear-gradient(135deg, #6fd89f 0%, #5dd184 100%)',
      description: 'Fresh and calming mint green',
      colors: {
        primary: '#6fd89f',
        primaryContainer: 'rgba(111, 216, 159, 0.15)',
        stateHover: 'rgba(111, 216, 159, 0.08)',
        stateFocus: 'rgba(111, 216, 159, 0.12)',
      }
    },
    {
      id: 'peach',
      name: 'Warm Peach',
      primary: '#f5c69b',
      gradient: 'linear-gradient(135deg, #f5c69b 0%, #f0a476 100%)',
      description: 'Soft and warm peachy tone',
      colors: {
        primary: '#f5c69b',
        primaryContainer: 'rgba(245, 198, 155, 0.15)',
        stateHover: 'rgba(245, 198, 155, 0.08)',
        stateFocus: 'rgba(245, 198, 155, 0.12)',
      }
    },
    {
      id: 'lavender',
      name: 'Soft Lavender',
      primary: '#c8b5e6',
      gradient: 'linear-gradient(135deg, #c8b5e6 0%, #b895d4 100%)',
      description: 'Elegant and dreamy lavender',
      colors: {
        primary: '#c8b5e6',
        primaryContainer: 'rgba(200, 181, 230, 0.15)',
        stateHover: 'rgba(200, 181, 230, 0.08)',
        stateFocus: 'rgba(200, 181, 230, 0.12)',
      }
    },
    {
      id: 'pistachio',
      name: 'Light Pistachio',
      primary: '#b5d89f',
      gradient: 'linear-gradient(135deg, #b5d89f 0%, #a0ce84 100%)',
      description: 'Subtle and sophisticated pistachio',
      colors: {
        primary: '#b5d89f',
        primaryContainer: 'rgba(181, 216, 159, 0.15)',
        stateHover: 'rgba(181, 216, 159, 0.08)',
        stateFocus: 'rgba(181, 216, 159, 0.12)',
      }
    },
    {
      id: 'rose',
      name: 'Rose Quartz',
      primary: '#f5bcd4',
      gradient: 'linear-gradient(135deg, #f5bcd4 0%, #f0a8c0 100%)',
      description: 'Gentle and romantic rose',
      colors: {
        primary: '#f5bcd4',
        primaryContainer: 'rgba(245, 188, 212, 0.15)',
        stateHover: 'rgba(245, 188, 212, 0.08)',
        stateFocus: 'rgba(245, 188, 212, 0.12)',
      }
    },
    {
      id: 'blush',
      name: 'Soft Blush',
      primary: '#f5d4e0',
      gradient: 'linear-gradient(135deg, #f5d4e0 0%, #f0c4d0 100%)',
      description: 'Delicate and charming blush',
      colors: {
        primary: '#f5d4e0',
        primaryContainer: 'rgba(245, 212, 224, 0.15)',
        stateHover: 'rgba(245, 212, 224, 0.08)',
        stateFocus: 'rgba(245, 212, 224, 0.12)',
      }
    },
    {
      id: 'skyblue',
      name: 'Sky Blue',
      primary: '#b5d9f0',
      gradient: 'linear-gradient(135deg, #b5d9f0 0%, #80c8e8 100%)',
      description: 'Peaceful and serene sky blue',
      colors: {
        primary: '#b5d9f0',
        primaryContainer: 'rgba(181, 217, 240, 0.15)',
        stateHover: 'rgba(181, 217, 240, 0.08)',
        stateFocus: 'rgba(181, 217, 240, 0.12)',
      }
    },
    {
      id: 'green',
      name: 'Bright Green',
      primary: '#6edb72',
      gradient: 'linear-gradient(135deg, #6edb72 0%, #41d855 100%)',
      description: 'Fresh and vibrant bright green',
      colors: {
        primary: '#6edb72',
        primaryContainer: 'rgba(110, 219, 114, 0.15)',
        stateHover: 'rgba(110, 219, 114, 0.08)',
        stateFocus: 'rgba(110, 219, 114, 0.12)',
      }
    },
    {
      id: 'cyan',
      name: 'Cyber Cyan',
      primary: '#00d9ff',
      gradient: 'linear-gradient(135deg, #00d9ff 0%, #00b8d4 100%)',
      description: 'Cool and futuristic cyan',
      colors: {
        primary: '#00d9ff',
        primaryContainer: 'rgba(0, 217, 255, 0.15)',
        stateHover: 'rgba(0, 217, 255, 0.08)',
        stateFocus: 'rgba(0, 217, 255, 0.12)',
      }
    },
    {
      id: 'pink',
      name: 'Hot Pink',
      primary: '#ff006e',
      gradient: 'linear-gradient(135deg, #ff006e 0%, #e60062 100%)',
      description: 'Bold and vibrant hot pink',
      colors: {
        primary: '#ff006e',
        primaryContainer: 'rgba(255, 0, 110, 0.15)',
        stateHover: 'rgba(255, 0, 110, 0.08)',
        stateFocus: 'rgba(255, 0, 110, 0.12)',
      }
    },
    {
      id: 'purple',
      name: 'Purple Haze',
      primary: '#b537f2',
      gradient: 'linear-gradient(135deg, #b537f2 0%, #9620d4 100%)',
      description: 'Mystical and elegant purple',
      colors: {
        primary: '#b537f2',
        primaryContainer: 'rgba(181, 55, 242, 0.15)',
        stateHover: 'rgba(181, 55, 242, 0.08)',
        stateFocus: 'rgba(181, 55, 242, 0.12)',
      }
    },
    {
      id: 'red',
      name: 'Plasma Red',
      primary: '#ff3333',
      gradient: 'linear-gradient(135deg, #ff3333 0%, #e60000 100%)',
      description: 'Intense and aggressive red',
      colors: {
        primary: '#ff3333',
        primaryContainer: 'rgba(255, 51, 51, 0.15)',
        stateHover: 'rgba(255, 51, 51, 0.08)',
        stateFocus: 'rgba(255, 51, 51, 0.12)',
      }
    }
  ];

  const applyTheme = (themeId) => {
    // Apply selected theme
    const theme = colorPresets.find(t => t.id === themeId);
    if (!theme) return;

    // remember previous theme to update inline styles that used explicit colors
    const prevThemeId = localStorage.getItem('surminus-theme');
    const prevTheme = colorPresets.find(t => t.id === prevThemeId);

    setCurrentTheme(themeId);

    const { r, g, b } = hexToRgbObj(theme.colors.primary);

    // Set CSS variables on root - affects everything
    const applyVariables = (element) => {
      if (!element) return;
      element.style.setProperty('--md-primary', theme.colors.primary, 'important');
      element.style.setProperty('--md-primary-container', theme.colors.primaryContainer, 'important');
      element.style.setProperty('--md-state-hover', theme.colors.stateHover, 'important');
      element.style.setProperty('--md-state-focus', theme.colors.stateFocus, 'important');
      element.style.setProperty('--md-state-pressed', theme.colors.stateFocus, 'important');
      element.style.setProperty('--md-state-dragged', `rgba(${r}, ${g}, ${b}, 0.16)`, 'important');
      element.style.setProperty('--md-scrollbar-thumb', `rgba(${r}, ${g}, ${b}, 0.5)`, 'important');
      element.style.setProperty('--md-scrollbar-thumb-hover', `rgba(${r}, ${g}, ${b}, 0.8)`, 'important');
      element.style.setProperty('--md-primary-rgb', `${r}, ${g}, ${b}`, 'important');
    };

    // Apply to #ui element - check shadowRoot first, then main document
    let uiElement = null;
    if (shadowRoot) {
      uiElement = shadowRoot.getElementById('ui');
    }
    if (!uiElement) {
      uiElement = document.getElementById('ui');
    }
    
    if (uiElement) {
      applyVariables(uiElement);
      
      // Also apply to all children to ensure cascade
      uiElement.querySelectorAll('*').forEach(el => {
        if (el.style) {
          applyVariables(el);
        }
      });
    }

    // Also apply to root
    applyVariables(document.documentElement);
    
    // Apply to shadowRoot host as well
    if (shadowRoot && shadowRoot.host) {
      applyVariables(shadowRoot.host);
    }

    // Fix elements which had inline styles using the previous primary color (explicit hex)
    try {
      if (prevTheme && prevTheme.colors && prevTheme.colors.primary) {
        const oldHex = prevTheme.colors.primary.toLowerCase();
        const newHex = theme.colors.primary;

        const scanIn = (rootEl) => {
          if (!rootEl) return;
          rootEl.querySelectorAll('[style]').forEach((el) => {
            try {
              const txt = el.getAttribute('style');
              if (txt && txt.toLowerCase().includes(oldHex)) {
                const newTxt = txt.replace(new RegExp(oldHex, 'ig'), newHex);
                el.setAttribute('style', newTxt);
              }
            } catch (e) {}
          });
        };

        // scan shadowRoot first
        if (shadowRoot) scanIn(shadowRoot);
        // then document
        scanIn(document);
      }
    } catch (e) {
      // ignore
    }

    // Inject scrollbar styles - must be in head because pseudo-elements can't use CSS variables dynamically
    try {
      let scrollbarStyleId = 'surminus-scrollbar-override';
      let existing = document.head.querySelector('style#' + scrollbarStyleId);
      if (existing) existing.remove();
      
      const scrollbarStyle = document.createElement('style');
      scrollbarStyle.id = scrollbarStyleId;
      scrollbarStyle.textContent = `
        #ui ::-webkit-scrollbar-thumb {
          background: rgba(${r}, ${g}, ${b}, 0.5) !important;
        }
        #ui ::-webkit-scrollbar-thumb:hover {
          background: rgba(${r}, ${g}, ${b}, 0.8) !important;
        }
        #ui * {
          scrollbar-color: rgba(${r}, ${g}, ${b}, 0.5) rgba(255, 255, 255, 0.03) !important;
        }
      `;
      document.head.appendChild(scrollbarStyle);
    } catch (e) {
      console.log('Scrollbar style error:', e.message);
    }

    // Try shadow DOM
    try {
      if (shadowRoot) {
        let styleId = 'surminus-theme-override';
        let existing = shadowRoot.querySelector('style#' + styleId);
        if (existing) existing.remove();
        
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        
        // Target the actual UI elements in shadow DOM
        const css = `
          * {
            --md-primary: ${theme.colors.primary} !important;
            --md-primary-container: ${theme.colors.primaryContainer} !important;
            --md-state-hover: ${theme.colors.stateHover} !important;
            --md-state-focus: ${theme.colors.stateFocus} !important;
            --md-state-pressed: ${theme.colors.stateFocus} !important;
            --md-state-dragged: rgba(${r}, ${g}, ${b}, 0.16) !important;
            --md-scrollbar-thumb: rgba(${r}, ${g}, ${b}, 0.5) !important;
            --md-scrollbar-thumb-hover: rgba(${r}, ${g}, ${b}, 0.8) !important;
          }
        `;
        
        styleEl.textContent = css;
        shadowRoot.insertBefore(styleEl, shadowRoot.firstChild);
      }
    } catch (e) {
      console.log('Shadow DOM info:', e.message);
    }

    // ensure RGB var is set on documentElement for CSS rgba(var(--md-primary-rgb), a) usage
    try {
      const { r: rr, g: rg, b: rb } = hexToRgbObj(theme.colors.primary);
      document.documentElement.style.setProperty('--md-primary-rgb', `${rr}, ${rg}, ${rb}`, 'important');
    } catch (e) {}

    // Save selected theme
    localStorage.setItem('surminus-theme', themeId);

    // Show notification
    setNotificationTheme(theme);
    setTimeout(() => {
      setNotificationTheme(null);
    }, 5000);
  };

  const hexToRgbObj = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      };
    }
    return { r: 255, g: 184, b: 0 };
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 184, 0';
  };

  useEffect(() => {
    // Retry logic to ensure DOM is ready
    let attempts = 0;
    const maxAttempts = 10;
    
    const loadTheme = () => {
      // Check if #ui element exists in shadowRoot
      let uiElement = null;
      if (shadowRoot) {
        uiElement = shadowRoot.getElementById('ui');
      }
      if (!uiElement) {
        uiElement = document.getElementById('ui');
      }

      if (uiElement) {
        // DOM is ready, apply theme
        const savedTheme = localStorage.getItem('surminus-theme');
        if (savedTheme) {
          applyTheme(savedTheme);
        } else {
          // Apply default green theme first time
          applyTheme('green');
        }
      } else if (attempts < maxAttempts) {
        // Retry if element not found yet
        attempts++;
        setTimeout(loadTheme, 100);
      }
    };

    // Start loading theme
    loadTheme();
  }, []);

  return (
    <div className="section">
      {notificationTheme && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          background: notificationTheme.gradient,
          border: `2px solid ${notificationTheme.primary}`,
          borderRadius: 'var(--md-shape-corner-large)',
          boxShadow: 'var(--md-elevation-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              fontSize: '1.25rem',
              color: '#ffffff',
              fontWeight: 'bold',
            }}>
              ✓
            </span>
            <div>
              <p style={{
                margin: '0 0 0.25rem 0',
                fontSize: 'var(--md-font-body-medium)',
                fontWeight: 600,
                color: '#ffffff',
              }}>
                Theme Applied
              </p>
              <p style={{
                margin: 0,
                fontSize: 'var(--md-font-body-small)',
                color: 'rgba(255, 255, 255, 0.9)',
              }}>
                Refresh the page to fully apply <strong>{notificationTheme.name}</strong> theme
              </p>
            </div>
          </div>
          <button
            onClick={() => setNotificationTheme(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Palette size={18} style={{ color: 'var(--md-primary)' }} />
        <h2 style={{ fontSize: 'var(--md-font-headline-small)', fontWeight: 600, margin: 0, color: 'var(--md-on-surface)' }}>
          Color Themes
        </h2>
      </div>

      <p style={{ fontSize: 'var(--md-font-body-medium)', color: 'var(--md-on-surface-variant)', marginBottom: '1.5rem' }}>
        Select a color preset below to change the theme
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {colorPresets.map((theme) => (
          <button
            key={theme.id}
            disabled={false}
            onClick={() => applyTheme(theme.id)}
            style={{
              padding: '1rem',
              background: theme.id === currentTheme
                ? `linear-gradient(135deg, ${theme.colors.primaryContainer}, ${theme.colors.primaryContainer})`
                : 'var(--md-surface-container-low)',
              border: theme.id === currentTheme
                ? `2px solid ${theme.primary}` 
                : '1px solid var(--md-outline-variant)',
              borderRadius: 'var(--md-shape-corner-large)',
              cursor: 'pointer',
              opacity: 1,
              transition: 'all var(--md-motion-duration-short3) var(--md-motion-easing-standard)',
              boxShadow: theme.id === currentTheme
                ? 'var(--md-elevation-3)' 
                : 'var(--md-elevation-1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: theme.gradient,
                  border: '2px solid var(--md-surface)',
                  boxShadow: `0 0 12px ${theme.primary}60`,
                  opacity: theme.id === currentTheme ? 1 : 0.6,
                }}
              />
              <span style={{
                fontSize: 'var(--md-font-label-large)',
                fontWeight: 600,
                color: 'var(--md-on-surface)',
              }}>
                {theme.name}
              </span>
            </div>
            <span style={{
              fontSize: 'var(--md-font-label-small)',
              color: 'var(--md-on-surface-variant)',
              textAlign: 'left'
            }}>
              {theme.description}
            </span>
            {theme.id === currentTheme && (
              <div style={{
                marginTop: '0.5rem',
                padding: '0.25rem 0.75rem',
                background: theme.gradient,
                borderRadius: 'var(--md-shape-corner-full)',
                fontSize: 'var(--md-font-label-small)',
                fontWeight: 600,
                color: '#ffffff',
              }}>
                ✓ Active
              </div>
            )}
          </button>
        ))}
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'var(--md-surface-container-low)',
        borderRadius: 'var(--md-shape-corner-large)',
        border: '1px solid var(--md-outline-variant)',
      }}>
        <p style={{
          fontSize: 'var(--md-font-body-small)',
          color: 'var(--md-on-surface-variant)',
          margin: 0,
          lineHeight: 1.5
        }}>
          💡 The selected theme colors will be applied throughout the entire UI interface, 
          including buttons, highlights, active states, and gradients.
        </p>
      </div>
    </div>
  );
};

export default Themes;
