import React from 'react';
import './Notification.css';

const Notification = ({ message, isVisible }) => {
  return (
    <div className={`notification ${isVisible ? 'show' : ''}`}>
      <div className="notification-content">
        <div className="check-icon">✓</div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;