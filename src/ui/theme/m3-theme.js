/**
 * Material Design 3 Theme System for SurMinus
 * Provides a comprehensive color system, elevation tokens, and design system utilities
 */

export const M3_COLORS = {
  // Primary color (Golden Yellow - game-themed)
  primary: '#ffb800',
  onPrimary: '#131313',
  primaryContainer: 'rgba(255, 184, 0, 0.15)',

  // Secondary (Cyan)
  secondary: '#7dd5e6',
  secondaryContainer: 'rgba(125, 213, 230, 0.15)',

  // Tertiary (Orange)
  tertiary: '#ffc66d',

  // Error (Red)
  error: '#f28482',

  // Surface colors
  surface: '#131313',
  surfaceDim: '#0a0a0a',
  surfaceBright: '#2a2a2a',
  surfaceContainerLowest: '#0f0f0f',
  surfaceContainerLow: '#1a1a1a',
  surfaceContainer: '#1e1e1e',
  surfaceContainerHigh: '#282828',
  surfaceContainerHighest: '#333333',
  onSurface: '#ffffff',
  onSurfaceVariant: 'rgba(255, 255, 255, 0.7)',

  // Outline
  outline: 'rgba(255, 255, 255, 0.2)',
  outlineVariant: 'rgba(255, 255, 255, 0.1)',
};

export const M3_ELEVATION = {
  level0: '0px 0px 0px rgba(0, 0, 0, 0)',
  level1: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
  level2: '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
  level3: '0px 10px 13px rgba(0, 0, 0, 0.19), 0px 6px 13px rgba(0, 0, 0, 0.23)',
  level4: '0px 15px 25px rgba(0, 0, 0, 0.15), 0px 15px 27px rgba(0, 0, 0, 0.26)',
  level5: '0px 20px 33px rgba(0, 0, 0, 0.2), 0px 0px 27px rgba(0, 0, 0, 0.12)',
};

export const M3_STATE_LAYERS = {
  hover: 'rgba(255, 184, 0, 0.08)',
  focus: 'rgba(255, 184, 0, 0.12)',
  pressed: 'rgba(255, 184, 0, 0.12)',
  dragged: 'rgba(255, 184, 0, 0.16)',
};

export const M3_MOTION = {
  durations: {
    short1: '50ms',
    short2: '100ms',
    short3: '150ms',
    short4: '200ms',
    medium1: '250ms',
    medium2: '300ms',
    medium3: '350ms',
    medium4: '400ms',
    long1: '450ms',
    long2: '500ms',
    long3: '550ms',
    long4: '600ms',
  },
  easings: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    standardAccelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    standardDecelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  },
};

export const M3_SHAPES = {
  none: '0',
  extraSmall: '0.25rem',
  small: '0.5rem',
  medium: '0.75rem',
  large: '1rem',
  extraLarge: '1.5rem',
  full: '9999px',
};

export const M3_TYPOGRAPHY = {
  displayLarge: '3.5rem',
  displayMedium: '2.8rem',
  displaySmall: '2.25rem',
  headlineLarge: '2rem',
  headlineMedium: '1.75rem',
  headlineSmall: '1.5rem',
  titleLarge: '1.375rem',
  titleMedium: '1rem',
  titleSmall: '0.875rem',
  bodyLarge: '1rem',
  bodyMedium: '0.875rem',
  bodySmall: '0.75rem',
  labelLarge: '0.875rem',
  labelMedium: '0.75rem',
  labelSmall: '0.6875rem',
};

export const M3_SPACING = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
};

/**
 * Create a CSS variable declaration for M3 theme
 * @returns {void} Updates document CSS variables
 */
export function applyM3Theme() {
  const root = document.getElementById('ui');
  if (!root) return;

  const style = root.style;

  // Apply colors
  Object.entries(M3_COLORS).forEach(([key, value]) => {
    style.setProperty(`--md-${camelToKebab(key)}`, value);
  });

  // Apply elevations
  Object.entries(M3_ELEVATION).forEach(([key, value]) => {
    style.setProperty(`--md-elevation-${key.replace('level', '')}`, value);
  });

  // Apply state layers
  Object.entries(M3_STATE_LAYERS).forEach(([key, value]) => {
    style.setProperty(`--md-state-${key}`, value);
  });

  // Apply motion
  Object.entries(M3_MOTION.durations).forEach(([key, value]) => {
    style.setProperty(`--md-motion-duration-${key}`, value);
  });

  Object.entries(M3_MOTION.easings).forEach(([key, value]) => {
    style.setProperty(`--md-motion-easing-${camelToKebab(key)}`, value);
  });

  // Apply shapes
  Object.entries(M3_SHAPES).forEach(([key, value]) => {
    style.setProperty(`--md-shape-corner-${camelToKebab(key)}`, value);
  });

  // Apply typography
  Object.entries(M3_TYPOGRAPHY).forEach(([key, value]) => {
    style.setProperty(`--md-font-${camelToKebab(key)}`, value);
  });

  // Apply spacing
  Object.entries(M3_SPACING).forEach(([key, value]) => {
    style.setProperty(`--md-spacing-${key}`, value);
  });
}

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Create alternative M3 color schemes (for future use)
 */
export const M3_THEMES = {
  // Light theme variant
  light: {
    primary: '#5a8a3f',
    onPrimary: '#ffffff',
    primaryContainer: 'rgba(90, 138, 63, 0.15)',
    surface: '#fffbfe',
    surfaceVariant: '#ece7f0',
    onSurface: '#1c1b1f',
    onSurfaceVariant: '#49454e',
    outline: '#79747e',
    outlineVariant: '#cac7d0',
  },

  // Dark theme (current - optimized)
  dark: M3_COLORS,

  // High contrast variant
  highContrast: {
    ...M3_COLORS,
    primary: '#7aff7d',
    onPrimary: '#000000',
    error: '#ff6b6b',
  },
};

export default {
  COLORS: M3_COLORS,
  ELEVATION: M3_ELEVATION,
  STATE_LAYERS: M3_STATE_LAYERS,
  MOTION: M3_MOTION,
  SHAPES: M3_SHAPES,
  TYPOGRAPHY: M3_TYPOGRAPHY,
  SPACING: M3_SPACING,
  THEMES: M3_THEMES,
  applyM3Theme,
};
