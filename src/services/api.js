export const fetchUnreadNotifications = async () => {
    try {
      const response = await fetch('http://localhost:3002/notifications/unread-counts');
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch unread notifications');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export const markNotificationsAsRead = async (notifications) => {
    try {
      const response = await fetch('http://localhost:3002/notifications/mark-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notifications }),
      });
      if (response.ok) {
        console.log('Notifications marked as read');
      } else {
        console.error('Failed to mark notifications as read');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  