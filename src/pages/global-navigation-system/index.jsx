import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GlobalNavigationSystem = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationScreens = [
    {
      title: 'Weekly Schedule Management',
      description: 'Manage training sessions and weekly schedules',
      path: '/weekly-schedule-management',
      icon: 'Calendar',
      color: 'bg-primary',
      stats: { sessions: 24, trainers: 8 }
    },
    {
      title: 'Membership Management',
      description: 'Handle member subscriptions and billing',
      path: '/membership-management',
      icon: 'CreditCard',
      color: 'bg-accent',
      stats: { members: 156, active: 142 }
    },
    {
      title: 'Sales Analytics Dashboard',
      description: 'View business metrics and performance',
      path: '/sales-analytics-dashboard',
      icon: 'BarChart3',
      color: 'bg-warning',
      stats: { revenue: '$12.5K', growth: '+15%' }
    },
    {
      title: 'Trainer Session Interface',
      description: 'Manage trainer sessions and payments',
      path: '/trainer-session-interface',
      icon: 'Dumbbell',
      color: 'bg-secondary',
      stats: { sessions: 45, pending: 3 }
    },
    {
      title: 'Client Booking Interface',
      description: 'Client-facing booking system',
      path: '/client-booking-interface',
      icon: 'BookOpen',
      color: 'bg-primary-500',
      stats: { bookings: 78, today: 12 }
    },
    {
      title: 'Client Retention Management',
      description: 'Monitor and improve client retention',
      path: '/client-retention-management',
      icon: 'UserCheck',
      color: 'bg-success',
      stats: { retention: '87%', at_risk: 8 }
    }
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  const recentActivities = [
    {
      id: 1,
      title: 'New member registration',
      description: 'John Smith joined Premium membership',
      time: '2 hours ago',
      icon: 'UserPlus',
      color: 'text-success'
    },
    {
      id: 2,
      title: 'Session cancelled',
      description: 'Yoga class cancelled due to trainer illness',
      time: '4 hours ago',
      icon: 'AlertCircle',
      color: 'text-warning'
    },
    {
      id: 3,
      title: 'Payment processed',
      description: 'Monthly membership payment from Maria Petrov',
      time: '1 day ago',
      icon: 'CreditCard',
      color: 'text-success'
    },
    {
      id: 4,
      title: 'Membership expiring',
      description: '5 memberships expiring in 3 days',
      time: '1 day ago',
      icon: 'AlertTriangle',
      color: 'text-error'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        } pt-16`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Navigation" size={20} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">
                    Global Navigation System
                  </h1>
                  <p className="text-text-secondary mt-1">
                    Unified access to all application screens and features
                  </p>
                </div>
              </div>

              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Home" size={16} />
                <span>Home</span>
                <Icon name="ChevronRight" size={16} />
                <span className="text-text-primary">Navigation System</span>
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Total Screens</p>
                    <p className="text-2xl font-bold text-text-primary">6</p>
                  </div>
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name="Layout" size={20} className="text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Active Users</p>
                    <p className="text-2xl font-bold text-text-primary">24</p>
                  </div>
                  <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-success" />
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">System Status</p>
                    <p className="text-lg font-semibold text-success">Operational</p>
                  </div>
                  <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Notifications</p>
                    <p className="text-2xl font-bold text-text-primary">3</p>
                  </div>
                  <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
                    <Icon name="Bell" size={20} className="text-warning" />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Screens Grid */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Application Screens
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {navigationScreens.map((screen) => (
                  <div
                    key={screen.path}
                    className={`bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer group ${
                      location.pathname === screen.path ? 'ring-2 ring-primary border-primary' : ''
                    }`}
                    onClick={() => handleNavigate(screen.path)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${screen.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <Icon name={screen.icon} size={24} color="white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                          {screen.title}
                        </h3>
                        <p className="text-sm text-text-secondary mb-3">
                          {screen.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-text-muted">
                            {Object.entries(screen.stats).map(([key, value]) => (
                              <span key={key}>
                                <span className="capitalize">{key}:</span> {value}
                              </span>
                            ))}
                          </div>
                          <Icon name="ArrowRight" size={16} className="text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                  <Icon name="Activity" size={20} className="mr-2 text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-secondary-50 rounded-full flex items-center justify-center">
                        <Icon name={activity.icon} size={14} className={activity.color} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">
                          {activity.title}
                        </p>
                        <p className="text-xs text-text-secondary mt-1">
                          {activity.description}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                  <Icon name="Zap" size={20} className="mr-2 text-accent" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/weekly-schedule-management')}
                    className="p-4 h-auto justify-start text-left hover:bg-primary-50"
                  >
                    <div>
                      <Icon name="Plus" size={16} className="mb-2 text-primary" />
                      <p className="text-sm font-medium">Add Session</p>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => navigate('/membership-management')}
                    className="p-4 h-auto justify-start text-left hover:bg-accent-50"
                  >
                    <div>
                      <Icon name="UserPlus" size={16} className="mb-2 text-accent" />
                      <p className="text-sm font-medium">New Member</p>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => navigate('/sales-analytics-dashboard')}
                    className="p-4 h-auto justify-start text-left hover:bg-warning-50"
                  >
                    <div>
                      <Icon name="TrendingUp" size={16} className="mb-2 text-warning" />
                      <p className="text-sm font-medium">View Reports</p>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => navigate('/trainer-session-interface')}
                    className="p-4 h-auto justify-start text-left hover:bg-secondary-50"
                  >
                    <div>
                      <Icon name="Calendar" size={16} className="mb-2 text-secondary" />
                      <p className="text-sm font-medium">Schedule</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNavigationSystem;