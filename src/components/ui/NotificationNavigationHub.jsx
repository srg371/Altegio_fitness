import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationNavigationHub = ({ userRole = 'admin', onNavigate }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  // Mock notification data based on user role
  const mockNotifications = {
    admin: [
      {
        id: 1,
        type: 'warning',
        category: 'membership',
        title: 'Membership Expiring Soon',
        message: '5 memberships expire within 3 days',
        time: '2 hours ago',
        unread: true,
        priority: 'high',
        actionPath: '/membership-management',
        actionLabel: 'Review Memberships'
      },
      {
        id: 2,
        type: 'success',
        category: 'payment',
        title: 'Payment Received',
        message: 'Monthly payment from Maria Petrov confirmed',
        time: '4 hours ago',
        unread: true,
        priority: 'medium',
        actionPath: '/sales-analytics-dashboard',
        actionLabel: 'View Analytics'
      },
      {
        id: 3,
        type: 'error',
        category: 'schedule',
        title: 'Session Conflict',
        message: 'Double booking detected for Trainer Alex',
        time: '6 hours ago',
        unread: true,
        priority: 'high',
        actionPath: '/weekly-schedule-management',
        actionLabel: 'Resolve Conflict'
      },
      {
        id: 4,
        type: 'info',
        category: 'retention',
        title: 'Client Engagement Alert',
        message: '3 clients haven\'t attended in 2 weeks',
        time: '1 day ago',
        unread: false,
        priority: 'medium',
        actionPath: '/client-retention-management',
        actionLabel: 'View Details'
      }
    ],
    trainer: [
      {
        id: 1,
        type: 'info',
        category: 'schedule',
        title: 'Session Reminder',
        message: 'Training with John Smith in 30 minutes',
        time: '30 minutes',
        unread: true,
        priority: 'high',
        actionPath: '/trainer-session-interface',
        actionLabel: 'View Session'
      },
      {
        id: 2,
        type: 'success',
        category: 'payment',
        title: 'Payment Confirmed',
        message: 'Session payment received from client',
        time: '2 hours ago',
        unread: true,
        priority: 'low',
        actionPath: '/trainer-session-interface',
        actionLabel: 'View Payments'
      }
    ],
    client: [
      {
        id: 1,
        type: 'success',
        category: 'booking',
        title: 'Session Confirmed',
        message: 'Your training session tomorrow at 10:00 AM is confirmed',
        time: '1 hour ago',
        unread: true,
        priority: 'medium',
        actionPath: '/client-booking-interface',
        actionLabel: 'View Booking'
      },
      {
        id: 2,
        type: 'warning',
        category: 'membership',
        title: 'Membership Reminder',
        message: 'Your membership expires in 7 days',
        time: '1 day ago',
        unread: false,
        priority: 'medium',
        actionPath: '/membership-management',
        actionLabel: 'Renew Now'
      }
    ]
  };

  useEffect(() => {
    setNotifications(mockNotifications[userRole] || []);
  }, [userRole]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'info': return 'text-primary';
      default: return 'text-secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'membership': return 'CreditCard';
      case 'payment': return 'DollarSign';
      case 'schedule': return 'Calendar';
      case 'retention': return 'UserCheck';
      case 'booking': return 'BookOpen';
      default: return 'Bell';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notification.unread;
    return notification.category === filter;
  });

  const unreadCount = notifications.filter(n => n.unread).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && n.unread).length;

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, unread: false } : n
      )
    );

    // Navigate to relevant page
    if (onNavigate && notification.actionPath) {
      onNavigate(notification.actionPath);
      setIsOpen(false);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  const categories = [...new Set(notifications.map(n => n.category))];

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-secondary-50 transition-smooth"
      >
        <Icon name="Bell" size={20} className="text-text-secondary" />
        {unreadCount > 0 && (
          <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium ${
            highPriorityCount > 0 ? 'bg-error animate-pulse' : 'bg-primary'
          }`}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notifications Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-surface border border-border rounded-lg shadow-lg z-60 animate-fade-in">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-text-primary">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:bg-primary-50 px-2 py-1"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="p-1"
                >
                  <Icon name="X" size={16} className="text-text-secondary" />
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'ghost'}
                onClick={() => setFilter('all')}
                className="text-xs px-3 py-1 h-auto"
              >
                All ({notifications.length})
              </Button>
              <Button
                variant={filter === 'unread' ? 'primary' : 'ghost'}
                onClick={() => setFilter('unread')}
                className="text-xs px-3 py-1 h-auto"
              >
                Unread ({unreadCount})
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={filter === category ? 'primary' : 'ghost'}
                  onClick={() => setFilter(category)}
                  className="text-xs px-3 py-1 h-auto capitalize"
                >
                  <Icon name={getCategoryIcon(category)} size={12} className="mr-1" />
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="text-text-muted mx-auto mb-2" />
                <p className="text-text-secondary">No notifications</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b border-border hover:bg-secondary-50 cursor-pointer transition-smooth ${
                    notification.unread ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Icon
                        name={getNotificationIcon(notification.type)}
                        size={18}
                        className={getNotificationColor(notification.type)}
                      />
                      <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-text-primary text-sm">
                          {notification.title}
                        </p>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-text-muted text-xs">
                          {notification.time}
                        </p>
                        {notification.actionLabel && (
                          <span className="text-xs text-primary font-medium">
                            {notification.actionLabel} →
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="p-3 border-t border-border">
              <Button variant="ghost" className="w-full text-sm">
                <Icon name="ExternalLink" size={16} className="mr-2" />
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationNavigationHub;