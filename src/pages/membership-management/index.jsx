import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MembershipTable from './components/MembershipTable';
import MembershipFilters from './components/MembershipFilters';
import MemberDetailsPanel from './components/MemberDetailsPanel';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import MembershipStats from './components/MembershipStats';

const MembershipManagement = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockMembers = [
    {
      id: 1,
      name: 'Александр Петров',
      email: 'alex.petrov@email.com',
      phone: '+7 (999) 123-45-67',
      membershipType: 'Премиум',
      status: 'active',
      paymentStatus: 'paid',
      expirationDate: '2024-03-15',
      startDate: '2023-03-15',
      branch: 'Центральный',
      overdueAmount: 0,
      totalSessions: 45,
      monthlySessions: 8,
      paymentHistory: [
        { date: '2024-02-15', amount: 5000, method: 'Карта', status: 'completed' },
        { date: '2024-01-15', amount: 5000, method: 'Карта', status: 'completed' }
      ],
      recentSessions: [
        { date: '2024-02-20', type: 'Силовая тренировка', trainer: 'Иван Сидоров', duration: 60, status: 'completed' },
        { date: '2024-02-18', type: 'Кардио', trainer: 'Мария Иванова', duration: 45, status: 'completed' }
      ],
      notifications: [
        { date: '2024-02-10', type: 'info', title: 'Напоминание о тренировке', message: 'Завтра у вас запланирована тренировка в 10:00' }
      ]
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      email: 'maria.sidorova@email.com',
      phone: '+7 (999) 234-56-78',
      membershipType: 'Базовый',
      status: 'expiring',
      paymentStatus: 'pending',
      expirationDate: '2024-02-28',
      startDate: '2023-02-28',
      branch: 'Северный',
      overdueAmount: 0,
      totalSessions: 32,
      monthlySessions: 6,
      paymentHistory: [
        { date: '2024-01-28', amount: 3000, method: 'Наличные', status: 'completed' }
      ],
      recentSessions: [
        { date: '2024-02-19', type: 'Йога', trainer: 'Елена Козлова', duration: 90, status: 'completed' }
      ],
      notifications: [
        { date: '2024-02-15', type: 'warning', title: 'Членство истекает', message: 'Ваше членство истекает через 2 недели' }
      ]
    },
    {
      id: 3,
      name: 'Дмитрий Козлов',
      email: 'dmitry.kozlov@email.com',
      phone: '+7 (999) 345-67-89',
      membershipType: 'VIP',
      status: 'expired',
      paymentStatus: 'overdue',
      expirationDate: '2024-01-15',
      startDate: '2023-01-15',
      branch: 'Южный',
      overdueAmount: 8000,
      totalSessions: 28,
      monthlySessions: 0,
      paymentHistory: [
        { date: '2023-12-15', amount: 8000, method: 'Карта', status: 'completed' }
      ],
      recentSessions: [
        { date: '2024-01-10', type: 'Персональная тренировка', trainer: 'Алексей Морозов', duration: 60, status: 'completed' }
      ],
      notifications: [
        { date: '2024-01-20', type: 'error', title: 'Членство просрочено', message: 'Ваше членство просрочено. Пожалуйста, продлите его.' }
      ]
    },
    {
      id: 4,
      name: 'Елена Васильева',
      email: 'elena.vasileva@email.com',
      phone: '+7 (999) 456-78-90',
      membershipType: 'Студенческий',
      status: 'active',
      paymentStatus: 'paid',
      expirationDate: '2024-06-30',
      startDate: '2023-06-30',
      branch: 'Восточный',
      overdueAmount: 0,
      totalSessions: 38,
      monthlySessions: 7,
      paymentHistory: [
        { date: '2024-01-30', amount: 2000, method: 'Карта', status: 'completed' }
      ],
      recentSessions: [
        { date: '2024-02-21', type: 'Групповая тренировка', trainer: 'Ольга Петрова', duration: 45, status: 'completed' }
      ],
      notifications: []
    },
    {
      id: 5,
      name: 'Игорь Николаев',
      email: 'igor.nikolaev@email.com',
      phone: '+7 (999) 567-89-01',
      membershipType: 'Корпоративный',
      status: 'suspended',
      paymentStatus: 'paid',
      expirationDate: '2024-05-20',
      startDate: '2023-05-20',
      branch: 'Западный',
      overdueAmount: 0,
      totalSessions: 15,
      monthlySessions: 2,
      paymentHistory: [
        { date: '2024-02-01', amount: 4000, method: 'Безналичный', status: 'completed' }
      ],
      recentSessions: [
        { date: '2024-02-05', type: 'Плавание', trainer: 'Андрей Волков', duration: 30, status: 'completed' }
      ],
      notifications: [
        { date: '2024-02-01', type: 'warning', title: 'Членство приостановлено', message: 'Ваше членство временно приостановлено по вашей просьбе' }
      ]
    }
  ];

  const mockStats = {
    totalMembers: 1247,
    totalMembersChange: 8.2,
    activeMembers: 1089,
    activeMembersChange: 5.4,
    expiringMembers: 67,
    expiringMembersChange: -12.3,
    expiredMembers: 91,
    expiredMembersChange: -8.7,
    monthlyRevenue: 2847500,
    monthlyRevenueChange: 15.6,
    averageTicket: 4200,
    averageTicketChange: 3.2
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMembers(mockMembers);
      setFilteredMembers(mockMembers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const applyFilters = useMemo(() => {
    let filtered = members;

    if (filters.membershipType) {
      filtered = filtered.filter(member => member.membershipType === filters.membershipType);
    }

    if (filters.status) {
      filtered = filtered.filter(member => member.status === filters.status);
    }

    if (filters.paymentStatus) {
      filtered = filtered.filter(member => member.paymentStatus === filters.paymentStatus);
    }

    if (filters.branch) {
      filtered = filtered.filter(member => member.branch === filters.branch);
    }

    if (filters.expirationDateFrom) {
      filtered = filtered.filter(member => 
        new Date(member.expirationDate) >= new Date(filters.expirationDateFrom)
      );
    }

    if (filters.expirationDateTo) {
      filtered = filtered.filter(member => 
        new Date(member.expirationDate) <= new Date(filters.expirationDateTo)
      );
    }

    return filtered;
  }, [members, filters]);

  useEffect(() => {
    setFilteredMembers(applyFilters);
  }, [applyFilters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
  };

  const handleMemberUpdate = (updatedMember) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    setSelectedMember(updatedMember);
  };

  const handleBulkAction = (action, data) => {
    switch (action) {
      case 'renew': console.log('Renewing memberships:', data);
        // Implement renewal logic
        break;
      case 'notify':
        console.log('Sending notifications to:', data);
        // Implement notification logic
        break;
      case 'suspend': console.log('Suspending memberships:', data);
        // Implement suspension logic
        break;
      case 'export':
        console.log('Exporting data for:', data);
        // Implement export logic
        break;
      default:
        console.log('Unknown action:', action);
    }
    setSelectedMembers([]);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'add-member': console.log('Adding new member');
        break;
      case 'import': console.log('Importing members');
        break;
      case 'export-all':
        console.log('Exporting all members');
        break;
      default:
        console.log('Unknown quick action:', action);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 md:pl-64">
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-4" />
              <p className="text-text-secondary">Загрузка данных...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 md:pl-64">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Управление членством</h1>
              <p className="text-text-secondary mt-1">
                Управление подписками, валидация и автоматизация процессов продления
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => handleQuickAction('import')}
                iconName="Upload"
              >
                Импорт
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAction('export-all')}
                iconName="Download"
              >
                Экспорт
              </Button>
              <Button
                variant="primary"
                onClick={() => handleQuickAction('add-member')}
                iconName="Plus"
              >
                Добавить участника
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <MembershipStats stats={mockStats} />

        {/* Filters */}
        <MembershipFilters 
          onFilterChange={handleFilterChange}
          activeFilters={filters}
        />

        {/* Main Content */}
        <div className="flex space-x-6">
          <div className={`flex-1 ${selectedMember ? 'mr-96' : ''}`}>
            <MembershipTable
              members={filteredMembers}
              onMemberSelect={handleMemberSelect}
              selectedMember={selectedMember}
              onBulkAction={handleBulkAction}
            />
          </div>
        </div>

        {/* Member Details Panel */}
        {selectedMember && (
          <MemberDetailsPanel
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            onUpdate={handleMemberUpdate}
          />
        )}

        {/* Bulk Actions Toolbar */}
        <BulkActionsToolbar
          selectedCount={selectedMembers.length}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedMembers([])}
        />

        {/* Quick Navigation */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
          <Button
            variant="primary"
            onClick={() => navigate('/weekly-schedule-management')}
            iconName="Calendar"
            className="rounded-full w-12 h-12 p-0"
            title="Управление расписанием"
          />
          <Button
            variant="primary"
            onClick={() => navigate('/client-retention-management')}
            iconName="UserCheck"
            className="rounded-full w-12 h-12 p-0"
            title="Удержание клиентов"
          />
          <Button
            variant="primary"
            onClick={() => navigate('/sales-analytics-dashboard')}
            iconName="BarChart3"
            className="rounded-full w-12 h-12 p-0"
            title="Аналитика продаж"
          />
        </div>
      </div>
    </div>
  );
};

export default MembershipManagement;