import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SessionTimeline from './components/SessionTimeline';
import UnpaidSessionsList from './components/UnpaidSessionsList';
import ClientDetailsPanel from './components/ClientDetailsPanel';
import WeeklyCalendarWidget from './components/WeeklyCalendarWidget';
import PaymentTrackingDashboard from './components/PaymentTrackingDashboard';
import NotificationCenter from './components/NotificationCenter';

const TrainerSessionInterface = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('today');
  const [notifications, setNotifications] = useState([]);

  // Mock data for today's sessions
  const todaySessions = [
    {
      id: 1,
      clientId: 'client1',
      clientName: 'Анна Петрова',
      clientPhone: '+7 (999) 123-45-67',
      sessionType: 'Персональная тренировка',
      startTime: '09:00',
      endTime: '10:00',
      price: 3000,
      location: 'Зал №1',
      status: 'upcoming',
      paymentStatus: 'paid',
      notes: ''
    },
    {
      id: 2,
      clientId: 'client2',
      clientName: 'Михаил Сидоров',
      clientPhone: '+7 (999) 234-56-78',
      sessionType: 'Функциональная тренировка',
      startTime: '11:00',
      endTime: '12:00',
      price: 2500,
      location: 'Зал №2',
      status: 'in-progress',
      paymentStatus: 'pending',
      notes: 'Работаем над техникой приседаний'
    },
    {
      id: 3,
      clientId: 'client3',
      clientName: 'Елена Козлова',
      clientPhone: '+7 (999) 345-67-89',
      sessionType: 'Кардио тренировка',
      startTime: '14:00',
      endTime: '15:00',
      price: 2000,
      location: 'Кардио зона',
      status: 'upcoming',
      paymentStatus: 'overdue',
      notes: ''
    },
    {
      id: 4,
      clientId: 'client4',
      clientName: 'Дмитрий Волков',
      clientPhone: '+7 (999) 456-78-90',
      sessionType: 'Силовая тренировка',
      startTime: '16:00',
      endTime: '17:00',
      price: 3500,
      location: 'Зал №1',
      status: 'completed',
      paymentStatus: 'paid',
      notes: 'Отличная тренировка, увеличили веса'
    }
  ];

  // Mock data for unpaid sessions
  const unpaidSessions = [
    {
      id: 5,
      clientId: 'client3',
      clientName: 'Елена Козлова',
      clientPhone: '+7 (999) 345-67-89',
      sessionType: 'Кардио тренировка',
      date: '2024-01-15',
      time: '14:00',
      price: 2000,
      location: 'Кардио зона'
    },
    {
      id: 6,
      clientId: 'client3',
      clientName: 'Елена Козлова',
      clientPhone: '+7 (999) 345-67-89',
      sessionType: 'Персональная тренировка',
      date: '2024-01-10',
      time: '15:00',
      price: 3000,
      location: 'Зал №1'
    },
    {
      id: 7,
      clientId: 'client5',
      clientName: 'Игорь Смирнов',
      clientPhone: '+7 (999) 567-89-01',
      sessionType: 'Функциональная тренировка',
      date: '2024-01-12',
      time: '10:00',
      price: 2500,
      location: 'Зал №2'
    }
  ];

  // Mock data for weekly sessions
  const weekSessions = [
    {
      id: 8,
      date: '2024-01-22',
      time: '09:00',
      clientName: 'Анна Петрова',
      sessionType: 'Персональная',
      status: 'upcoming',
      price: 3000
    },
    {
      id: 9,
      date: '2024-01-22',
      time: '11:00',
      clientName: 'Михаил Сидоров',
      sessionType: 'Функциональная',
      status: 'upcoming',
      price: 2500
    },
    {
      id: 10,
      date: '2024-01-23',
      time: '14:00',
      clientName: 'Елена Козлова',
      sessionType: 'Кардио',
      status: 'upcoming',
      price: 2000
    },
    {
      id: 11,
      date: '2024-01-24',
      time: '16:00',
      clientName: 'Дмитрий Волков',
      sessionType: 'Силовая',
      status: 'upcoming',
      price: 3500
    }
  ];

  // Mock client data
  const clientsData = {
    client1: {
      id: 'client1',
      name: 'Анна Петрова',
      phone: '+7 (999) 123-45-67',
      email: 'anna.petrova@email.com',
      membershipType: 'Премиум',
      membershipStatus: 'active',
      membershipExpiry: '2024-06-15',
      remainingSessions: 12,
      overdueAmount: 0,
      lastPaymentDate: '2024-01-15',
      totalPaid: 45000,
      telegramUsername: 'anna_petrova',
      recentSessions: [
        { type: 'Персональная тренировка', date: '2024-01-18', attended: true },
        { type: 'Кардио тренировка', date: '2024-01-16', attended: true },
        { type: 'Силовая тренировка', date: '2024-01-14', attended: false }
      ]
    },
    client2: {
      id: 'client2',
      name: 'Михаил Сидоров',
      phone: '+7 (999) 234-56-78',
      email: 'mikhail.sidorov@email.com',
      membershipType: 'Стандарт',
      membershipStatus: 'active',
      membershipExpiry: '2024-04-20',
      remainingSessions: 8,
      overdueAmount: 2500,
      lastPaymentDate: '2024-01-01',
      totalPaid: 25000,
      telegramUsername: 'mikhail_s',
      recentSessions: [
        { type: 'Функциональная тренировка', date: '2024-01-17', attended: true },
        { type: 'Персональная тренировка', date: '2024-01-15', attended: true }
      ]
    },
    client3: {
      id: 'client3',
      name: 'Елена Козлова',
      phone: '+7 (999) 345-67-89',
      email: 'elena.kozlova@email.com',
      membershipType: 'Базовый',
      membershipStatus: 'expiring',
      membershipExpiry: '2024-02-01',
      remainingSessions: 3,
      overdueAmount: 5000,
      lastPaymentDate: '2023-12-15',
      totalPaid: 15000,
      telegramUsername: 'elena_k',
      recentSessions: [
        { type: 'Кардио тренировка', date: '2024-01-16', attended: false },
        { type: 'Персональная тренировка', date: '2024-01-12', attended: true }
      ]
    }
  };

  // Mock payment data
  const paymentData = {
    commissionRate: 40,
    payments: [
      {
        id: 1,
        clientName: 'Анна Петрова',
        sessionType: 'Персональная тренировка',
        amount: 3000,
        status: 'paid',
        date: '2024-01-20'
      },
      {
        id: 2,
        clientName: 'Михаил Сидоров',
        sessionType: 'Функциональная тренировка',
        amount: 2500,
        status: 'pending',
        date: '2024-01-19'
      },
      {
        id: 3,
        clientName: 'Елена Козлова',
        sessionType: 'Кардио тренировка',
        amount: 2000,
        status: 'overdue',
        date: '2024-01-15'
      }
    ]
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: 'session_reminder',
      message: 'Тренировка с Анной Петровой через 30 минут',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      actionType: 'view_session',
      actionData: { sessionId: 1 },
      actionText: 'Посмотреть'
    },
    {
      id: 2,
      type: 'payment_received',
      message: 'Получен платеж от Дмитрия Волкова - 3500 ₽',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionType: 'view_payment',
      actionData: { paymentId: 1 },
      actionText: 'Подробнее'
    },
    {
      id: 3,
      type: 'payment_overdue',
      message: 'Просроченный платеж от Елены Козловой - 5000 ₽',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      actionType: 'contact_client',
      actionData: { clientId: 'client3' },
      actionText: 'Связаться'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const handleMarkAttendance = (sessionId) => {
    console.log('Marking attendance for session:', sessionId);
    // Implementation for marking attendance
  };

  const handleRecordPayment = (sessionId) => {
    console.log('Recording payment for session:', sessionId);
    // Implementation for recording payment
  };

  const handleAddNotes = (sessionId) => {
    console.log('Adding notes for session:', sessionId);
    // Implementation for adding notes
  };

  const handleSelectSession = (session) => {
    const client = clientsData[session.clientId];
    setSelectedClient(client);
  };

  const handleViewHistory = (clientId) => {
    console.log('Viewing history for client:', clientId);
    // Implementation for viewing client history
  };

  const handleContactClient = (clientId, type = 'general') => {
    console.log('Contacting client:', clientId, 'Type:', type);
    // Implementation for contacting client
  };

  const handleViewFullHistory = (clientId) => {
    console.log('Viewing full history for client:', clientId);
    // Implementation for viewing full client history
  };

  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
    // Implementation for date selection
  };

  const handleSessionClick = (session) => {
    console.log('Clicked session:', session);
    // Implementation for session click
  };

  const handleSendReminder = (paymentId) => {
    console.log('Sending reminder for payment:', paymentId);
    // Implementation for sending payment reminder
  };

  const handleNotificationMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev =>
      prev.filter(n => n.id !== notificationId)
    );
  };

  const handleNotificationAction = (actionType, actionData) => {
    console.log('Notification action:', actionType, actionData);
    // Implementation for notification actions
  };

  const tabs = [
    { id: 'today', label: 'Сегодня', icon: 'Calendar' },
    { id: 'payments', label: 'Платежи', icon: 'CreditCard' },
    { id: 'schedule', label: 'Расписание', icon: 'Clock' },
    { id: 'unpaid', label: 'Долги', icon: 'AlertTriangle' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Интерфейс тренера
            </h1>
            <p className="text-text-secondary mt-1">
              Управление тренировками и клиентами
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={handleNotificationMarkAsRead}
              onDismiss={handleNotificationDismiss}
              onAction={handleNotificationAction}
            />
            <Button variant="primary">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить тренировку
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 mt-6">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'today' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SessionTimeline
                sessions={todaySessions}
                onMarkAttendance={handleMarkAttendance}
                onRecordPayment={handleRecordPayment}
                onAddNotes={handleAddNotes}
                onSelectSession={handleSelectSession}
              />
            </div>
            <div>
              <ClientDetailsPanel
                client={selectedClient}
                onClose={() => setSelectedClient(null)}
                onContactClient={handleContactClient}
                onViewFullHistory={handleViewFullHistory}
              />
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="max-w-4xl mx-auto">
            <PaymentTrackingDashboard
              paymentData={paymentData}
              onRecordPayment={handleRecordPayment}
              onSendReminder={handleSendReminder}
            />
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="max-w-4xl mx-auto">
            <WeeklyCalendarWidget
              weekSessions={weekSessions}
              onDateSelect={handleDateSelect}
              onSessionClick={handleSessionClick}
            />
          </div>
        )}

        {activeTab === 'unpaid' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <UnpaidSessionsList
                unpaidSessions={unpaidSessions}
                onRecordPayment={handleRecordPayment}
                onViewHistory={handleViewHistory}
              />
            </div>
            <div>
              <ClientDetailsPanel
                client={selectedClient}
                onClose={() => setSelectedClient(null)}
                onContactClient={handleContactClient}
                onViewFullHistory={handleViewFullHistory}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerSessionInterface;