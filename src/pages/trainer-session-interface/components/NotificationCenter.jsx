import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onDismiss, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'session_reminder': return 'Clock';
      case 'payment_received': return 'CreditCard';
      case 'payment_overdue': return 'AlertTriangle';
      case 'session_cancelled': return 'XCircle';
      case 'new_booking': return 'Calendar';
      case 'membership_expiring': return 'AlertCircle';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'session_reminder': return 'text-primary';
      case 'payment_received': return 'text-success';
      case 'payment_overdue': return 'text-error';
      case 'session_cancelled': return 'text-error';
      case 'new_booking': return 'text-success';
      case 'membership_expiring': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getNotificationTitle = (type) => {
    switch (type) {
      case 'session_reminder': return 'Напоминание о тренировке';
      case 'payment_received': return 'Платеж получен';
      case 'payment_overdue': return 'Просроченный платеж';
      case 'session_cancelled': return 'Тренировка отменена';
      case 'new_booking': return 'Новая запись';
      case 'membership_expiring': return 'Абонемент истекает';
      default: return 'Уведомление';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    if (notification.actionType && onAction) {
      onAction(notification.actionType, notification.actionData);
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Только что';
    if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ч назад`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} дн назад`;
  };

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
          <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
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
              <h3 className="font-semibold text-text-primary">Уведомления</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => notifications.forEach(n => !n.read && onMarkAsRead(n.id))}
                    className="text-xs text-primary hover:bg-primary-50 px-2 py-1"
                  >
                    Прочитать все
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
                Все ({notifications.length})
              </Button>
              <Button
                variant={filter === 'unread' ? 'primary' : 'ghost'}
                onClick={() => setFilter('unread')}
                className="text-xs px-3 py-1 h-auto"
              >
                Непрочитанные ({unreadCount})
              </Button>
              <Button
                variant={filter === 'session_reminder' ? 'primary' : 'ghost'}
                onClick={() => setFilter('session_reminder')}
                className="text-xs px-3 py-1 h-auto"
              >
                Тренировки
              </Button>
              <Button
                variant={filter === 'payment_received' ? 'primary' : 'ghost'}
                onClick={() => setFilter('payment_received')}
                className="text-xs px-3 py-1 h-auto"
              >
                Платежи
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="text-text-muted mx-auto mb-2" />
                <p className="text-text-secondary">Нет уведомлений</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b border-border hover:bg-secondary-50 cursor-pointer transition-smooth ${
                    !notification.read ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      name={getNotificationIcon(notification.type)}
                      size={18}
                      className={getNotificationColor(notification.type)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-text-primary text-sm">
                          {getNotificationTitle(notification.type)}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-text-muted text-xs">
                          {getTimeAgo(notification.timestamp)}
                        </p>
                        {notification.actionText && (
                          <span className="text-xs text-primary font-medium">
                            {notification.actionText} →
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismiss(notification.id);
                      }}
                      className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="X" size={12} className="text-text-muted" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="p-3 border-t border-border">
              <Button variant="ghost" className="w-full text-sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки уведомлений
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;