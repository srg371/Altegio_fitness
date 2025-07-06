import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientSegmentCard = ({ client, onSelect, onContact, onViewHistory, isSelected }) => {
  const getDaysInactive = () => {
    const lastActivity = new Date(client.lastActivity);
    const today = new Date();
    const diffTime = Math.abs(today - lastActivity);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = () => {
    const days = getDaysInactive();
    if (days <= 30) return 'text-warning';
    if (days <= 90) return 'text-error';
    return 'text-text-muted';
  };

  const getStatusBg = () => {
    const days = getDaysInactive();
    if (days <= 30) return 'bg-warning-50';
    if (days <= 90) return 'bg-error-50';
    return 'bg-secondary-50';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`bg-surface border rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-md ${
        isSelected ? 'border-primary bg-primary-50' : 'border-border'
      }`}
      onClick={() => onSelect(client)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-secondary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{client.name}</h3>
            <p className="text-sm text-text-secondary">{client.email}</p>
            <p className="text-sm text-text-secondary">{client.phone}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg()} ${getStatusColor()}`}>
          {getDaysInactive()} дней
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs text-text-muted mb-1">Последняя активность</p>
          <p className="text-sm font-medium text-text-primary">{formatDate(client.lastActivity)}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted mb-1">Тип абонемента</p>
          <p className="text-sm font-medium text-text-primary">{client.membershipType}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted mb-1">Потрачено всего</p>
          <p className="text-sm font-medium text-text-primary">{formatCurrency(client.totalSpent)}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted mb-1">Попыток связи</p>
          <p className="text-sm font-medium text-text-primary">{client.contactAttempts}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={14} className="text-text-muted" />
          <span className="text-xs text-text-secondary">{client.branch}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onContact(client);
            }}
            className="p-1 h-auto"
          >
            <Icon name="Phone" size={16} className="text-primary" />
          </Button>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onViewHistory(client);
            }}
            className="p-1 h-auto"
          >
            <Icon name="History" size={16} className="text-secondary" />
          </Button>
        </div>
      </div>

      {client.lastCampaign && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Последняя кампания:</span>
            <span className="text-xs text-text-secondary">{client.lastCampaign.name}</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-text-muted">Результат:</span>
            <span className={`text-xs font-medium ${
              client.lastCampaign.responded ? 'text-success' : 'text-error'
            }`}>
              {client.lastCampaign.responded ? 'Отвечен' : 'Не отвечен'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSegmentCard;