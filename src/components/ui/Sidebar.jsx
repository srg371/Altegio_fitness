import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: 'LayoutDashboard',
      description: 'Overview and quick actions'
    },
    {
      label: 'Schedule Management',
      path: '/weekly-schedule-management',
      icon: 'Calendar',
      description: 'Weekly scheduling and sessions'
    },
    {
      label: 'Member Services',
      icon: 'Users',
      description: 'Membership and client management',
      children: [
        {
          label: 'Membership Management',
          path: '/membership-management',
          icon: 'CreditCard',
          description: 'Manage memberships and billing'
        },
        {
          label: 'Client Retention',
          path: '/client-retention-management',
          icon: 'UserCheck',
          description: 'Client engagement and retention'
        }
      ]
    },
    {
      label: 'Analytics & Reports',
      path: '/sales-analytics-dashboard',
      icon: 'BarChart3',
      description: 'Business intelligence and metrics'
    },
    {
      label: 'Trainer Hub',
      path: '/trainer-session-interface',
      icon: 'Dumbbell',
      description: 'Trainer session management'
    },
    {
      label: 'Book Sessions',
      path: '/client-booking-interface',
      icon: 'BookOpen',
      description: 'Client booking interface'
    }
  ];

  const [expandedGroups, setExpandedGroups] = useState(['Member Services']);

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
      setIsMobileOpen(false);
    }
  };

  const toggleGroup = (label) => {
    setExpandedGroups(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActiveRoute = (path) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isGroupActive = (children) => {
    return children?.some(child => isActiveRoute(child.path));
  };

  const renderNavigationItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedGroups.includes(item.label);
    const isActive = isActiveRoute(item.path);
    const isGroupActiveState = hasChildren && isGroupActive(item.children);

    return (
      <div key={item.label} className="mb-1">
        <Button
          variant="ghost"
          onClick={() => hasChildren ? toggleGroup(item.label) : handleNavigation(item.path)}
          className={`w-full justify-start p-3 h-auto transition-smooth ${
            isActive || isGroupActiveState
              ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:bg-secondary-50 hover:text-text-primary'
          } ${level > 0 ? 'ml-4 pl-8' : ''}`}
        >
          <div className="flex items-center w-full">
            <Icon 
              name={item.icon} 
              size={20} 
              className={`${isCollapsed ? '' : 'mr-3'} ${
                isActive || isGroupActiveState ? 'text-primary' : ''
              }`} 
            />
            {!isCollapsed && (
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">{item.label}</div>
                {!hasChildren && (
                  <div className="text-xs text-text-muted mt-0.5">
                    {item.description}
                  </div>
                )}
              </div>
            )}
            {!isCollapsed && hasChildren && (
              <Icon 
                name={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
                size={16} 
                className="text-text-muted"
              />
            )}
          </div>
        </Button>

        {/* Children */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 z-50 bg-surface border-r border-border nav-shadow
        transition-all duration-300 ease-smooth
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <h2 className="font-semibold text-text-primary">Navigation</h2>
            )}
            <Button
              variant="ghost"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-secondary-50 hidden md:flex"
            >
              <Icon 
                name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
                size={16} 
                className="text-text-secondary"
              />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {navigationItems.map(item => renderNavigationItem(item))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed && (
              <div className="bg-accent-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-accent">Pro Tip</span>
                </div>
                <p className="text-xs text-text-secondary">
                  Use keyboard shortcuts to navigate faster through the system.
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-20 left-4 z-40 md:hidden bg-surface border border-border shadow-md p-2"
      >
        <Icon name="Menu" size={20} className="text-text-secondary" />
      </Button>
    </>
  );
};

export default Sidebar;