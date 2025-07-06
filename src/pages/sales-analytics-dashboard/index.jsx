import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import SalesChart from './components/SalesChart';
import MembershipBreakdown from './components/MembershipBreakdown';
import BranchComparison from './components/BranchComparison';
import FilterControls from './components/FilterControls';
import SalesFunnel from './components/SalesFunnel';
import RevenueBreakdown from './components/RevenueBreakdown';

const SalesAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('month');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedMembershipType, setSelectedMembershipType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for metrics cards
  const metricsData = [
    {
      title: 'Выручка за месяц',
      value: '2 450 000 ₽',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'primary'
    },
    {
      title: 'Новые клиенты',
      value: '156',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'UserPlus',
      color: 'success'
    },
    {
      title: 'Удержание клиентов',
      value: '87.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'UserCheck',
      color: 'warning'
    },
    {
      title: 'Средний чек',
      value: '15 700 ₽',
      change: '-3.2%',
      changeType: 'negative',
      icon: 'CreditCard',
      color: 'error'
    }
  ];

  // Mock data for sales chart
  const salesChartData = [
    { date: '01.12', sales: 78000 },
    { date: '02.12', sales: 85000 },
    { date: '03.12', sales: 92000 },
    { date: '04.12', sales: 88000 },
    { date: '05.12', sales: 95000 },
    { date: '06.12', sales: 102000 },
    { date: '07.12', sales: 98000 },
    { date: '08.12', sales: 105000 },
    { date: '09.12', sales: 112000 },
    { date: '10.12', sales: 108000 },
    { date: '11.12', sales: 115000 },
    { date: '12.12', sales: 122000 },
    { date: '13.12', sales: 118000 },
    { date: '14.12', sales: 125000 }
  ];

  // Mock data for membership breakdown
  const membershipData = [
    { name: 'Базовый', value: 245 },
    { name: 'Премиум', value: 156 },
    { name: 'VIP', value: 89 },
    { name: 'Корпоративный', value: 67 },
    { name: 'Студенческий', value: 123 }
  ];

  // Mock data for branch comparison
  const branchData = [
    { branch: 'Центральный', actual: 850000, target: 800000 },
    { branch: 'Северный', actual: 720000, target: 750000 },
    { branch: 'Южный', actual: 680000, target: 700000 },
    { branch: 'Восточный', actual: 590000, target: 650000 }
  ];

  // Mock data for sales funnel
  const funnelData = [
    { stage: 'Посетители', value: 1250 },
    { stage: 'Консультации', value: 485 },
    { stage: 'Пробные занятия', value: 298 },
    { stage: 'Продажи', value: 156 },
    { stage: 'Активные клиенты', value: 136 }
  ];

  // Mock data for revenue breakdown
  const revenueData = [
    { service: 'Абонементы', revenue: 1450000, count: 245 },
    { service: 'Персональные тренировки', revenue: 680000, count: 156 },
    { service: 'Групповые занятия', revenue: 320000, count: 89 },
    { service: 'Дополнительные услуги', revenue: 180000, count: 67 },
    { service: 'Товары', revenue: 95000, count: 123 }
  ];

  const handleExport = () => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      // Mock download
      const element = document.createElement('a');
      const file = new Blob(['Отчет по продажам экспортирован'], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `sales-report-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const quickActions = [
    {
      title: 'Управление расписанием',
      description: 'Просмотр и редактирование недельного расписания',
      icon: 'Calendar',
      path: '/weekly-schedule-management',
      color: 'primary'
    },
    {
      title: 'Управление абонементами',
      description: 'Контроль подписок и платежей',
      icon: 'CreditCard',
      path: '/membership-management',
      color: 'success'
    },
    {
      title: 'Удержание клиентов',
      description: 'Анализ и улучшение лояльности',
      icon: 'UserCheck',
      path: '/client-retention-management',
      color: 'warning'
    },
    {
      title: 'Интерфейс тренера',
      description: 'Управление тренировочными сессиями',
      icon: 'Dumbbell',
      path: '/trainer-session-interface',
      color: 'error'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Аналитика продаж</h1>
              <p className="text-text-secondary mt-1">
                Комплексный анализ эффективности и бизнес-показателей
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/membership-management')}
                iconName="Users"
              >
                Клиенты
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/weekly-schedule-management')}
                iconName="Calendar"
              >
                Расписание
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Filter Controls */}
        <FilterControls
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
          selectedMembershipType={selectedMembershipType}
          onMembershipTypeChange={setSelectedMembershipType}
          onExport={handleExport}
          onRefresh={handleRefresh}
        />

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metricsData.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              color={metric.color}
            />
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SalesChart
            data={salesChartData}
            title="Динамика продаж"
            height={350}
          />
          <MembershipBreakdown
            data={membershipData}
            title="Распределение по типам абонементов"
          />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BranchComparison
            data={branchData}
            title="Сравнение филиалов"
            target={750000}
          />
          <SalesFunnel
            data={funnelData}
            title="Воронка продаж"
          />
        </div>

        {/* Revenue Breakdown */}
        <div className="mb-6">
          <RevenueBreakdown
            data={revenueData}
            title="Структура выручки по услугам"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-surface border border-border rounded-lg p-6 card-shadow">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Быстрые действия</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => navigate(action.path)}
                className="h-auto p-4 text-left flex flex-col items-start space-y-2 hover:bg-secondary-50 transition-smooth"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  action.color === 'primary' ? 'bg-primary-50 text-primary' :
                  action.color === 'success' ? 'bg-success-50 text-success' :
                  action.color === 'warning'? 'bg-warning-50 text-warning' : 'bg-error-50 text-error'
                }`}>
                  <Icon name={action.icon} size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary text-sm">{action.title}</h4>
                  <p className="text-xs text-text-secondary mt-1">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-lg p-6 flex items-center space-x-3">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <span className="text-text-primary">Обработка данных...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesAnalyticsDashboard;