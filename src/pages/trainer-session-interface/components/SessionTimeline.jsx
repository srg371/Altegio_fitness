import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionTimeline = ({ sessions, onMarkAttendance, onRecordPayment, onAddNotes, onSelectSession }) => {
  const [selectedSession, setSelectedSession] = useState(null);

  const getSessionStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success text-white';
      case 'in-progress': return 'bg-primary text-white';
      case 'upcoming': return 'bg-secondary-100 text-text-primary';
      case 'cancelled': return 'bg-error-100 text-error';
      default: return 'bg-secondary-100 text-text-primary';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-success';
      case 'pending': return 'text-warning';
      case 'overdue': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    onSelectSession(session);
  };

  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Сегодняшние тренировки
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {new Date().toLocaleDateString('ru-RU')}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => handleSessionClick(session)}
            className={`p-4 rounded-lg border cursor-pointer transition-smooth hover:shadow-md ${
              selectedSession?.id === session.id
                ? 'border-primary bg-primary-50' :'border-border bg-surface hover:bg-secondary-50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-text-primary">
                    {formatTime(session.startTime)}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {formatTime(session.endTime)}
                  </span>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div>
                  <h3 className="font-medium text-text-primary">
                    {session.clientName}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {session.sessionType}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSessionStatusColor(session.status)}`}>
                  {session.status === 'completed' && 'Завершено'}
                  {session.status === 'in-progress' && 'В процессе'}
                  {session.status === 'upcoming' && 'Предстоящая'}
                  {session.status === 'cancelled' && 'Отменено'}
                </span>
                <Icon
                  name={session.paymentStatus === 'paid' ? 'CheckCircle' : 'AlertCircle'}
                  size={16}
                  className={getPaymentStatusColor(session.paymentStatus)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Ruble" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {session.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {session.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {session.status === 'upcoming' && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAttendance(session.id);
                    }}
                  >
                    <Icon name="UserCheck" size={14} className="mr-1" />
                    Отметить
                  </Button>
                )}
                
                {session.paymentStatus !== 'paid' && (
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRecordPayment(session.id);
                    }}
                  >
                    <Icon name="CreditCard" size={14} className="mr-1" />
                    Оплата
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddNotes(session.id);
                  }}
                >
                  <Icon name="FileText" size={14} className="mr-1" />
                  Заметки
                </Button>
              </div>
            </div>

            {session.notes && (
              <div className="mt-3 p-2 bg-secondary-50 rounded text-sm text-text-secondary">
                <Icon name="MessageSquare" size={14} className="inline mr-1" />
                {session.notes}
              </div>
            )}
          </div>
        ))}
      </div>

      {sessions.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Нет тренировок на сегодня
          </h3>
          <p className="text-text-secondary">
            Ваше расписание на сегодня свободно
          </p>
        </div>
      )}
    </div>
  );
};

export default SessionTimeline;