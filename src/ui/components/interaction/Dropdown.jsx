import React, { useState } from 'react';

const Dropdown = ({ id, label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <label htmlFor={id} className="dropdown-label">
        {label}
      </label>
      <div className="dropdown-wrapper">
        <button
          id={id}
          className="dropdown-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="dropdown-value">
            {options.find((o) => o.value === value)?.label || value}
          </span>
          <svg
            className={`dropdown-chevron ${isOpen ? 'open' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option) => (
              <button
                key={option.value}
                className={`dropdown-option ${
                  value === option.value ? 'selected' : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
