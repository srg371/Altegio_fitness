import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MemberDetailsPanel = ({ member, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState(member || {});
  const [activeTab, setActiveTab] = useState('details');

  if (!member) return null;

  const tabs = [
    { id: 'details', label: 'Детали', icon: 'User' },
    { id: 'payments', label: 'Платежи', icon: 'CreditCard' },
    { id: 'sessions', label: 'Сессии', icon: 'Calendar' },
    { id: 'notifications', label: 'Уведомления', icon: 'Bell' }
  ];

  const handleSave = () => {
    onUpdate(editedMember);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedMember(member);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'expired': return 'text-error';
      case 'expiring': return 'text-warning';
      case 'suspended': return 'text-secondary';
      default: return 'text-secondary';
    }
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Основная информация</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Имя
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={editedMember.name || ''}
                onChange={(e) => setEditedMember({...editedMember, name: e.target.value})}
              />
            ) : (
              <p className="text-text-primary">{member.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Email
            </label>
            {isEditing ? (
              <Input
                type="email"
                value={editedMember.email || ''}
                onChange={(e) => setEditedMember({...editedMember, email: e.target.value})}
              />
            ) : (
              <p className="text-text-primary">{member.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Телефон
            </label>
            {isEditing ? (
              <Input
                type="tel"
                value={editedMember.phone || ''}
                onChange={(e) => setEditedMember({...editedMember, phone: e.target.value})}
              />
            ) : (
              <p className="text-text-primary">{member.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Membership Info */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Информация о членстве</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Тип членства
            </label>
            <p className="text-text-primary">{member.membershipType}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Статус
            </label>
            <span className={`font-medium ${getStatusColor(member.status)}`}>
              {member.status === 'active' ? 'Активно' :
               member.status === 'expired' ? 'Истекло' :
               member.status === 'expiring' ? 'Истекает' :
               member.status === 'suspended' ? 'Приостановлено' : 'Неизвестно'}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Дата начала
            </label>
            <p className="text-text-primary">{formatDate(member.startDate)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Дата окончания
            </label>
            <p className="text-text-primary">{formatDate(member.expirationDate)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Филиал
            </label>
            <p className="text-text-primary">{member.branch}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-text-primary">История платежей</h4>
        <Button variant="outline" size="sm" iconName="Plus">
          Добавить платеж
        </Button>
      </div>
      
      <div className="space-y-3">
        {member.paymentHistory?.map((payment, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-text-primary">
                {formatCurrency(payment.amount)}
              </p>
              <p className="text-xs text-text-secondary">
                {formatDate(payment.date)} • {payment.method}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                payment.status === 'completed' ? 'bg-success text-success-foreground' :
                payment.status === 'pending' ? 'bg-warning text-warning-foreground' :
                'bg-error text-error-foreground'
              }`}>
                {payment.status === 'completed' ? 'Завершен' :
                 payment.status === 'pending' ? 'Ожидает' : 'Отклонен'}
              </span>
              <Button variant="ghost" size="sm" iconName="ExternalLink" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSessionsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-text-primary">Посещения</h4>
        <div className="text-sm text-text-secondary">
          Всего: {member.totalSessions} • В этом месяце: {member.monthlySessions}
        </div>
      </div>
      
      <div className="space-y-3">
        {member.recentSessions?.map((session, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="Dumbbell" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {session.type}
                </p>
                <p className="text-xs text-text-secondary">
                  {formatDate(session.date)} • {session.trainer}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-primary">{session.duration} мин</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                session.status === 'completed' ? 'bg-success text-success-foreground' :
                session.status === 'cancelled' ? 'bg-error text-error-foreground' :
                'bg-warning text-warning-foreground'
              }`}>
                {session.status === 'completed' ? 'Завершена' :
                 session.status === 'cancelled' ? 'Отменена' : 'Запланирована'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-text-primary">Уведомления</h4>
        <Button variant="outline" size="sm" iconName="Send">
          Отправить уведомление
        </Button>
      </div>
      
      <div className="space-y-3">
        {member.notifications?.map((notification, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-secondary-50 rounded-lg">
            <Icon 
              name={notification.type === 'warning' ? 'AlertTriangle' : 
                    notification.type === 'info' ? 'Info' : 'CheckCircle'} 
              size={16} 
              className={notification.type === 'warning' ? 'text-warning' : 
                        notification.type === 'info' ? 'text-primary' : 'text-success'} 
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">
                {notification.title}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-text-muted mt-2">
                {formatDate(notification.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-surface border-l border-border shadow-xl z-50 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Детали участника
            </h3>
            <Button variant="ghost" onClick={onClose} iconName="X" size="sm" />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-primary">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-text-primary">{member.name}</h4>
              <p className="text-sm text-text-secondary">{member.email}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-4">
            {isEditing ? (
              <>
                <Button variant="primary" size="sm" onClick={handleSave}>
                  Сохранить
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Отмена
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} iconName="Edit">
                  Редактировать
                </Button>
                <Button variant="outline" size="sm" iconName="RefreshCw">
                  Продлить
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-smooth ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'payments' && renderPaymentsTab()}
          {activeTab === 'sessions' && renderSessionsTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPanel;