import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MembershipFilters = ({ onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    membershipType: '',
    status: '',
    paymentStatus: '',
    branch: '',
    expirationDateFrom: '',
    expirationDateTo: '',
    ...activeFilters
  });

  const membershipTypes = [
    'Базовый',
    'Премиум',
    'VIP',
    'Студенческий',
    'Корпоративный',
    'Семейный'
  ];

  const statuses = [
    { value: 'active', label: 'Активно' },
    { value: 'expired', label: 'Истекло' },
    { value: 'expiring', label: 'Истекает' },
    { value: 'suspended', label: 'Приостановлено' }
  ];

  const paymentStatuses = [
    { value: 'paid', label: 'Оплачено' },
    { value: 'overdue', label: 'Просрочено' },
    { value: 'pending', label: 'Ожидает' }
  ];

  const branches = [
    'Центральный',
    'Северный',
    'Южный',
    'Восточный',
    'Западный'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      membershipType: '',
      status: '',
      paymentStatus: '',
      branch: '',
      expirationDateFrom: '',
      expirationDateTo: ''
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(localFilters).filter(value => value !== '').length;
  };

  return (
    <div className="bg-surface rounded-lg border border-border card-shadow mb-6">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium text-text-primary">Фильтры</h3>
            {getActiveFilterCount() > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                iconName="X"
              >
                Очистить
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            >
              {isExpanded ? 'Скрыть' : 'Показать'}
            </Button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Membership Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Тип членства
              </label>
              <select
                value={localFilters.membershipType}
                onChange={(e) => handleFilterChange('membershipType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-text-primary"
              >
                <option value="">Все типы</option>
                {membershipTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Статус
              </label>
              <select
                value={localFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-text-primary"
              >
                <option value="">Все статусы</option>
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Статус оплаты
              </label>
              <select
                value={localFilters.paymentStatus}
                onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-text-primary"
              >
                <option value="">Все статусы</option>
                {paymentStatuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Филиал
              </label>
              <select
                value={localFilters.branch}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-text-primary"
              >
                <option value="">Все филиалы</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* Expiration Date From */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Истекает с
              </label>
              <Input
                type="date"
                value={localFilters.expirationDateFrom}
                onChange={(e) => handleFilterChange('expirationDateFrom', e.target.value)}
              />
            </div>

            {/* Expiration Date To */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Истекает до
              </label>
              <Input
                type="date"
                value={localFilters.expirationDateTo}
                onChange={(e) => handleFilterChange('expirationDateTo', e.target.value)}
              />
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('status', 'expiring')}
                iconName="AlertTriangle"
              >
                Истекающие
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('status', 'expired')}
                iconName="XCircle"
              >
                Просроченные
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('paymentStatus', 'overdue')}
                iconName="DollarSign"
              >
                Долги по оплате
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const today = new Date();
                  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                  handleFilterChange('expirationDateFrom', today.toISOString().split('T')[0]);
                  handleFilterChange('expirationDateTo', nextWeek.toISOString().split('T')[0]);
                }}
                iconName="Calendar"
              >
                Истекают на неделе
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipFilters;