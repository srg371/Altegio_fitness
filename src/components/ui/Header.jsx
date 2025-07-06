import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Membership Expiring',
      message: 'John Smith\'s membership expires in 3 days',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      type: 'success',
      title: 'Payment Received',
      message: 'Monthly payment from Maria Petrov confirmed',
      time: '4 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'error',
      title: 'Session Cancelled',
      message: 'Training session with Alex cancelled',
      time: '1 day ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-secondary';
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logout clicked');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border nav-shadow">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Dumbbell" size={24} color="white" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-text-primary font-inter">
              Altegio Fitness
            </h1>
            <span className="text-xs text-text-secondary font-inter">
              Manager
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
              <input
                type="text"
                placeholder="Search members, trainers..."
                className="pl-10 pr-4 py-2 w-64 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleNotificationClick}
              className="relative p-2 hover:bg-secondary-50 transition-smooth"
            >
              <Icon name="Bell" size={20} className="text-text-secondary" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg z-60 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border hover:bg-secondary-50 cursor-pointer transition-smooth ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon
                          name={getNotificationIcon(notification.type)}
                          size={18}
                          className={getNotificationColor(notification.type)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-text-primary text-sm">
                            {notification.title}
                          </p>
                          <p className="text-text-secondary text-sm mt-1">
                            {notification.message}
                          </p>
                          <p className="text-text-muted text-xs mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" className="w-full text-sm">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleProfileClick}
              className="flex items-center space-x-2 p-2 hover:bg-secondary-50 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-text-primary">Admin User</p>
                <p className="text-xs text-text-secondary">Administrator</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-60 animate-fade-in">
                <div className="p-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm p-2 hover:bg-secondary-50"
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Profile Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm p-2 hover:bg-secondary-50"
                  >
                    <Icon name="Settings" size={16} className="mr-2" />
                    Preferences
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm p-2 hover:bg-secondary-50"
                  >
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Help & Support
                  </Button>
                  <hr className="my-2 border-border" />
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-sm p-2 hover:bg-error-50 text-error"
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" className="p-2">
              <Icon name="Menu" size={20} className="text-text-secondary" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;