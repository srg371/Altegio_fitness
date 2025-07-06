import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeeklyCalendar = ({ onSessionSelect, userMembership, bookedSessions }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState(null);
  const [availableSessions, setAvailableSessions] = useState([]);

  const mockSessions = [
    {
      id: 1,
      date: '2024-12-16',
      time: '09:00',
      duration: 60,
      type: 'Йога',
      trainer: 'Анна Петрова',
      capacity: 12,
      booked: 8,
      price: 1500,
      level: 'Начинающий',
      description: 'Утренняя йога для начинающих'
    },
    {
      id: 2,
      date: '2024-12-16',
      time: '11:00',
      duration: 45,
      type: 'Пилатес',
      trainer: 'Мария Сидорова',
      capacity: 10,
      booked: 6,
      price: 1800,
      level: 'Средний',
      description: 'Пилатес для укрепления мышц'
    },
    {
      id: 3,
      date: '2024-12-16',
      time: '18:00',
      duration: 60,
      type: 'Силовая тренировка',
      trainer: 'Алексей Иванов',
      capacity: 8,
      booked: 8,
      price: 2000,
      level: 'Продвинутый',
      description: 'Интенсивная силовая тренировка'
    },
    {
      id: 4,
      date: '2024-12-17',
      time: '10:00',
      duration: 60,
      type: 'Йога',
      trainer: 'Анна Петрова',
      capacity: 12,
      booked: 5,
      price: 1500,
      level: 'Средний',
      description: 'Хатха йога'
    },
    {
      id: 5,
      date: '2024-12-17',
      time: '19:00',
      duration: 45,
      type: 'Зумба',
      trainer: 'Елена Козлова',
      capacity: 15,
      booked: 12,
      price: 1200,
      level: 'Любой',
      description: 'Танцевальная фитнес-программа'
    },
    {
      id: 6,
      date: '2024-12-18',
      time: '08:00',
      duration: 60,
      type: 'Кроссфит',
      trainer: 'Дмитрий Волков',
      capacity: 10,
      booked: 7,
      price: 2200,
      level: 'Продвинутый',
      description: 'Функциональный тренинг'
    },
    {
      id: 7,
      date: '2024-12-18',
      time: '12:00',
      duration: 60,
      type: 'Йога',
      trainer: 'Анна Петрова',
      capacity: 12,
      booked: 4,
      price: 1500,
      level: 'Начинающий',
      description: 'Восстановительная йога'
    },
    {
      id: 8,
      date: '2024-12-19',
      time: '17:00',
      duration: 45,
      type: 'Пилатес',
      trainer: 'Мария Сидорова',
      capacity: 10,
      booked: 3,
      price: 1800,
      level: 'Начинающий',
      description: 'Пилатес для новичков'
    }
  ];

  useEffect(() => {
    setAvailableSessions(mockSessions);
  }, []);

  const getWeekDays = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(currentWeek);
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getSessionsForDate = (date) => {
    const dateStr = formatDate(date);
    return availableSessions.filter(session => session.date === dateStr);
  };

  const isSessionBooked = (sessionId) => {
    return bookedSessions.some(booking => booking.sessionId === sessionId);
  };

  const canBookSession = (session) => {
    const sessionDate = new Date(session.date + 'T' + session.time);
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const membershipExpiry = new Date(userMembership.expiryDate);
    const sixHoursFromNow = new Date(now.getTime() + 6 * 60 * 60 * 1000);

    // Check if session is within 1 week
    if (sessionDate > oneWeekFromNow) return { canBook: false, reason: 'Запись возможна только на неделю вперед' };
    
    // Check if membership is valid
    if (sessionDate > membershipExpiry) return { canBook: false, reason: 'Членство истекает до даты тренировки' };
    
    // Check weekly limit
    if (userMembership.weeklySessionsUsed >= 2) return { canBook: false, reason: 'Достигнут лимит тренировок на неделю (2)' };
    
    // Check if session is full
    if (session.booked >= session.capacity) return { canBook: false, reason: 'Нет свободных мест' };
    
    // Check if already booked
    if (isSessionBooked(session.id)) return { canBook: false, reason: 'Вы уже записаны на эту тренировку' };

    return { canBook: true, reason: null };
  };

  const getSessionStatusColor = (session) => {
    const { canBook } = canBookSession(session);
    if (!canBook) return 'bg-error-50 border-error-200';
    if (session.booked >= session.capacity * 0.8) return 'bg-warning-50 border-warning-200';
    return 'bg-success-50 border-success-200';
  };

  const getCapacityColor = (session) => {
    const percentage = (session.booked / session.capacity) * 100;
    if (percentage >= 100) return 'text-error';
    if (percentage >= 80) return 'text-warning';
    return 'text-success';
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    if (onSessionSelect) {
      onSessionSelect(session);
    }
  };

  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newWeek);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Расписание тренировок</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigateWeek(-1)}
              className="p-2"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <span className="text-sm font-medium text-text-primary px-3">
              {weekDays[0].toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })} - {weekDays[6].toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
            </span>
            <Button
              variant="ghost"
              onClick={() => navigateWeek(1)}
              className="p-2"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        {/* Membership Status */}
        <div className="bg-primary-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Статус членства</p>
              <p className="text-xs text-text-secondary">
                Действительно до {new Date(userMembership.expiryDate).toLocaleDateString('ru-RU')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary">
                {userMembership.weeklySessionsUsed}/2
              </p>
              <p className="text-xs text-text-secondary">тренировок на неделе</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weekDays.map((day, index) => {
            const sessions = getSessionsForDate(day);
            const isCurrentDay = isToday(day);
            const isPast = isPastDate(day);

            return (
              <div
                key={index}
                className={`border rounded-lg p-3 ${
                  isCurrentDay ? 'border-primary bg-primary-50' : 'border-border'
                } ${isPast ? 'opacity-50' : ''}`}
              >
                <div className="text-center mb-3">
                  <p className={`text-sm font-medium ${
                    isCurrentDay ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {dayNames[index]}
                  </p>
                  <p className={`text-lg font-semibold ${
                    isCurrentDay ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {day.getDate()}
                  </p>
                </div>

                <div className="space-y-2">
                  {sessions.length === 0 ? (
                    <p className="text-xs text-text-muted text-center py-4">
                      Нет тренировок
                    </p>
                  ) : (
                    sessions.map((session) => {
                      const { canBook, reason } = canBookSession(session);
                      
                      return (
                        <div
                          key={session.id}
                          onClick={() => !isPast && handleSessionClick(session)}
                          className={`p-2 rounded border cursor-pointer transition-smooth hover:shadow-sm ${
                            getSessionStatusColor(session)
                          } ${isPast ? 'cursor-not-allowed' : ''}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-text-primary">
                              {session.time}
                            </span>
                            <span className={`text-xs ${getCapacityColor(session)}`}>
                              {session.booked}/{session.capacity}
                            </span>
                          </div>
                          
                          <p className="text-xs font-medium text-text-primary mb-1">
                            {session.type}
                          </p>
                          
                          <p className="text-xs text-text-secondary mb-1">
                            {session.trainer}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-text-muted">
                              {session.duration} мин
                            </span>
                            <span className="text-xs font-medium text-text-primary">
                              {session.price} ₽
                            </span>
                          </div>

                          {!canBook && (
                            <p className="text-xs text-error mt-1 font-medium">
                              {reason}
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-200 rounded"></div>
            <span className="text-text-secondary">Доступно</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning-200 rounded"></div>
            <span className="text-text-secondary">Мало мест</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error-200 rounded"></div>
            <span className="text-text-secondary">Недоступно</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;