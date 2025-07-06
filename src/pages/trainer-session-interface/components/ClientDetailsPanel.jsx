import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientDetailsPanel = ({ client, onClose, onContactClient, onViewFullHistory }) => {
  if (!client) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-center py-12">
          <Icon name="UserX" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Выберите тренировку
          </h3>
          <p className="text-text-secondary">
            Нажмите на тренировку, чтобы увидеть детали клиента
          </p>
        </div>
      </div>
    );
  }

  const getMembershipStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success-50';
      case 'expiring': return 'text-warning bg-warning-50';
      case 'expired': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const getMembershipStatusText = (status) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'expiring': return 'Истекает';
      case 'expired': return 'Истек';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Информация о клиенте
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <Icon name="X" size={16} />
        </Button>
      </div>

      {/* Client Avatar and Basic Info */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={32} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            {client.name}
          </h3>
          <p className="text-text-secondary">{client.phone}</p>
          <p className="text-text-secondary">{client.email}</p>
        </div>
      </div>

      {/* Membership Status */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">Статус абонемента</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
            <div>
              <p className="font-medium text-text-primary">{client.membershipType}</p>
              <p className="text-sm text-text-secondary">
                Действует до: {new Date(client.membershipExpiry).toLocaleDateString('ru-RU')}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMembershipStatusColor(client.membershipStatus)}`}>
              {getMembershipStatusText(client.membershipStatus)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Осталось тренировок:</span>
            <span className="font-medium text-text-primary">{client.remainingSessions}</span>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">Платежная информация</h4>
        <div className="space-y-3">
          {client.overdueAmount > 0 && (
            <div className="p-3 bg-error-50 border border-error-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-error" />
                  <span className="font-medium text-error">Задолженность</span>
                </div>
                <span className="font-semibold text-error">
                  {client.overdueAmount.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Последний платеж:</span>
            <span className="font-medium text-text-primary">
              {new Date(client.lastPaymentDate).toLocaleDateString('ru-RU')}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Общая сумма:</span>
            <span className="font-medium text-text-primary">
              {client.totalPaid.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">Последние тренировки</h4>
        <div className="space-y-2">
          {client.recentSessions.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-secondary-50 rounded">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {session.type}
                </p>
                <p className="text-xs text-text-secondary">
                  {new Date(session.date).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  name={session.attended ? 'CheckCircle' : 'XCircle'}
                  size={14}
                  className={session.attended ? 'text-success' : 'text-error'}
                />
                <span className="text-xs text-text-secondary">
                  {session.attended ? 'Посетил' : 'Пропуск'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">Контактная информация</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">{client.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">{client.email}</span>
          </div>
          {client.telegramUsername && (
            <div className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">@{client.telegramUsername}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="primary"
          fullWidth
          onClick={() => onContactClient(client.id)}
        >
          <Icon name="Phone" size={16} className="mr-2" />
          Связаться с клиентом
        </Button>
        
        <Button
          variant="ghost"
          fullWidth
          onClick={() => onViewFullHistory(client.id)}
        >
          <Icon name="History" size={16} className="mr-2" />
          Полная история
        </Button>

        {client.overdueAmount > 0 && (
          <Button
            variant="warning"
            fullWidth
            onClick={() => onContactClient(client.id, 'payment')}
          >
            <Icon name="CreditCard" size={16} className="mr-2" />
            Напомнить об оплате
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClientDetailsPanel;