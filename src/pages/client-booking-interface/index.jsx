import React, { useState, useEffect } from 'react';
import ConversationalBot from './components/ConversationalBot';
import WeeklyCalendar from './components/WeeklyCalendar';
import SessionBookingModal from './components/SessionBookingModal';
import ClientNavigation from './components/ClientNavigation';
import BookingConfirmation from './components/BookingConfirmation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ClientBookingInterface = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookedSessions, setBookedSessions] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [latestBooking, setLatestBooking] = useState(null);
  const [activeView, setActiveView] = useState('calendar'); // calendar, bot, bookings
  const [notifications, setNotifications] = useState([]);

  // Mock user membership data
  const userMembership = {
    id: 'MEMBER_001',
    type: 'Премиум',
    expiryDate: '2024-12-31',
    weeklySessionsUsed: 1,
    weeklySessionsLimit: 2,
    status: 'active'
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: 'reminder',
      title: 'Напоминание о тренировке',
      message: 'Ваша тренировка "Йога" начнется через 2 часа',
      time: '2 часа',
      unread: true
    },
    {
      id: 2,
      type: 'membership',
      title: 'Продление членства',
      message: 'Ваше членство истекает через 15 дней',
      time: '1 день назад',
      unread: false
    }
  ];

  // Mock booked sessions
  const mockBookedSessions = [
    {
      id: 'BOOKING_001',
      sessionId: 4,
      date: '2024-12-17',
      time: '10:00',
      type: 'Йога',
      trainer: 'Анна Петрова',
      duration: 60,
      price: 1500,
      status: 'confirmed',
      room: 1
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setBookedSessions(mockBookedSessions);
  }, []);

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirm = (session) => {
    const newBooking = {
      id: `BOOKING_${Date.now()}`,
      sessionId: session.id,
      date: session.date,
      time: session.time,
      type: session.type,
      trainer: session.trainer,
      duration: session.duration,
      price: session.price,
      status: 'confirmed',
      room: Math.floor(Math.random() * 3) + 1
    };

    setBookedSessions(prev => [...prev, newBooking]);
    setLatestBooking(newBooking);
    setShowConfirmation(true);
    setIsBookingModalOpen(false);
    
    // Update weekly sessions count
    userMembership.weeklySessionsUsed += 1;

    // Add success notification
    const successNotification = {
      id: Date.now(),
      type: 'success',
      title: 'Запись подтверждена',
      message: `Вы записаны на ${session.type} на ${new Date(session.date).toLocaleDateString('ru-RU')}`,
      time: 'Только что',
      unread: true
    };
    setNotifications(prev => [successNotification, ...prev]);
  };

  const handleCancelBooking = (bookingId) => {
    setBookedSessions(prev => prev.filter(booking => booking.id !== bookingId));
    setShowConfirmation(false);
    userMembership.weeklySessionsUsed = Math.max(0, userMembership.weeklySessionsUsed - 1);
    
    // Add cancellation notification
    const cancelNotification = {
      id: Date.now(),
      type: 'info',
      title: 'Запись отменена',
      message: 'Ваша запись на тренировку была успешно отменена',
      time: 'Только что',
      unread: true
    };
    setNotifications(prev => [cancelNotification, ...prev]);
  };

  const handleBotBookingRequest = (sessionData) => {
    // Handle bot-initiated booking requests
    console.log('Bot booking request:', sessionData);
  };

  const getMembershipStatusColor = () => {
    const daysUntilExpiry = Math.ceil((new Date(userMembership.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry <= 7) return 'bg-error-50 border-error-200 text-error-700';
    if (daysUntilExpiry <= 30) return 'bg-warning-50 border-warning-200 text-warning-700';
    return 'bg-success-50 border-success-200 text-success-700';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <ClientNavigation notifications={notifications} />

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                Запись на тренировки
              </h1>
              <p className="text-text-secondary mt-1">
                Выберите удобное время для тренировок или воспользуйтесь помощником
              </p>
            </div>

            {/* View Toggle - Mobile */}
            <div className="flex bg-secondary-100 rounded-lg p-1 md:hidden">
              <Button
                variant={activeView === 'calendar' ? 'primary' : 'ghost'}
                onClick={() => setActiveView('calendar')}
                size="sm"
                className="flex-1"
              >
                <Icon name="Calendar" size={16} className="mr-1" />
                Календарь
              </Button>
              <Button
                variant={activeView === 'bot' ? 'primary' : 'ghost'}
                onClick={() => setActiveView('bot')}
                size="sm"
                className="flex-1"
              >
                <Icon name="Bot" size={16} className="mr-1" />
                Помощник
              </Button>
              <Button
                variant={activeView === 'bookings' ? 'primary' : 'ghost'}
                onClick={() => setActiveView('bookings')}
                size="sm"
                className="flex-1"
              >
                <Icon name="BookOpen" size={16} className="mr-1" />
                Записи
              </Button>
            </div>
          </div>

          {/* Membership Status Card */}
          <div className={`rounded-lg border p-4 ${getMembershipStatusColor()}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="CreditCard" size={24} />
                <div>
                  <h3 className="font-semibold">Членство: {userMembership.type}</h3>
                  <p className="text-sm opacity-80">
                    Действительно до {new Date(userMembership.expiryDate).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">
                  {userMembership.weeklySessionsUsed}/{userMembership.weeklySessionsLimit}
                </p>
                <p className="text-sm opacity-80">тренировок на неделе</p>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bot Interface */}
            <div className="lg:col-span-1">
              <ConversationalBot
                onBookingRequest={handleBotBookingRequest}
                userMembership={userMembership}
                availableSessions={[]}
              />
            </div>

            {/* Calendar */}
            <div className="lg:col-span-2">
              <WeeklyCalendar
                onSessionSelect={handleSessionSelect}
                userMembership={userMembership}
                bookedSessions={bookedSessions}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {activeView === 'calendar' && (
              <WeeklyCalendar
                onSessionSelect={handleSessionSelect}
                userMembership={userMembership}
                bookedSessions={bookedSessions}
              />
            )}

            {activeView === 'bot' && (
              <ConversationalBot
                onBookingRequest={handleBotBookingRequest}
                userMembership={userMembership}
                availableSessions={[]}
              />
            )}

            {activeView === 'bookings' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">Мои записи</h2>
                {bookedSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
                    <p className="text-text-secondary">У вас пока нет записей на тренировки</p>
                    <Button
                      variant="primary"
                      onClick={() => setActiveView('calendar')}
                      className="mt-4"
                    >
                      Записаться на тренировку
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookedSessions.map((booking) => (
                      <div key={booking.id} className="bg-surface rounded-lg border border-border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-text-primary">{booking.type}</h3>
                          <span className="text-sm text-text-secondary">
                            {new Date(booking.date).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-text-secondary">
                          <p>Тренер: {booking.trainer}</p>
                          <p>Время: {booking.time} ({booking.duration} мин)</p>
                          <p>Стоимость: {booking.price} ₽</p>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setLatestBooking(booking);
                              setShowConfirmation(true);
                            }}
                          >
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions - Desktop */}
          <div className="hidden md:block">
            <div className="bg-surface rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Быстрые действия</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <Icon name="Calendar" size={24} className="text-primary" />
                  <span className="font-medium">Мои записи</span>
                  <span className="text-sm text-text-secondary text-center">
                    Просмотр и управление записями
                  </span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <Icon name="CreditCard" size={24} className="text-primary" />
                  <span className="font-medium">Членство</span>
                  <span className="text-sm text-text-secondary text-center">
                    Управление подпиской
                  </span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <Icon name="HelpCircle" size={24} className="text-primary" />
                  <span className="font-medium">Помощь</span>
                  <span className="text-sm text-text-secondary text-center">
                    Поддержка и FAQ
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <SessionBookingModal
        session={selectedSession}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedSession(null);
        }}
        onConfirm={handleBookingConfirm}
        userMembership={userMembership}
      />

      {/* Booking Confirmation */}
      {showConfirmation && latestBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BookingConfirmation
              booking={latestBooking}
              onClose={() => setShowConfirmation(false)}
              onCancelBooking={handleCancelBooking}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientBookingInterface;