import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ onFiltersChange, isCollapsed, onToggle }) => {
  const [filters, setFilters] = useState({
    search: '',
    membershipType: '',
    branch: '',
    spendingRange: '',
    lastContactDays: '',
    responseStatus: '',
    sortBy: 'lastActivity'
  });

  const membershipTypes = [
    'Базовый',
    'Премиум',
    'VIP',
    'Студенческий',
    'Корпоративный'
  ];

  const branches = [
    'Центральный',
    'Северный',
    'Южный',
    'Восточный',
    'Западный'
  ];

  const spendingRanges = [
    { label: 'До 5 000 ₽', value: '0-5000' },
    { label: '5 000 - 15 000 ₽', value: '5000-15000' },
    { label: '15 000 - 30 000 ₽', value: '15000-30000' },
    { label: 'Свыше 30 000 ₽', value: '30000+' }
  ];

  const lastContactOptions = [
    { label: 'Никогда', value: 'never' },
    { label: 'Более 30 дней', value: '30+' },
    { label: 'Более 60 дней', value: '60+' },
    { label: 'Более 90 дней', value: '90+' }
  ];

  const responseStatuses = [
    { label: 'Все', value: '' },
    { label: 'Отвечали', value: 'responded' },
    { label: 'Не отвечали', value: 'no_response' },
    { label: 'Не связывались', value: 'no_contact' }
  ];

  const sortOptions = [
    { label: 'По последней активности', value: 'lastActivity' },
    { label: 'По сумме трат', value: 'totalSpent' },
    { label: 'По дате регистрации', value: 'registrationDate' },
    { label: 'По количеству попыток связи', value: 'contactAttempts' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      membershipType: '',
      branch: '',
      spendingRange: '',
      lastContactDays: '',
      responseStatus: '',
      sortBy: 'lastActivity'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => 
    key !== 'sortBy' && value !== ''
  );

  return (
    <div className={`bg-surface border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h3 className="font-semibold text-text-primary">Фильтры</h3>
          )}
          <Button
            variant="ghost"
            onClick={onToggle}
            className="p-2"
          >
            <Icon 
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
              size={16} 
              className="text-text-secondary" 
            />
          </Button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-6 overflow-y-auto h-full">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Поиск
            </label>
            <Input
              type="search"
              placeholder="Имя, email, телефон..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Membership Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Тип абонемента
            </label>
            <select
              value={filters.membershipType}
              onChange={(e) => handleFilterChange('membershipType', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Все типы</option>
              {membershipTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Филиал
            </label>
            <select
              value={filters.branch}
              onChange={(e) => handleFilterChange('branch', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Все филиалы</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          {/* Spending Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Потрачено всего
            </label>
            <select
              value={filters.spendingRange}
              onChange={(e) => handleFilterChange('spendingRange', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Любая сумма</option>
              {spendingRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          {/* Last Contact */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Последний контакт
            </label>
            <select
              value={filters.lastContactDays}
              onChange={(e) => handleFilterChange('lastContactDays', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Любое время</option>
              {lastContactOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Response Status */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Статус ответа
            </label>
            <select
              value={filters.responseStatus}
              onChange={(e) => handleFilterChange('responseStatus', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {responseStatuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Сортировка
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
              iconName="X"
            >
              Очистить фильтры
            </Button>
          )}

          {/* Filter Summary */}
          <div className="bg-secondary-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Filter" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-secondary">Активные фильтры</span>
            </div>
            <p className="text-xs text-text-secondary">
              {hasActiveFilters ? 
                `Применено ${Object.values(filters).filter(v => v !== '' && v !== 'lastActivity').length} фильтров` :
                'Фильтры не применены'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;