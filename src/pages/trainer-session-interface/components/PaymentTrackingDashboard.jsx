import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentTrackingDashboard = ({ paymentData, onRecordPayment, onSendReminder }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
    { value: 'quarter', label: 'Квартал' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-success bg-success-50';
      case 'pending': return 'text-warning bg-warning-50';
      case 'overdue': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Оплачено';
      case 'pending': return 'Ожидает';
      case 'overdue': return 'Просрочено';
      default: return 'Неизвестно';
    }
  };

  const calculateEarnings = () => {
    const totalEarned = paymentData.payments
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const totalPending = paymentData.payments
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const totalOverdue = paymentData.payments
      .filter(p => p.status === 'overdue')
      .reduce((sum, p) => sum + p.amount, 0);

    return { totalEarned, totalPending, totalOverdue };
  };

  const { totalEarned, totalPending, totalOverdue } = calculateEarnings();

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Отслеживание платежей
        </h2>
        <div className="flex items-center space-x-2">
          {periods.map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPeriod(period.value)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-success-50 rounded-lg border border-success-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-success font-medium">Получено</p>
              <p className="text-2xl font-bold text-success">
                {totalEarned.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <Icon name="TrendingUp" size={24} className="text-success" />
          </div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warning font-medium">Ожидается</p>
              <p className="text-2xl font-bold text-warning">
                {totalPending.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <Icon name="Clock" size={24} className="text-warning" />
          </div>
        </div>

        <div className="p-4 bg-error-50 rounded-lg border border-error-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-error font-medium">Просрочено</p>
              <p className="text-2xl font-bold text-error">
                {totalOverdue.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <Icon name="AlertTriangle" size={24} className="text-error" />
          </div>
        </div>
      </div>

      {/* Commission Information */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-primary mb-1">Ваша комиссия</h3>
            <p className="text-sm text-text-secondary">
              {paymentData.commissionRate}% от оплаченных тренировок
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {(totalEarned * paymentData.commissionRate / 100).toLocaleString('ru-RU')} ₽
            </p>
            <p className="text-sm text-text-secondary">
              За {selectedPeriod === 'week' ? 'неделю' : selectedPeriod === 'month' ? 'месяц' : 'квартал'}
            </p>
          </div>
        </div>
      </div>

      {/* Payment List */}
      <div className="space-y-3">
        <h3 className="font-medium text-text-primary">Детали платежей</h3>
        
        {paymentData.payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg border border-border"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="white" />
              </div>
              <div>
                <p className="font-medium text-text-primary">
                  {payment.clientName}
                </p>
                <p className="text-sm text-text-secondary">
                  {payment.sessionType} • {new Date(payment.date).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-semibold text-text-primary">
                  {payment.amount.toLocaleString('ru-RU')} ₽
                </p>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(payment.status)}`}>
                  {getStatusText(payment.status)}
                </span>
              </div>

              {payment.status === 'pending' && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => onRecordPayment(payment.id)}
                >
                  <Icon name="Check" size={14} className="mr-1" />
                  Получено
                </Button>
              )}

              {payment.status === 'overdue' && (
                <div className="flex space-x-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => onSendReminder(payment.id)}
                  >
                    <Icon name="MessageCircle" size={14} className="mr-1" />
                    Напомнить
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => onRecordPayment(payment.id)}
                  >
                    <Icon name="Check" size={14} className="mr-1" />
                    Получено
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {paymentData.payments.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Wallet" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Нет данных о платежах
          </h3>
          <p className="text-text-secondary">
            Платежи появятся после проведения тренировок
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
        <Button variant="ghost" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Экспорт отчета
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="Calculator" size={16} className="mr-2" />
          Калькулятор доходов
        </Button>
      </div>
    </div>
  );
};

export default PaymentTrackingDashboard;