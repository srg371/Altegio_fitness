import React from 'react';
import Icon from '../../../components/AppIcon';

const SessionCard = ({ 
  session, 
  isSelected, 
  onSelect, 
  onDragStart, 
  isDragging 
}) => {
  const getCapacityColor = () => {
    const percentage = (session.currentParticipants / session.maxParticipants) * 100;
    if (percentage >= 90) return 'bg-error-50 border-error text-error';
    if (percentage >= 70) return 'bg-warning-50 border-warning text-warning';
    if (percentage >= 40) return 'bg-primary-50 border-primary text-primary';
    return 'bg-success-50 border-success text-success';
  };

  const getStatusIcon = () => {
    if (session.hasRestrictions) return 'AlertTriangle';
    if (session.isExpired) return 'Clock';
    if (session.isPaid) return 'CheckCircle';
    return 'Users';
  };

  const getStatusColor = () => {
    if (session.hasRestrictions) return 'text-error';
    if (session.isExpired) return 'text-warning';
    if (session.isPaid) return 'text-success';
    return 'text-text-secondary';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onSelect}
      className={`
        relative p-2 rounded-lg border cursor-move transition-all duration-200
        ${getCapacityColor()}
        ${isSelected ? 'ring-2 ring-primary ring-offset-1' : ''}
        ${isDragging ? 'opacity-50 scale-95' : 'hover:shadow-md'}
      `}
    >
      {/* Заголовок сессии */}
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-medium truncate flex-1">
          {session.title}
        </h4>
        <Icon 
          name={getStatusIcon()} 
          size={12} 
          className={getStatusColor()} 
        />
      </div>

      {/* Информация о тренере */}
      <div className="flex items-center space-x-1 mb-1">
        <Icon name="User" size={10} className="text-text-muted" />
        <span className="text-xs text-text-secondary truncate">
          {session.trainerName}
        </span>
      </div>

      {/* Участники */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={10} className="text-text-muted" />
          <span className="text-xs font-medium">
            {session.currentParticipants}/{session.maxParticipants}
          </span>
        </div>
        
        {/* Индикаторы статуса */}
        <div className="flex items-center space-x-1">
          {session.hasWaitingList && (
            <Icon name="Clock" size={10} className="text-warning" />
          )}
          {session.isRecurring && (
            <Icon name="Repeat" size={10} className="text-primary" />
          )}
          {session.hasPaymentIssues && (
            <Icon name="CreditCard" size={10} className="text-error" />
          )}
        </div>
      </div>

      {/* Полоса заполненности */}
      <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${(session.currentParticipants / session.maxParticipants) * 100}%`,
            backgroundColor: 'currentColor'
          }}
        />
      </div>

      {/* Индикатор перетаскивания */}
      {isDragging && (
        <div className="absolute inset-0 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center">
          <Icon name="Move" size={16} className="text-primary" />
        </div>
      )}
    </div>
  );
};

export default SessionCard;