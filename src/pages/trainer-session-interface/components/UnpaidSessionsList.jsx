import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UnpaidSessionsList = ({ unpaidSessions, onRecordPayment, onViewHistory }) => {
  const [expandedClient, setExpandedClient] = useState(null);

  const groupSessionsByClient = (sessions) => {
    return sessions.reduce((acc, session) => {
      const clientId = session.clientId;
      if (!acc[clientId]) {
        acc[clientId] = {
          clientName: session.clientName,
          clientPhone: session.clientPhone,
          totalOwed: 0,
          sessions: []
        };
      }
      acc[clientId].totalOwed += session.price;
      acc[clientId].sessions.push(session);
      return acc;
    }, {});
  };

  const groupedSessions = groupSessionsByClient(unpaidSessions);

  const toggleClientExpansion = (clientId) => {
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };

  const getOverdueStatus = (sessionDate) => {
    const today = new Date();
    const sessionDateObj = new Date(sessionDate);
    const daysDiff = Math.floor((today - sessionDateObj) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 30) return { status: 'critical', text: 'Критично', color: 'text-error' };
    if (daysDiff > 14) return { status: 'warning', text: 'Просрочено', color: 'text-warning' };
    if (daysDiff > 7) return { status: 'attention', text: 'Внимание', color: 'text-warning' };
    return { status: 'recent', text: 'Недавно', color: 'text-text-secondary' };
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-text-primary">
            Неоплаченные тренировки
          </h2>
          <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-medium">
            {unpaidSessions.length}
          </span>
        </div>
        <Button variant="ghost" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Экспорт
        </Button>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedSessions).map(([clientId, clientData]) => (
          <div key={clientId} className="border border-border rounded-lg overflow-hidden">
            <div
              onClick={() => toggleClientExpansion(clientId)}
              className="p-4 bg-secondary-50 cursor-pointer hover:bg-secondary-100 transition-smooth"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">
                      {clientData.clientName}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {clientData.clientPhone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-semibold text-error">
                      {clientData.totalOwed.toLocaleString('ru-RU')} ₽
                    </p>
                    <p className="text-xs text-text-secondary">
                      {clientData.sessions.length} тренировок
                    </p>
                  </div>
                  <Icon
                    name={expandedClient === clientId ? 'ChevronUp' : 'ChevronDown'}
                    size={20}
                    className="text-text-secondary"
                  />
                </div>
              </div>
            </div>

            {expandedClient === clientId && (
              <div className="p-4 space-y-3">
                {clientData.sessions.map((session) => {
                  const overdueStatus = getOverdueStatus(session.date);
                  return (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <p className="text-sm font-medium text-text-primary">
                            {new Date(session.date).toLocaleDateString('ru-RU', {
                              day: '2-digit',
                              month: '2-digit'
                            })}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {session.time}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {session.sessionType}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {session.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-semibold text-text-primary">
                            {session.price.toLocaleString('ru-RU')} ₽
                          </p>
                          <p className={`text-xs ${overdueStatus.color}`}>
                            {overdueStatus.text}
                          </p>
                        </div>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => onRecordPayment(session.id)}
                        >
                          <Icon name="CreditCard" size={14} className="mr-1" />
                          Оплатить
                        </Button>
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewHistory(clientId)}
                  >
                    <Icon name="History" size={16} className="mr-2" />
                    История платежей
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onRecordPayment(clientData.sessions.map(s => s.id))}
                  >
                    Оплатить все ({clientData.totalOwed.toLocaleString('ru-RU')} ₽)
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {unpaidSessions.length === 0 && (
        <div className="text-center py-12">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Все платежи актуальны
          </h3>
          <p className="text-text-secondary">
            У вас нет неоплаченных тренировок
          </p>
        </div>
      )}
    </div>
  );
};

export default UnpaidSessionsList;