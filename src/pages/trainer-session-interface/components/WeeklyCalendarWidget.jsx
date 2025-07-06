import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeeklyCalendarWidget = ({ weekSessions, onDateSelect, onSessionClick }) => {
  const [currentWeek, setCurrentWeek] = useState(0); // 0 = current week, 1 = next week

  const getWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (weekOffset * 7)); // Monday
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(currentWeek);
  const today = new Date();

  const getSessionsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return weekSessions.filter(session => session.date === dateStr);
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('ru-RU', { weekday: 'short' });
  };

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const getCapacityColor = (sessionCount) => {
    if (sessionCount === 0) return 'bg-secondary-100';
    if (sessionCount <= 2) return 'bg-success-100';
    if (sessionCount <= 4) return 'bg-warning-100';
    return 'bg-error-100';
  };

  const getCapacityTextColor = (sessionCount) => {
    if (sessionCount === 0) return 'text-text-secondary';
    if (sessionCount <= 2) return 'text-success';
    if (sessionCount <= 4) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Расписание на неделю
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
            disabled={currentWeek === 0}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <span className="text-sm text-text-secondary px-2">
            {currentWeek === 0 ? 'Эта неделя' : 'Следующая неделя'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentWeek(Math.min(1, currentWeek + 1))}
            disabled={currentWeek === 1}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => {
          const sessions = getSessionsForDate(date);
          const sessionCount = sessions.length;
          
          return (
            <div
              key={index}
              onClick={() => onDateSelect(date)}
              className={`p-3 rounded-lg cursor-pointer transition-smooth hover:shadow-md ${
                isToday(date)
                  ? 'bg-primary-50 border-2 border-primary'
                  : `${getCapacityColor(sessionCount)} border border-border hover:border-primary`
              }`}
            >
              <div className="text-center">
                <p className={`text-xs font-medium mb-1 ${
                  isToday(date) ? 'text-primary' : 'text-text-secondary'
                }`}>
                  {getDayName(date)}
                </p>
                <p className={`text-lg font-semibold mb-2 ${
                  isToday(date) ? 'text-primary' : 'text-text-primary'
                }`}>
                  {date.getDate()}
                </p>
                
                {sessionCount > 0 ? (
                  <div className="space-y-1">
                    <div className={`text-xs font-medium ${getCapacityTextColor(sessionCount)}`}>
                      {sessionCount} тренировок
                    </div>
                    {sessions.slice(0, 2).map((session, sessionIndex) => (
                      <div
                        key={sessionIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSessionClick(session);
                        }}
                        className="text-xs p-1 bg-white rounded border hover:bg-secondary-50 transition-smooth"
                      >
                        <div className="font-medium text-text-primary truncate">
                          {session.time}
                        </div>
                        <div className="text-text-secondary truncate">
                          {session.clientName}
                        </div>
                      </div>
                    ))}
                    {sessionCount > 2 && (
                      <div className="text-xs text-text-secondary">
                        +{sessionCount - 2} еще
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-text-muted">
                    Свободно
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Week Summary */}
      <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-text-primary">
                {weekSessions.length}
              </p>
              <p className="text-xs text-text-secondary">Всего тренировок</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-success">
                {weekSessions.filter(s => s.status === 'completed').length}
              </p>
              <p className="text-xs text-text-secondary">Завершено</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-primary">
                {weekSessions.filter(s => s.status === 'upcoming').length}
              </p>
              <p className="text-xs text-text-secondary">Предстоящих</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-semibold text-text-primary">
              {weekSessions.reduce((sum, session) => sum + session.price, 0).toLocaleString('ru-RU')} ₽
            </p>
            <p className="text-xs text-text-secondary">Потенциальный доход</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex items-center justify-between">
        <Button variant="ghost" size="sm">
          <Icon name="Calendar" size={16} className="mr-2" />
          Открыть календарь
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить тренировку
        </Button>
      </div>
    </div>
  );
};

export default WeeklyCalendarWidget;