import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SessionCard from './SessionCard';
import TimeSlotHeader from './TimeSlotHeader';

const WeeklyScheduleGrid = ({ 
  sessions, 
  onSessionMove, 
  onSessionSelect, 
  selectedSession,
  filters,
  currentWeek 
}) => {
  const [draggedSession, setDraggedSession] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [conflictDetails, setConflictDetails] = useState(null);
  const gridRef = useRef(null);

  // Временные слоты с 6:00 до 22:00
  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  // Дни недели
  const weekDays = [
    { key: 'monday', label: 'Понедельник', short: 'ПН' },
    { key: 'tuesday', label: 'Вторник', short: 'ВТ' },
    { key: 'wednesday', label: 'Среда', short: 'СР' },
    { key: 'thursday', label: 'Четверг', short: 'ЧТ' },
    { key: 'friday', label: 'Пятница', short: 'ПТ' },
    { key: 'saturday', label: 'Суббота', short: 'СБ' },
    { key: 'sunday', label: 'Воскресенье', short: 'ВС' }
  ];

  const getSessionsForSlot = (day, time) => {
    return sessions.filter(session => 
      session.day === day && 
      session.time === time &&
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

  const handleDragStart = (e, session) => {
    setDraggedSession(session);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
  };

  const handleDragOver = (e, day, time) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlot({ day, time });
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e, targetDay, targetTime) => {
    e.preventDefault();
    setDragOverSlot(null);

    if (!draggedSession) return;

    // Проверка конфликтов
    const existingSessions = getSessionsForSlot(targetDay, targetTime);
    const hasConflict = existingSessions.some(session => 
      session.trainerId === draggedSession.trainerId && 
      session.id !== draggedSession.id
    );

    if (hasConflict) {
      setConflictDetails({
        session: draggedSession,
        targetDay,
        targetTime,
        conflictingSessions: existingSessions
      });
      setIsConflictModalOpen(true);
      setDraggedSession(null);
      return;
    }

    // Перемещение сессии
    onSessionMove(draggedSession.id, targetDay, targetTime);
    setDraggedSession(null);
  };

  const handleConflictResolve = (action) => {
    if (action === 'force' && conflictDetails) {
      onSessionMove(conflictDetails.session.id, conflictDetails.targetDay, conflictDetails.targetTime);
    }
    setIsConflictModalOpen(false);
    setConflictDetails(null);
  };

  const isDragOverSlot = (day, time) => {
    return dragOverSlot && dragOverSlot.day === day && dragOverSlot.time === time;
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Заголовок сетки */}
      <div className="grid grid-cols-8 bg-secondary-50 border-b border-border">
        <div className="p-3 border-r border-border">
          <span className="text-sm font-medium text-text-secondary">Время</span>
        </div>
        {weekDays.map(day => (
          <div key={day.key} className="p-3 border-r border-border last:border-r-0">
            <div className="text-center">
              <div className="text-sm font-medium text-text-primary">{day.short}</div>
              <div className="text-xs text-text-secondary mt-1">{day.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Сетка расписания */}
      <div ref={gridRef} className="overflow-auto max-h-[600px]">
        {timeSlots.map(time => (
          <div key={time} className="grid grid-cols-8 border-b border-border last:border-b-0">
            {/* Заголовок времени */}
            <TimeSlotHeader time={time} />
            
            {/* Слоты для каждого дня */}
            {weekDays.map(day => {
              const slotSessions = getSessionsForSlot(day.key, time);
              const isDropZone = isDragOverSlot(day.key, time);
              
              return (
                <div
                  key={`${day.key}-${time}`}
                  className={`min-h-[80px] p-2 border-r border-border last:border-r-0 transition-colors ${
                    isDropZone ? 'bg-primary-50 border-primary' : 'hover:bg-secondary-50'
                  }`}
                  onDragOver={(e) => handleDragOver(e, day.key, time)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, day.key, time)}
                >
                  <div className="space-y-1">
                    {slotSessions.map(session => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        isSelected={selectedSession?.id === session.id}
                        onSelect={() => onSessionSelect(session)}
                        onDragStart={(e) => handleDragStart(e, session)}
                        isDragging={draggedSession?.id === session.id}
                      />
                    ))}
                    
                    {/* Индикатор зоны сброса */}
                    {isDropZone && (
                      <div className="border-2 border-dashed border-primary rounded-lg p-2 text-center">
                        <Icon name="Plus" size={16} className="text-primary mx-auto" />
                        <span className="text-xs text-primary">Переместить сюда</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Модальное окно конфликта */}
      {isConflictModalOpen && conflictDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-warning" />
              <h3 className="text-lg font-semibold text-text-primary">
                Конфликт расписания
              </h3>
            </div>
            
            <div className="mb-6">
              <p className="text-text-secondary mb-3">
                Обнаружен конфликт при перемещении тренировки:
              </p>
              <div className="bg-warning-50 rounded-lg p-3 mb-3">
                <p className="font-medium text-warning">
                  {conflictDetails.session.title}
                </p>
                <p className="text-sm text-text-secondary">
                  Тренер: {conflictDetails.session.trainerName}
                </p>
              </div>
              <p className="text-sm text-text-secondary">
                В выбранном временном слоте уже есть тренировка этого тренера.
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="ghost"
                onClick={() => handleConflictResolve('cancel')}
                className="flex-1"
              >
                Отменить
              </Button>
              <Button
                variant="warning"
                onClick={() => handleConflictResolve('force')}
                className="flex-1"
              >
                Переместить принудительно
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyScheduleGrid;