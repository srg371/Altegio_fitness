import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const FilterControls = ({ 
  dateRange, 
  onDateRangeChange, 
  selectedBranch, 
  onBranchChange, 
  selectedMembershipType, 
  onMembershipTypeChange,
  onExport,
  onRefresh
}) => {
  const branches = [
    { value: 'all', label: 'Все филиалы' },
    { value: 'center', label: 'Центральный' },
    { value: 'north', label: 'Северный' },
    { value: 'south', label: 'Южный' },
    { value: 'east', label: 'Восточный' }
  ];

  const membershipTypes = [
    { value: 'all', label: 'Все типы' },
    { value: 'basic', label: 'Базовый' },
    { value: 'premium', label: 'Премиум' },
    { value: 'vip', label: 'VIP' },
    { value: 'corporate', label: 'Корпоративный' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Сегодня' },
    { value: 'week', label: 'Эта неделя' },
    { value: 'month', label: 'Этот месяц' },
    { value: 'quarter', label: 'Этот квартал' },
    { value: 'year', label: 'Этот год' },
    { value: 'custom', label: 'Выбрать период' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 card-shadow mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Date Range Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-text-primary mb-2">Период</label>
            <select
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Branch Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-text-primary mb-2">Филиал</label>
            <select
              value={selectedBranch}
              onChange={(e) => onBranchChange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {branches.map(branch => (
                <option key={branch.value} value={branch.value}>
                  {branch.label}
                </option>
              ))}
            </select>
          </div>

          {/* Membership Type Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-text-primary mb-2">Тип абонемента</label>
            <select
              value={selectedMembershipType}
              onChange={(e) => onMembershipTypeChange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {membershipTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            onClick={onRefresh}
            iconName="RefreshCw"
            className="px-4 py-2"
          >
            Обновить
          </Button>
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            className="px-4 py-2"
          >
            Экспорт
          </Button>
        </div>
      </div>

      {/* Custom Date Range Inputs */}
      {dateRange === 'custom' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-text-primary mb-2">От</label>
              <Input
                type="date"
                className="px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-text-primary mb-2">До</label>
              <Input
                type="date"
                className="px-3 py-2"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="primary"
                className="px-4 py-2"
              >
                Применить
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;