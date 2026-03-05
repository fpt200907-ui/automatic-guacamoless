import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, InfoIcon, X } from 'lucide-preact';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeConfig = {
    success: {
      bgColor: '#2e7d32',
      borderColor: '#4caf50',
      icon: CheckCircle2,
    },
    error: {
      bgColor: '#c62828',
      borderColor: '#f44336',
      icon: AlertCircle,
    },
    info: {
      bgColor: '#1565c0',
      borderColor: '#2196f3',
      icon: InfoIcon,
    },
  };

  const config = typeConfig[type] || typeConfig.success;
  const IconComponent = config.icon;

  const containerStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '999999',
    minWidth: '300px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '0.875rem',
    fontFamily: 'GothamPro, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    backgroundColor: config.bgColor,
    borderLeft: `4px solid ${config.borderColor}`,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    animation: 'toastSlideIn 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
  };

  return (
    <>
      <style>{`
        @keyframes toastSlideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes toastSlideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `}</style>
      <div style={containerStyle}>
        <IconComponent size={20} strokeWidth={2} style={{ flexShrink: 0 }} />
        <span style={{ flex: 1, wordWrap: 'break-word' }}>{message}</span>
      </div>
    </>
  );
};

export default Toast;
