import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SessionDetailsPanel = ({ session, onClose, onEdit, onDelete, onManageParticipants }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!session) return null;

  const getCapacityPercentage = () => {
    return Math.round((session.currentParticipants / session.maxParticipants) * 100);
  };

  const getCapacityColor = () => {
    const percentage = getCapacityPercentage();
    if (percentage >= 90) return 'text-error';
    if (percentage >= 70) return 'text-warning';
    if (percentage >= 40) return 'text-primary';
    return 'text-success';
  };

  const tabs = [
    { id: 'details', label: 'Детали', icon: 'Info' },
    { id: 'participants', label: 'Участники', icon: 'Users' },
    { id: 'payments', label: 'Платежи', icon: 'CreditCard' },
    { id: 'restrictions', label: 'Ограничения', icon: 'AlertTriangle' }
  ];

  const mockParticipants = [
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      membershipStatus: 'active',
      paymentStatus: 'paid',
      joinDate: '2024-01-15',
      phone: '+7 (999) 123-45-67'
    },
    {
      id: 2,
      name: 'Михаил Сидоров',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      membershipStatus: 'expiring',
      paymentStatus: 'pending',
      joinDate: '2024-01-10',
      phone: '+7 (999) 234-56-78'
    },
    {
      id: 3,
      name: 'Елена Козлова',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      membershipStatus: 'active',
      paymentStatus: 'paid',
      joinDate: '2024-01-20',
      phone: '+7 (999) 345-67-89'
    }
  ];

  const mockPayments = [
    {
      id: 1,
      participantName: 'Анна Петрова',
      amount: 1500,
      status: 'paid',
      date: '2024-01-15',
      method: 'card'
    },
    {
      id: 2,
      participantName: 'Михаил Сидоров',
      amount: 1500,
      status: 'pending',
      date: '2024-01-10',
      method: 'cash'
    }
  ];

  const renderDetailsTab = () => (
    <div className="space-y-4">
      {/* Основная информация */}
      <div className="bg-secondary-50 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3">Основная информация</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Тип тренировки:</span>
            <p className="font-medium text-text-primary">{session.type}</p>
          </div>
          <div>
            <span className="text-text-secondary">Длительность:</span>
            <p className="font-medium text-text-primary">{session.duration} мин</p>
          </div>
          <div>
            <span className="text-text-secondary">Уровень:</span>
            <p className="font-medium text-text-primary">{session.level}</p>
          </div>
          <div>
            <span className="text-text-secondary">Зал:</span>
            <p className="font-medium text-text-primary">{session.room}</p>
          </div>
        </div>
      </div>

      {/* Описание */}
      <div>
        <h4 className="font-medium text-text-primary mb-2">Описание</h4>
        <p className="text-text-secondary text-sm leading-relaxed">
          {session.description || 'Описание не указано'}
        </p>
      </div>

      {/* Загрузка */}
      <div>
        <h4 className="font-medium text-text-primary mb-2">Загрузка</h4>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Участники</span>
              <span className={`font-medium ${getCapacityColor()}`}>
                {session.currentParticipants}/{session.maxParticipants}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  getCapacityPercentage() >= 90 ? 'bg-error' :
                  getCapacityPercentage() >= 70 ? 'bg-warning' :
                  getCapacityPercentage() >= 40 ? 'bg-primary' : 'bg-success'
                }`}
                style={{ width: `${getCapacityPercentage()}%` }}
              />
            </div>
          </div>
          <span className={`text-sm font-medium ${getCapacityColor()}`}>
            {getCapacityPercentage()}%
          </span>
        </div>
      </div>
    </div>
  );

  const renderParticipantsTab = () => (
    <div className="space-y-3">
      {mockParticipants.map(participant => (
        <div key={participant.id} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
          <Image
            src={participant.avatar}
            alt={participant.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-medium text-text-primary">{participant.name}</p>
            <p className="text-xs text-text-secondary">{participant.phone}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              participant.membershipStatus === 'active' ? 'bg-success-100 text-success' :
              participant.membershipStatus === 'expiring'? 'bg-warning-100 text-warning' : 'bg-error-100 text-error'
            }`}>
              {participant.membershipStatus === 'active' ? 'Активен' :
               participant.membershipStatus === 'expiring' ? 'Истекает' : 'Неактивен'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              participant.paymentStatus === 'paid' ? 'bg-success-100 text-success' : 'bg-warning-100 text-warning'
            }`}>
              {participant.paymentStatus === 'paid' ? 'Оплачено' : 'Ожидает'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-3">
      {mockPayments.map(payment => (
        <div key={payment.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
          <div>
            <p className="font-medium text-text-primary">{payment.participantName}</p>
            <p className="text-xs text-text-secondary">{payment.date}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-text-primary">{payment.amount} ₽</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              payment.status === 'paid' ? 'bg-success-100 text-success' : 'bg-warning-100 text-warning'
            }`}>
              {payment.status === 'paid' ? 'Оплачено' : 'Ожидает'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRestrictionsTab = () => (
    <div className="space-y-3">
      {session.hasRestrictions ? (
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-error-50 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
            <div>
              <p className="font-medium text-error">Превышен лимит тренировок</p>
              <p className="text-sm text-text-secondary">
                Участник Михаил Сидоров превысил недельный лимит в 2 тренировки
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-warning-50 rounded-lg">
            <Icon name="Clock" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="font-medium text-warning">Нарушение правил отмены</p>
              <p className="text-sm text-text-secondary">
                Попытка отмены менее чем за 6 часов до начала
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={32} className="text-success mx-auto mb-2" />
          <p className="text-text-secondary">Ограничений нет</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed right-0 top-16 bottom-0 w-96 bg-surface border-l border-border shadow-lg z-40 overflow-hidden">
      {/* Заголовок */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-text-primary">{session.title}</h3>
          <p className="text-sm text-text-secondary">
            {session.trainerName} • {session.day} {session.time}
          </p>
        </div>
        <Button variant="ghost" onClick={onClose} className="p-2">
          <Icon name="X" size={16} />
        </Button>
      </div>

      {/* Вкладки */}
      <div className="flex border-b border-border">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={tab.icon} size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Содержимое */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'participants' && renderParticipantsTab()}
        {activeTab === 'payments' && renderPaymentsTab()}
        {activeTab === 'restrictions' && renderRestrictionsTab()}
      </div>

      {/* Действия */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="primary"
            onClick={onEdit}
            iconName="Edit"
            className="flex-1"
          >
            Редактировать
          </Button>
          <Button
            variant="ghost"
            onClick={onManageParticipants}
            iconName="Users"
            className="flex-1"
          >
            Участники
          </Button>
        </div>
        <Button
          variant="danger"
          onClick={onDelete}
          iconName="Trash2"
          className="w-full mt-2"
        >
          Удалить сессию
        </Button>
      </div>
    </div>
  );
};

export default SessionDetailsPanel;