import React from 'react';
import Icon from '../../../components/AppIcon';

const MembershipStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Всего участников',
      value: stats.totalMembers,
      change: stats.totalMembersChange,
      changeType: stats.totalMembersChange >= 0 ? 'positive' : 'negative',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Активные членства',
      value: stats.activeMembers,
      change: stats.activeMembersChange,
      changeType: stats.activeMembersChange >= 0 ? 'positive' : 'negative',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Истекают скоро',
      value: stats.expiringMembers,
      change: stats.expiringMembersChange,
      changeType: stats.expiringMembersChange >= 0 ? 'negative' : 'positive',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      title: 'Просроченные',
      value: stats.expiredMembers,
      change: stats.expiredMembersChange,
      changeType: stats.expiredMembersChange >= 0 ? 'negative' : 'positive',
      icon: 'XCircle',
      color: 'error'
    },
    {
      title: 'Доход за месяц',
      value: `${stats.monthlyRevenue.toLocaleString('ru-RU')} ₽`,
      change: stats.monthlyRevenueChange,
      changeType: stats.monthlyRevenueChange >= 0 ? 'positive' : 'negative',
      icon: 'DollarSign',
      color: 'accent'
    },
    {
      title: 'Средний чек',
      value: `${stats.averageTicket.toLocaleString('ru-RU')} ₽`,
      change: stats.averageTicketChange,
      changeType: stats.averageTicketChange >= 0 ? 'positive' : 'negative',
      icon: 'TrendingUp',
      color: 'secondary'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-50 text-primary';
      case 'success':
        return 'bg-success-50 text-success';
      case 'warning':
        return 'bg-warning-50 text-warning';
      case 'error':
        return 'bg-error-50 text-error';
      case 'accent':
        return 'bg-accent-50 text-accent';
      case 'secondary':
        return 'bg-secondary-50 text-secondary';
      default:
        return 'bg-secondary-50 text-secondary';
    }
  };

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-success' : 'text-error';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-surface rounded-lg border border-border card-shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {stat.value}
              </p>
              {stat.change !== undefined && (
                <div className="flex items-center mt-2">
                  <Icon 
                    name={stat.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                    className={getChangeColor(stat.changeType)}
                  />
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(stat.changeType)}`}>
                    {Math.abs(stat.change)}%
                  </span>
                  <span className="text-xs text-text-muted ml-1">
                    за месяц
                  </span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
              <Icon name={stat.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MembershipStats;