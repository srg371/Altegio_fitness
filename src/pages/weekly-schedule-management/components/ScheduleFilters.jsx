import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ScheduleFilters = ({ filters, onFiltersChange, trainers, sessionTypes }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const capacityOptions = [
    { value: '', label: 'Все уровни' },
    { value: 'low', label: 'Низкая загрузка (<40%)', color: 'text-success' },
    { value: 'medium', label: 'Средняя загрузка (40-70%)', color: 'text-primary' },
    { value: 'high', label: 'Высокая загрузка (70-90%)', color: 'text-warning' },
    { value: 'full', label: 'Полная загрузка (>90%)', color: 'text-error' }
  ];

  const statusOptions = [
    { value: '', label: 'Все статусы' },
    { value: 'active', label: 'Активные', icon: 'CheckCircle', color: 'text-success' },
    { value: 'expired', label: 'Просроченные', icon: 'Clock', color: 'text-warning' },
    { value: 'restricted', label: 'С ограничениями', icon: 'AlertTriangle', color: 'text-error' },
    { value: 'waiting', label: 'Лист ожидания', icon: 'Users', color: 'text-primary' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      trainer: '',
      sessionType: '',
      capacity: '',
      status: '',
      search: ''
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value && value.length > 0).length;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 mb-6">
      {/* Основная строка фильтров */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Поиск */}
        <div className="flex-1 max-w-xs">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <Input
              type="search"
              placeholder="Поиск по названию, тренеру..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Быстрые фильтры */}
        <div className="flex items-center space-x-2">
          <select
            value={filters.trainer || ''}
            onChange={(e) => handleFilterChange('trainer', e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Все тренеры</option>
            {trainers.map(trainer => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name}
              </option>
            ))}
          </select>

          <select
            value={filters.sessionType || ''}
            onChange={(e) => handleFilterChange('sessionType', e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Все типы</option>
            {sessionTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Кнопки управления */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            Фильтры
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5">
                {getActiveFiltersCount()}
              </span>
            )}
          </Button>

          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              iconName="X"
              className="text-text-secondary"
            >
              Очистить
            </Button>
          )}
        </div>
      </div>

      {/* Расширенные фильтры */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Фильтр по загрузке */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Уровень загрузки
              </label>
              <select
                value={filters.capacity || ''}
                onChange={(e) => handleFilterChange('capacity', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {capacityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Фильтр по статусу */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Статус сессий
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Дополнительные опции */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Дополнительно
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showWaitingList || false}
                    onChange={(e) => handleFilterChange('showWaitingList', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-text-secondary">Только с листом ожидания</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showPaymentIssues || false}
                    onChange={(e) => handleFilterChange('showPaymentIssues', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-text-secondary">Проблемы с оплатой</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleFilters;