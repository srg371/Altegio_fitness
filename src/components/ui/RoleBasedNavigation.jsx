import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedNavigation = ({ userRole = 'admin', permissions = [] }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Role-based navigation configuration
  const navigationConfig = {
    admin: {
      items: [
        {
          label: 'Dashboard',
          path: '/',
          icon: 'LayoutDashboard',
          description: 'Business overview and metrics',
          permissions: ['dashboard.view']
        },
        {
          label: 'Schedule Management',
          path: '/weekly-schedule-management',
          icon: 'Calendar',
          description: 'Weekly scheduling and sessions',
          permissions: ['schedule.manage']
        },
        {
          label: 'Member Services',
          icon: 'Users',
          description: 'Comprehensive member management',
          permissions: ['members.view'],
          children: [
            {
              label: 'Membership Management',
              path: '/membership-management',
              icon: 'CreditCard',
              description: 'Memberships and billing',
              permissions: ['members.manage']
            },
            {
              label: 'Client Retention',
              path: '/client-retention-management',
              icon: 'UserCheck',
              description: 'Engagement and retention',
              permissions: ['retention.manage']
            }
          ]
        },
        {
          label: 'Analytics & Reports',
          path: '/sales-analytics-dashboard',
          icon: 'BarChart3',
          description: 'Business intelligence',
          permissions: ['analytics.view']
        },
        {
          label: 'Trainer Hub',
          path: '/trainer-session-interface',
          icon: 'Dumbbell',
          description: 'Trainer management',
          permissions: ['trainers.manage']
        },
        {
          label: 'Client Booking',
          path: '/client-booking-interface',
          icon: 'BookOpen',
          description: 'Booking interface',
          permissions: ['booking.manage']
        }
      ],
      defaultExpanded: ['Member Services']
    },
    trainer: {
      items: [
        {
          label: 'My Sessions',
          path: '/trainer-session-interface',
          icon: 'Dumbbell',
          description: 'Your training sessions'
        },
        {
          label: 'Schedule',
          path: '/weekly-schedule-management',
          icon: 'Calendar',
          description: 'Your weekly schedule'
        },
        {
          label: 'Clients',
          path: '/membership-management',
          icon: 'Users',
          description: 'Your assigned clients'
        }
      ],
      defaultExpanded: []
    },
    client: {
      items: [
        {
          label: 'Book Session',
          path: '/client-booking-interface',
          icon: 'BookOpen',
          description: 'Book your training'
        },
        {
          label: 'My Schedule',
          path: '/weekly-schedule-management',
          icon: 'Calendar',
          description: 'Your upcoming sessions'
        }
      ],
      defaultExpanded: []
    }
  };

  const currentConfig = navigationConfig[userRole] || navigationConfig.admin;

  useEffect(() => {
    setExpandedGroups(currentConfig.defaultExpanded);
  }, [userRole]);

  const hasPermission = (requiredPermissions) => {
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    if (userRole === 'admin') return true; // Admin has all permissions
    return requiredPermissions.some(permission => permissions.includes(permission));
  };

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
    // Check permissions
    if (!hasPermission(item.permissions)) return null;

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
            {item.children
              .filter(child => hasPermission(child.permissions))
              .map(child => renderNavigationItem(child, level + 1))
            }
          </div>
        )}
      </div>
    );
  };

  const getRoleDisplayName = () => {
    switch (userRole) {
      case 'admin': return 'Administrator';
      case 'trainer': return 'Trainer';
      case 'client': return 'Client';
      default: return 'User';
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'admin': return 'Shield';
      case 'trainer': return 'Dumbbell';
      case 'client': return 'User';
      default: return 'User';
    }
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
              <div className="flex items-center space-x-2">
                <Icon name={getRoleIcon()} size={16} className="text-primary" />
                <h2 className="font-semibold text-text-primary text-sm">
                  {getRoleDisplayName()}
                </h2>
              </div>
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
              {currentConfig.items.map(item => renderNavigationItem(item))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed && userRole === 'admin' && (
              <div className="bg-accent-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-accent">Quick Tip</span>
                </div>
                <p className="text-xs text-text-secondary">
                  Use Ctrl+K to quickly search and navigate.
                </p>
              </div>
            )}
            {!isCollapsed && userRole === 'trainer' && (
              <div className="bg-primary-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Today</span>
                </div>
                <p className="text-xs text-text-secondary">
                  You have 3 sessions scheduled.
                </p>
              </div>
            )}
            {!isCollapsed && userRole === 'client' && (
              <div className="bg-success-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Goal</span>
                </div>
                <p className="text-xs text-text-secondary">
                  2 more sessions to reach your weekly goal!
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

export default RoleBasedNavigation;