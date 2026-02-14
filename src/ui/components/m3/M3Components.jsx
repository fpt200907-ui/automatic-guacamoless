/**
 * M3 Visual Component Examples
 * Demonstrates how to create components using Material Design 3
 */

import React from 'react';

// M3 Button Component
export const M3Button = ({ children, variant = 'filled', size = 'medium', disabled = false, ...props }) => {
  const baseClasses = 'md-button';
  const variantClass = `md-button--${variant}`;
  const sizeClass = `md-button--${size}`;
  const disabledClass = disabled ? 'md-button--disabled' : '';

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${disabledClass}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// M3 Card Component
export const M3Card = ({ children, elevation = 1, interactive = false, ...props }) => {
  return (
    <div
      className={`md-card md-card--elevation-${elevation} ${
        interactive ? 'md-card--interactive' : ''
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

// M3 Input Component
export const M3Input = ({ label, error = false, disabled = false, ...props }) => {
  return (
    <div className="md-input-wrapper">
      {label && <label className="md-input-label">{label}</label>}
      <input
        className={`md-input ${error ? 'md-input--error' : ''} ${
          disabled ? 'md-input--disabled' : ''
        }`}
        disabled={disabled}
        {...props}
      />
      {error && <span className="md-input-error">{error}</span>}
    </div>
  );
};

// M3 IconButton Component
export const M3IconButton = ({ icon: Icon, size = 'medium', disabled = false, ...props }) => {
  return (
    <button className={`md-icon-button md-icon-button--${size}`} disabled={disabled} {...props}>
      <Icon size={'1.25rem'} />
    </button>
  );
};

// M3 ToggleButton Component
export const M3ToggleButton = ({ children, selected = false, size = 'medium', ...props }) => {
  return (
    <button
      className={`md-toggle-button md-toggle-button--${size} ${
        selected ? 'md-toggle-button--selected' : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

// M3 Chip Component
export const M3Chip = ({ label, onDelete, disabled = false, icon: Icon = null, ...props }) => {
  return (
    <div className={`md-chip ${disabled ? 'md-chip--disabled' : ''}`} {...props}>
      {Icon && <Icon size="1rem" className="md-chip-icon" />}
      <span className="md-chip-label">{label}</span>
      {onDelete && (
        <button className="md-chip-delete" onClick={onDelete}>
          ×
        </button>
      )}
    </div>
  );
};

// M3 FAB (Floating Action Button) Component
export const M3FAB = ({ icon: Icon, size = 'medium', extended = false, label = '', ...props }) => {
  return (
    <button
      className={`md-fab md-fab--${size} ${extended ? 'md-fab--extended' : ''}`}
      {...props}
    >
      {Icon && <Icon size="1.5rem" />}
      {extended && label && <span>{label}</span>}
    </button>
  );
};

// M3 Checkbox Component (already implemented in styles.css)
export const M3Checkbox = ({ checked = false, label, disabled = false, ...props }) => {
  return (
    <label className="md-checkbox">
      <input
        type="checkbox"
        className="md-checkbox-input"
        checked={checked}
        disabled={disabled}
        {...props}
      />
      {label && <span className="md-checkbox-label">{label}</span>}
    </label>
  );
};

// M3 Switch Component
export const M3Switch = ({ checked = false, disabled = false, label = '', ...props }) => {
  return (
    <div className="md-switch-wrapper">
      <input
        type="checkbox"
        className={`md-switch ${checked ? 'md-switch--checked' : ''} ${
          disabled ? 'md-switch--disabled' : ''
        }`}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      {label && <span className="md-switch-label">{label}</span>}
    </div>
  );
};

// M3 TextField Component (advanced)
export const M3TextField = ({
  label,
  value,
  onChange,
  type = 'text',
  error = false,
  helperText = '',
  disabled = false,
  multiline = false,
  ...props
}) => {
  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className="md-text-field">
      {label && <label className="md-text-field-label">{label}</label>}
      <InputComponent
        type={type}
        value={value}
        onChange={onChange}
        className={`md-text-field-input ${error ? 'md-text-field-input--error' : ''} ${
          disabled ? 'md-text-field-input--disabled' : ''
        }`}
        disabled={disabled}
        {...props}
      />
      {(error || helperText) && (
        <span className={`md-text-field-helper ${error ? 'md-text-field-helper--error' : ''}`}>
          {helperText || (error ? 'Invalid input' : '')}
        </span>
      )}
    </div>
  );
};

// M3 Divider Component
export const M3Divider = () => <div className="md-divider" />;

// M3 Tooltip Component
export const M3Tooltip = ({ content, children, position = 'top' }) => {
  return (
    <div className={`md-tooltip-wrapper md-tooltip-wrapper--${position}`}>
      {children}
      <div className="md-tooltip">{content}</div>
    </div>
  );
};

// M3 Badge Component
export const M3Badge = ({ content, children, position = 'top-right' }) => {
  return (
    <div className={`md-badge-wrapper md-badge-wrapper--${position}`}>
      {children}
      <span className="md-badge">{content}</span>
    </div>
  );
};

export default {
  M3Button,
  M3Card,
  M3Input,
  M3IconButton,
  M3ToggleButton,
  M3Chip,
  M3FAB,
  M3Checkbox,
  M3Switch,
  M3TextField,
  M3Divider,
  M3Tooltip,
  M3Badge,
};
