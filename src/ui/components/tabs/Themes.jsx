import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-preact';
import { shadowRoot } from '@/core/outer.js';

/**
 * Themes Component - Material Design 3 themed UI
 * 
 * Features:
 * - Clean CSS variable cascade (no DOM manipulation)
 * - Support for shadow DOM and regular DOM
 * - Professional color presets with developer-focused default
 * - Production-ready implementation
 */

const Themes = ({ settings, onSettingChange }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('surminus-theme') || 'teal-moss';
  });
  const [notificationTheme, setNotificationTheme] = useState(null);

  /**
   * Color Presets - Professional, modern palette
   * Default theme: Dark teal → moss green (developer-focused, muted, no neon)
   */
  const colorPresets = [
    {
      id: 'teal-moss',
      name: 'Teal Moss',
      primary: '#5a9b9f',
      gradient: 'linear-gradient(180deg, #1f7f8c 0%, #4f6f52 100%)',
      description: 'Dark teal → moss green. Developer vibe, muted and sophisticated',
      colors: {
        primary: '#5a9b9f',
        primaryContainer: 'rgba(90, 155, 159, 0.12)',
        stateHover: 'rgba(90, 155, 159, 0.08)',
        stateFocus: 'rgba(90, 155, 159, 0.12)',
      }
    },
    {
      id: 'slate-blue',
      name: 'Slate Blue',
      primary: '#6b7a8f',
      gradient: 'linear-gradient(180deg, #3d4a5c 0%, #5a6b7f 100%)',
      description: 'Cool slate with blue undertone. Professional and calm',
      colors: {
        primary: '#6b7a8f',
        primaryContainer: 'rgba(107, 122, 143, 0.12)',
        stateHover: 'rgba(107, 122, 143, 0.08)',
        stateFocus: 'rgba(107, 122, 143, 0.12)',
      }
    },
    {
      id: 'forest-green',
      name: 'Forest Green',
      primary: '#5a8f6a',
      gradient: 'linear-gradient(180deg, #2d5a3d 0%, #6b8f6f 100%)',
      description: 'Deep forest tones. Natural and grounded',
      colors: {
        primary: '#5a8f6a',
        primaryContainer: 'rgba(90, 143, 106, 0.12)',
        stateHover: 'rgba(90, 143, 106, 0.08)',
        stateFocus: 'rgba(90, 143, 106, 0.12)',
      }
    },
    {
      id: 'warm-sand',
      name: 'Warm Sand',
      primary: '#a89968',
      gradient: 'linear-gradient(180deg, #7a6b4a 0%, #c9b88a 100%)',
      description: 'Warm earthy tones. Comfortable and inviting',
      colors: {
        primary: '#a89968',
        primaryContainer: 'rgba(168, 153, 104, 0.12)',
        stateHover: 'rgba(168, 153, 104, 0.08)',
        stateFocus: 'rgba(168, 153, 104, 0.12)',
      }
    },
    {
      id: 'dusty-rose',
      name: 'Dusty Rose',
      primary: '#a77a8f',
      gradient: 'linear-gradient(180deg, #7a5a6f 0%, #b89db0 100%)',
      description: 'Muted rose tones. Elegant and sophisticated',
      colors: {
        primary: '#a77a8f',
        primaryContainer: 'rgba(167, 122, 143, 0.12)',
        stateHover: 'rgba(167, 122, 143, 0.08)',
        stateFocus: 'rgba(167, 122, 143, 0.12)',
      }
    },
    {
      id: 'ocean-depth',
      name: 'Ocean Depth',
      primary: '#5a7fa5',
      gradient: 'linear-gradient(180deg, #2d4a6b 0%, #7a9fb5 100%)',
      description: 'Deep ocean blues. Serene and focused',
      colors: {
        primary: '#5a7fa5',
        primaryContainer: 'rgba(90, 127, 165, 0.12)',
        stateHover: 'rgba(90, 127, 165, 0.08)',
        stateFocus: 'rgba(90, 127, 165, 0.12)',
      }
    },
    {
      id: 'copper-bronze',
      name: 'Copper Bronze',
      primary: '#8f6a5a',
      gradient: 'linear-gradient(180deg, #5a4a3d 0%, #a8845a 100%)',
      description: 'Warm metallic tones. Rich and distinctive',
      colors: {
        primary: '#8f6a5a',
        primaryContainer: 'rgba(143, 106, 90, 0.12)',
        stateHover: 'rgba(143, 106, 90, 0.08)',
        stateFocus: 'rgba(143, 106, 90, 0.12)',
      }
    },
    {
      id: 'lavender-mute',
      name: 'Muted Lavender',
      primary: '#8f7fa5',
      gradient: 'linear-gradient(180deg, #5a4a7a 0%, #a89fc9 100%)',
      description: 'Soft lavender tones. Calming and refined',
      colors: {
        primary: '#8f7fa5',
        primaryContainer: 'rgba(143, 127, 165, 0.12)',
        stateHover: 'rgba(143, 127, 165, 0.08)',
        stateFocus: 'rgba(143, 127, 165, 0.12)',
      }
    },
    {
      id: 'sage-green',
      name: 'Sage Green',
      primary: '#7a8f6a',
      gradient: 'linear-gradient(180deg, #4a5a3d 0%, #9aaf8f 100%)',
      description: 'Soft sage tones. Peaceful and harmonious',
      colors: {
        primary: '#7a8f6a',
        primaryContainer: 'rgba(122, 143, 106, 0.12)',
        stateHover: 'rgba(122, 143, 106, 0.08)',
        stateFocus: 'rgba(122, 143, 106, 0.12)',
      }
    },
  ];

  /**
   * Convert hex to RGB object
   */
  const hexToRgbObj = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 90, g: 155, b: 159 }; // Fallback to teal-moss
  };

  /**
   * Apply theme to document and shadow DOM
   * Uses CSS variable cascade instead of DOM manipulation
   */
  const applyTheme = (themeId) => {
    const theme = colorPresets.find(t => t.id === themeId);
    if (!theme) return;

    const { r, g, b } = hexToRgbObj(theme.colors.primary);

    // Helper to set CSS variables on root element
    const setCSSVars = (element) => {
      if (!element?.style) return;
      element.style.setProperty('--md-primary', theme.colors.primary, 'important');
      element.style.setProperty('--md-primary-container', theme.colors.primaryContainer, 'important');
      element.style.setProperty('--md-state-hover', theme.colors.stateHover, 'important');
      element.style.setProperty('--md-state-focus', theme.colors.stateFocus, 'important');
      element.style.setProperty('--md-state-pressed', theme.colors.stateFocus, 'important');
      element.style.setProperty('--md-state-dragged', `rgba(${r}, ${g}, ${b}, 0.16)`, 'important');
      element.style.setProperty('--md-scrollbar-thumb', `rgba(${r}, ${g}, ${b}, 0.8)`, 'important');
      element.style.setProperty('--md-scrollbar-thumb-hover', `rgba(${r}, ${g}, ${b}, 1)`, 'important');
      element.style.setProperty('--md-primary-rgb', `${r}, ${g}, ${b}`, 'important');
      element.style.setProperty('--md-gradient', theme.gradient, 'important');
    };

    // Apply to document root
    setCSSVars(document.documentElement);

    // Apply to main UI element (allows CSS to cascade to children)
    const uiElement = shadowRoot?.getElementById('ui') || document.getElementById('ui');
    if (uiElement) {
      setCSSVars(uiElement);
    }

    // Apply to shadow DOM host if available
    if (shadowRoot?.host) {
      setCSSVars(shadowRoot.host);
    }

    // Update scrollbar styles in head (can't use CSS variables with ::-webkit-scrollbar)
    updateScrollbarStyles(r, g, b);

    // Update shadow DOM styles if available
    updateShadowDOMTheme(theme, r, g, b);

    // Save to localStorage
    localStorage.setItem('surminus-theme', themeId);
    setCurrentTheme(themeId);

    // Show notification
    setNotificationTheme(theme);
    setTimeout(() => setNotificationTheme(null), 5000);
  };

  /**
   * Update scrollbar styles in document head
   * Scrollbars can't use CSS variables, so we inject specific styles
   */
  const updateScrollbarStyles = (r, g, b) => {
    let scrollbarStyleId = 'surminus-scrollbar-theme';
    let existing = document.head.querySelector(`style#${scrollbarStyleId}`);
    if (existing) existing.remove();

    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.id = scrollbarStyleId;
    scrollbarStyle.textContent = `
      #ui ::-webkit-scrollbar-thumb {
        background: rgba(${r}, ${g}, ${b}, 0.8) !important;
      }
      #ui ::-webkit-scrollbar-thumb:hover {
        background: rgba(${r}, ${g}, ${b}, 1) !important;
      }
      #ui * {
        scrollbar-color: rgba(${r}, ${g}, ${b}, 0.8) rgba(255, 255, 255, 0.05) !important;
      }
    `;
    document.head.appendChild(scrollbarStyle);
  };

  /**
   * Update shadow DOM theme styles
   * Provides CSS variable fallbacks in shadow DOM context
   */
  const updateShadowDOMTheme = (theme, r, g, b) => {
    if (!shadowRoot) return;

    let styleId = 'surminus-shadow-theme';
    let existing = shadowRoot.querySelector(`style#${styleId}`);
    if (existing) existing.remove();

    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      :host, * {
        --md-primary: ${theme.colors.primary} !important;
        --md-primary-container: ${theme.colors.primaryContainer} !important;
        --md-state-hover: ${theme.colors.stateHover} !important;
        --md-state-focus: ${theme.colors.stateFocus} !important;
        --md-state-pressed: ${theme.colors.stateFocus} !important;
        --md-state-dragged: rgba(${r}, ${g}, ${b}, 0.16) !important;
        --md-scrollbar-thumb: rgba(${r}, ${g}, ${b}, 0.8) !important;
        --md-scrollbar-thumb-hover: rgba(${r}, ${g}, ${b}, 1) !important;
        --md-gradient: ${theme.gradient} !important;
      }
    `;
    shadowRoot.insertBefore(styleEl, shadowRoot.firstChild);
  };

  /**
   * Initialize theme on component mount
   * Applies saved theme or default (teal-moss) with retry logic
   */
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    const initTheme = () => {
      // Check if UI element exists (indicates DOM is ready)
      const uiElement = shadowRoot?.getElementById('ui') || document.getElementById('ui');

      if (uiElement) {
        // DOM is ready, apply theme
        const savedTheme = localStorage.getItem('surminus-theme') || 'teal-moss';
        applyTheme(savedTheme);
      } else if (attempts < maxAttempts) {
        // Retry if DOM not ready
        attempts++;
        setTimeout(initTheme, 100);
      }
    };

    initTheme();
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
                Theme Applied!
              </p>
              <p style={{
                margin: 0,
                fontSize: 'var(--md-font-body-small)',
                color: 'rgba(255, 255, 255, 0.9)',
              }}>
                <strong>{notificationTheme.name}</strong> theme is now active
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
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(1.15)';
            }}
            onMouseLeave={(e) => {
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
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              if (theme.id !== currentTheme) {
                e.currentTarget.style.background = 'var(--md-surface-container)';
                e.currentTarget.style.borderColor = theme.primary;
                e.currentTarget.style.boxShadow = 'var(--md-elevation-2)';
              }
            }}
            onMouseLeave={(e) => {
              if (theme.id !== currentTheme) {
                e.currentTarget.style.background = 'var(--md-surface-container-low)';
                e.currentTarget.style.borderColor = 'var(--md-outline-variant)';
                e.currentTarget.style.boxShadow = 'var(--md-elevation-1)';
              }
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
