import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SessionCard from './SessionCard';

const MobileScheduleView = ({ 
  sessions, 
  onSessionSelect, 
  selectedSession,
  filters,
  currentWeek 
}) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const weekDays = [
    { key: 'monday', label: 'Понедельник', short: 'ПН' },
    { key: 'tuesday', label: 'Вторник', short: 'ВТ' },
    { key: 'wednesday', label: 'Среда', short: 'СР' },
    { key: 'thursday', label: 'Четверг', short: 'ЧТ' },
    { key: 'friday', label: 'Пятница', short: 'ПТ' },
    { key: 'saturday', label: 'Суббота', short: 'СБ' },
    { key: 'sunday', label: 'Воскресенье', short: 'ВС' }
  ];

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const currentDay = weekDays[currentDayIndex];

  const getSessionsForDay = (day) => {
    return sessions.filter(session => 
      session.day === day &&
      (!filters.trainer || session.trainerId === filters.trainer) &&
      (!filters.sessionType || session.type === filters.sessionType) &&
      (!filters.capacity || getCapacityStatus(session) === filters.capacity)
    );
  };

  const getCapacityStatus = (session) => {
    const percentage = (session.currentParticipants / session.maxParticipants) * 100;
    if (percentage >= 90) return 'full';
    if (percentage >= 70) return 'high';
    if (percentage >= 40) return 'medium';
    return 'low';
  };

  const getSessionsForTimeSlot = (day, time) => {
    return getSessionsForDay(day).filter(session => session.time === time);
  };

  const goToPreviousDay = () => {
    setCurrentDayIndex(prev => prev > 0 ? prev - 1 : weekDays.length - 1);
  };

  const goToNextDay = () => {
    setCurrentDayIndex(prev => prev < weekDays.length - 1 ? prev + 1 : 0);
  };

  const getTotalSessionsForDay = (day) => {
    return getSessionsForDay(day).length;
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Навигация по дням */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-secondary-50">
        <Button
          variant="ghost"
          onClick={goToPreviousDay}
          className="p-2"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>

        <div className="text-center">
          <h3 className="font-semibold text-text-primary">{currentDay.label}</h3>
          <p className="text-sm text-text-secondary">
            {getTotalSessionsForDay(currentDay.key)} тренировок
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={goToNextDay}
          className="p-2"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>

      {/* Индикаторы дней */}
      <div className="flex justify-center space-x-2 p-3 border-b border-border">
        {weekDays.map((day, index) => (
          <button
            key={day.key}
            onClick={() => setCurrentDayIndex(index)}
            className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
              index === currentDayIndex
                ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
            }`}
          >
            {day.short}
          </button>
        ))}
      </div>

      {/* Расписание дня */}
      <div className="max-h-[500px] overflow-y-auto">
        {timeSlots.map(time => {
          const timeSessions = getSessionsForTimeSlot(currentDay.key, time);
          
          if (timeSessions.length === 0) return null;

          return (
            <div key={time} className="border-b border-border last:border-b-0">
              {/* Заголовок времени */}
              <div className="bg-secondary-50 px-4 py-2 border-b border-border">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-text-primary">{time}</span>
                  <span className="text-sm text-text-secondary">
                    {timeSessions.length} сессий
                  </span>
                </div>
              </div>

              {/* Сессии */}
              <div className="p-3 space-y-2">
                {timeSessions.map(session => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    isSelected={selectedSession?.id === session.id}
                    onSelect={() => onSessionSelect(session)}
                    onDragStart={() => {}} // Отключаем drag на мобильных
                    isDragging={false}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Пустое состояние */}
        {getSessionsForDay(currentDay.key).length === 0 && (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="font-medium text-text-primary mb-2">
              Нет тренировок
            </h3>
            <p className="text-text-secondary text-sm">
              На {currentDay.label.toLowerCase()} тренировки не запланированы
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileScheduleView;