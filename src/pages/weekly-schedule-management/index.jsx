import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import WeeklyScheduleGrid from './components/WeeklyScheduleGrid';
import ScheduleFilters from './components/ScheduleFilters';
import SessionDetailsPanel from './components/SessionDetailsPanel';
import WeekNavigation from './components/WeekNavigation';
import BulkOperationsToolbar from './components/BulkOperationsToolbar';
import MobileScheduleView from './components/MobileScheduleView';

const WeeklyScheduleManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday;
  });

  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [filters, setFilters] = useState({
    trainer: '',
    sessionType: '',
    capacity: '',
    status: '',
    search: '',
    showWaitingList: false,
    showPaymentIssues: false
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  // Проверка мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Мок данные тренеров
  const mockTrainers = [
    { id: 1, name: 'Анна Петрова', specialization: 'Йога' },
    { id: 2, name: 'Михаил Сидоров', specialization: 'Силовые тренировки' },
    { id: 3, name: 'Елена Козлова', specialization: 'Кардио' },
    { id: 4, name: 'Дмитрий Волков', specialization: 'Функциональный тренинг' },
    { id: 5, name: 'Ольга Морозова', specialization: 'Пилатес' }
  ];

  // Мок данные типов тренировок
  const mockSessionTypes = [
    { id: 1, name: 'Йога', duration: 60, maxParticipants: 15 },
    { id: 2, name: 'Силовые тренировки', duration: 90, maxParticipants: 8 },
    { id: 3, name: 'Кардио', duration: 45, maxParticipants: 20 },
    { id: 4, name: 'Функциональный тренинг', duration: 60, maxParticipants: 12 },
    { id: 5, name: 'Пилатес', duration: 60, maxParticipants: 10 },
    { id: 6, name: 'Аквааэробика', duration: 45, maxParticipants: 15 }
  ];

  // Мок данные сессий
  const mockSessions = [
    {
      id: 1,
      title: 'Утренняя йога',
      type: 'Йога',
      trainerId: 1,
      trainerName: 'Анна Петрова',
      day: 'monday',
      time: '08:00',
      duration: 60,
      maxParticipants: 15,
      currentParticipants: 12,
      room: 'Зал 1',
      level: 'Начинающий',
      description: `Спокойная утренняя практика йоги для начинающих.\nФокус на дыхании и базовых асанах.\nПодходит для всех уровней подготовки.`,
      isPaid: true,
      isRecurring: true,
      hasWaitingList: false,
      hasPaymentIssues: false,
      hasRestrictions: false,
      isExpired: false
    },
    {
      id: 2,
      title: 'Силовая тренировка',
      type: 'Силовые тренировки',
      trainerId: 2,
      trainerName: 'Михаил Сидоров',
      day: 'monday',
      time: '18:00',
      duration: 90,
      maxParticipants: 8,
      currentParticipants: 8,
      room: 'Тренажерный зал',
      level: 'Продвинутый',
      description: `Интенсивная силовая тренировка с использованием свободных весов.\nРабота над всеми группами мышц.\nТребуется базовая подготовка.`,
      isPaid: true,
      isRecurring: true,
      hasWaitingList: true,
      hasPaymentIssues: false,
      hasRestrictions: false,
      isExpired: false
    },
    {
      id: 3,
      title: 'Кардио микс',
      type: 'Кардио',
      trainerId: 3,
      trainerName: 'Елена Козлова',
      day: 'tuesday',
      time: '19:00',
      duration: 45,
      maxParticipants: 20,
      currentParticipants: 15,
      room: 'Зал 2',
      level: 'Средний',
      description: `Динамичная кардио тренировка с элементами танца.\nВысокая интенсивность и отличное настроение.\nПодходит для среднего уровня подготовки.`,
      isPaid: false,
      isRecurring: true,
      hasWaitingList: false,
      hasPaymentIssues: true,
      hasRestrictions: false,
      isExpired: false
    },
    {
      id: 4,
      title: 'Функциональный тренинг',
      type: 'Функциональный тренинг',
      trainerId: 4,
      trainerName: 'Дмитрий Волков',
      day: 'wednesday',
      time: '20:00',
      duration: 60,
      maxParticipants: 12,
      currentParticipants: 10,
      room: 'Зал 3',
      level: 'Средний',
      description: `Функциональные движения для развития силы и координации.\nИспользование различного оборудования.\nПодходит для среднего и продвинутого уровня.`,
      isPaid: true,
      isRecurring: true,
      hasWaitingList: false,
      hasPaymentIssues: false,
      hasRestrictions: true,
      isExpired: false
    },
    {
      id: 5,
      title: 'Вечерний пилатес',
      type: 'Пилатес',
      trainerId: 5,
      trainerName: 'Ольга Морозова',
      day: 'thursday',
      time: '19:30',
      duration: 60,
      maxParticipants: 10,
      currentParticipants: 7,
      room: 'Зал 1',
      level: 'Начинающий',
      description: `Спокойная вечерняя практика пилатеса.\nУкрепление мышц кора и улучшение гибкости.\nИдеально для завершения дня.`,
      isPaid: true,
      isRecurring: true,
      hasWaitingList: false,
      hasPaymentIssues: false,
      hasRestrictions: false,
      isExpired: false
    },
    {
      id: 6,
      title: 'Утреннее кардио',
      type: 'Кардио',
      trainerId: 3,
      trainerName: 'Елена Козлова',
      day: 'friday',
      time: '07:00',
      duration: 45,
      maxParticipants: 20,
      currentParticipants: 18,
      room: 'Зал 2',
      level: 'Все уровни',
      description: `Энергичное утреннее кардио для бодрого начала дня.\nРазнообразные упражнения и высокий темп.\nПодходит для всех уровней подготовки.`,
      isPaid: true,
      isRecurring: true,
      hasWaitingList: false,
      hasPaymentIssues: false,
      hasRestrictions: false,
      isExpired: false
    }
  ];

  const [sessions, setSessions] = useState(mockSessions);

  const handleSessionMove = (sessionId, newDay, newTime) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, day: newDay, time: newTime }
        : session
    ));
  };

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
    if (isMobile) {
      setIsDetailsPanelOpen(true);
    }
  };

  const handleWeekChange = (newWeek) => {
    setCurrentWeek(newWeek);
  };

  const handleToday = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    setCurrentWeek(monday);
  };

  const handleBulkAction = (actionId, selectedSessions) => {
    console.log(`Выполнение действия ${actionId} для сессий:`, selectedSessions);
    
    switch (actionId) {
      case 'move':
        // Логика перемещения
        break;
      case 'duplicate':
        // Логика дублирования
        break;
      case 'cancel':
        // Логика отмены
        break;
      case 'delete':
        // Логика удаления
        setSessions(prev => prev.filter(session => 
          !selectedSessions.some(selected => selected.id === session.id)
        ));
        break;
      default:
        break;
    }
    
    setSelectedSessions([]);
  };

  const handleClearSelection = () => {
    setSelectedSessions([]);
  };

  const handleEditSession = () => {
    console.log('Редактирование сессии:', selectedSession);
  };

  const handleDeleteSession = () => {
    if (selectedSession) {
      setSessions(prev => prev.filter(session => session.id !== selectedSession.id));
      setSelectedSession(null);
      setIsDetailsPanelOpen(false);
    }
  };

  const handleManageParticipants = () => {
    console.log('Управление участниками:', selectedSession);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        } pt-16`}>
          {/* Основной контент */}
          <div className={`transition-all duration-300 ${
            selectedSession && !isMobile ? 'mr-96' : ''
          }`}>
            <div className="p-6">
              {/* Заголовок */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">
                    Управление расписанием
                  </h1>
                  <p className="text-text-secondary mt-1">
                    Планирование и управление тренировочными сессиями
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Экспорт
                  </Button>
                  <Button
                    variant="primary"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Добавить сессию
                  </Button>
                </div>
              </div>

              {/* Навигация по неделям */}
              <WeekNavigation
                currentWeek={currentWeek}
                onWeekChange={handleWeekChange}
                onToday={handleToday}
              />

              {/* Фильтры */}
              <ScheduleFilters
                filters={filters}
                onFiltersChange={setFilters}
                trainers={mockTrainers}
                sessionTypes={mockSessionTypes}
              />

              {/* Сетка расписания */}
              {isMobile ? (
                <MobileScheduleView
                  sessions={sessions}
                  onSessionSelect={handleSessionSelect}
                  selectedSession={selectedSession}
                  filters={filters}
                  currentWeek={currentWeek}
                />
              ) : (
                <WeeklyScheduleGrid
                  sessions={sessions}
                  onSessionMove={handleSessionMove}
                  onSessionSelect={handleSessionSelect}
                  selectedSession={selectedSession}
                  filters={filters}
                  currentWeek={currentWeek}
                />
              )}
            </div>
          </div>

          {/* Панель деталей сессии */}
          {selectedSession && (
            <>
              {isMobile ? (
                // Мобильная модальная панель
                isDetailsPanelOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
                    <div className="bg-surface w-full max-h-[80vh] rounded-t-lg overflow-hidden">
                      <SessionDetailsPanel
                        session={selectedSession}
                        onClose={() => {
                          setIsDetailsPanelOpen(false);
                          setSelectedSession(null);
                        }}
                        onEdit={handleEditSession}
                        onDelete={handleDeleteSession}
                        onManageParticipants={handleManageParticipants}
                      />
                    </div>
                  </div>
                )
              ) : (
                // Десктопная боковая панель
                <SessionDetailsPanel
                  session={selectedSession}
                  onClose={() => setSelectedSession(null)}
                  onEdit={handleEditSession}
                  onDelete={handleDeleteSession}
                  onManageParticipants={handleManageParticipants}
                />
              )}
            </>
          )}

          {/* Панель массовых операций */}
          <BulkOperationsToolbar
            selectedSessions={selectedSessions}
            onBulkAction={handleBulkAction}
            onClearSelection={handleClearSelection}
            isVisible={!isMobile}
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyScheduleManagement;