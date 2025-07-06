import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientNavigation = ({ notifications = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Главная',
      path: '/',
      icon: 'Home',
      description: 'Обзор и быстрые действия'
    },
    {
      label: 'Записаться',
      path: '/client-booking-interface',
      icon: 'BookOpen',
      description: 'Запись на тренировки'
    },
    {
      label: 'Мое членство',
      path: '/membership-management',
      icon: 'CreditCard',
      description: 'Управление членством'
    },
    {
      label: 'Расписание',
      path: '/weekly-schedule-management',
      icon: 'Calendar',
      description: 'Мои тренировки'
    }
  ];

  const unreadNotifications = notifications.filter(n => n.unread).length;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Dumbbell" size={16} color="white" />
            </div>
            <span className="font-semibold text-text-primary">Altegio</span>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Button variant="ghost" className="relative p-2">
              <Icon name="Bell" size={20} className="text-text-secondary" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadNotifications}
                </span>
              )}
            </Button>

            {/* Menu Toggle */}
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} className="text-text-secondary" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-surface border-t border-border shadow-lg">
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full justify-start p-3 h-auto ${
                    isActiveRoute(item.path)
                      ? 'bg-primary-50 text-primary border-l-4 border-primary' :'text-text-secondary hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={item.icon} size={20} className="mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-text-muted">{item.description}</div>
                  </div>
                </Button>
              ))}
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Иван Петров</p>
                  <p className="text-sm text-text-secondary">Премиум член</p>
                </div>
              </div>
              <Button variant="outline" className="w-full text-sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки профиля
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 bottom-0 w-64 bg-surface border-r border-border shadow-sm z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Dumbbell" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">Altegio Fitness</h1>
                <p className="text-sm text-text-secondary">Клиентский портал</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => handleNavigation(item.path)}
                className={`w-full justify-start p-3 h-auto transition-smooth ${
                  isActiveRoute(item.path)
                    ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:bg-secondary-50 hover:text-text-primary'
                }`}
              >
                <Icon name={item.icon} size={20} className="mr-3" />
                <div className="text-left">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-text-muted">{item.description}</div>
                </div>
              </Button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={24} color="white" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Иван Петров</p>
                <p className="text-sm text-text-secondary">Премиум член</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-accent-50 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Цель недели</span>
              </div>
              <p className="text-xs text-text-secondary">
                Осталось 1 тренировка до достижения цели!
              </p>
            </div>

            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-sm p-2">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm p-2">
                <Icon name="HelpCircle" size={16} className="mr-2" />
                Помощь
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm p-2 text-error hover:bg-error-50">
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default ClientNavigation;