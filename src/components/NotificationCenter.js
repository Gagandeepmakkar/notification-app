import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { fetchUnreadNotifications, markNotificationsAsRead } from '../services/api';
import { setupWebSocket } from '../services/websocket';
import "../App.css";

function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchUnreadNotifications();
      if (data) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    };

    loadNotifications();

    const ws = setupWebSocket(newNotification => {
      setNotifications(prevNotifications => [...prevNotifications, newNotification]);
      setUnreadCount(prevCount => prevCount + 1);
    });

    return () => {
      ws.close();
    };
  }, []);

  const handleBellIconClick = () => {
    setShowNotifications(prevState => !prevState);
    if (unreadCount > 0 && showNotifications) {
      markNotificationsAsRead(notifications);
      setUnreadCount(0);
      setNotifications([]);
    }
  };

  return (
    <div className="NotificationCenter">
      <h1>Welcome to the Notification Center !!!</h1>
      <div className="notification-icon" onClick={handleBellIconClick}>
        <FontAwesomeIcon icon={faBell} size="3x" />
        {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
      </div>
      {showNotifications && (
        <div className="notification-dropdown">
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>
                <strong>User ID:</strong> {notification.userId}, <strong>Notification:</strong> {notification.type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationCenter;
