import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ClientSegmentCard from './components/ClientSegmentCard';
import ClientDetailPanel from './components/ClientDetailPanel';
import CampaignModal from './components/CampaignModal';
import FilterPanel from './components/FilterPanel';
import CampaignAnalytics from './components/CampaignAnalytics';

const ClientRetentionManagement = () => {
  const [activeTab, setActiveTab] = useState('segments');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignClient, setCampaignClient] = useState(null);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [filters, setFilters] = useState({});
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  // Mock client data
  const mockClients = [
    {
      id: 1,
      name: 'Анна Петрова',
      email: 'anna.petrova@email.com',
      phone: '+7 (999) 123-45-67',
      lastActivity: '2024-10-15',
      membershipType: 'Премиум',
      totalSpent: 45000,
      averageSpend: 3500,
      contactAttempts: 2,
      branch: 'Центральный',
      age: 28,
      registrationDate: '2023-05-12',
      totalVisits: 156,
      preferences: ['Йога', 'Пилатес', 'Групповые занятия'],
      lastCampaign: {
        name: 'Добро пожаловать обратно',
        responded: false
      },
      activityHistory: [
        { description: 'Последнее посещение зала', date: '2024-10-15' },
        { description: 'Продление абонемента', date: '2024-09-01' },
        { description: 'Участие в групповом занятии', date: '2024-08-28' }
      ],
      campaignHistory: [
        {
          name: 'Специальное предложение',
          description: 'Скидка 20% на продление',
          status: 'completed',
          sentDate: '2024-11-01',
          responded: false
        }
      ],
      notes: [
        {
          content: 'Предпочитает утренние тренировки',
          author: 'Менеджер',
          date: '2024-10-20'
        }
      ]
    },
    {
      id: 2,
      name: 'Михаил Сидоров',
      email: 'mikhail.sidorov@email.com',
      phone: '+7 (999) 234-56-78',
      lastActivity: '2024-09-20',
      membershipType: 'Базовый',
      totalSpent: 18000,
      averageSpend: 2000,
      contactAttempts: 1,
      branch: 'Северный',
      age: 35,
      registrationDate: '2023-01-15',
      totalVisits: 89,
      preferences: ['Силовые тренировки', 'Кардио'],
      lastCampaign: {
        name: 'Персональный тренер',
        responded: true
      },
      activityHistory: [
        { description: 'Последнее посещение зала', date: '2024-09-20' },
        { description: 'Консультация с тренером', date: '2024-09-15' }
      ],
      campaignHistory: [
        {
          name: 'Персональный тренер',
          description: 'Бесплатная консультация',
          status: 'completed',
          sentDate: '2024-10-15',
          responded: true
        }
      ],
      notes: [
        {
          content: 'Интересуется персональными тренировками',
          author: 'Тренер',
          date: '2024-09-25'
        }
      ]
    },
    {
      id: 3,
      name: 'Елена Козлова',
      email: 'elena.kozlova@email.com',
      phone: '+7 (999) 345-67-89',
      lastActivity: '2024-07-10',
      membershipType: 'VIP',
      totalSpent: 78000,
      averageSpend: 5200,
      contactAttempts: 3,
      branch: 'Южный',
      age: 42,
      registrationDate: '2022-11-08',
      totalVisits: 234,
      preferences: ['Персональные тренировки', 'SPA', 'Массаж'],
      lastCampaign: {
        name: 'VIP предложение',
        responded: false
      },
      activityHistory: [
        { description: 'Последнее посещение SPA', date: '2024-07-10' },
        { description: 'Персональная тренировка', date: '2024-07-05' }
      ],
      campaignHistory: [
        {
          name: 'VIP предложение',
          description: 'Эксклюзивные условия',
          status: 'completed',
          sentDate: '2024-10-01',
          responded: false
        }
      ],
      notes: [
        {
          content: 'VIP клиент, требует особого внимания',
          author: 'Менеджер',
          date: '2024-07-15'
        }
      ]
    },
    {
      id: 4,
      name: 'Дмитрий Волков',
      email: 'dmitry.volkov@email.com',
      phone: '+7 (999) 456-78-90',
      lastActivity: '2024-06-05',
      membershipType: 'Студенческий',
      totalSpent: 12000,
      averageSpend: 1500,
      contactAttempts: 0,
      branch: 'Восточный',
      age: 22,
      registrationDate: '2023-09-01',
      totalVisits: 67,
      preferences: ['Бассейн', 'Кардио'],
      lastCampaign: null,
      activityHistory: [
        { description: 'Последнее посещение бассейна', date: '2024-06-05' },
        { description: 'Групповое занятие по плаванию', date: '2024-06-01' }
      ],
      campaignHistory: [],
      notes: []
    },
    {
      id: 5,
      name: 'Ольга Морозова',
      email: 'olga.morozova@email.com',
      phone: '+7 (999) 567-89-01',
      lastActivity: '2024-04-20',
      membershipType: 'Корпоративный',
      totalSpent: 32000,
      averageSpend: 2800,
      contactAttempts: 1,
      branch: 'Западный',
      age: 31,
      registrationDate: '2023-03-15',
      totalVisits: 98,
      preferences: ['Фитнес', 'Групповые занятия'],
      lastCampaign: {
        name: 'Корпоративное предложение',
        responded: true
      },
      activityHistory: [
        { description: 'Последнее посещение зала', date: '2024-04-20' },
        { description: 'Корпоративное мероприятие', date: '2024-04-15' }
      ],
      campaignHistory: [
        {
          name: 'Корпоративное предложение',
          description: 'Скидка для сотрудников',
          status: 'completed',
          sentDate: '2024-09-01',
          responded: true
        }
      ],
      notes: [
        {
          content: 'Участвует в корпоративной программе',
          author: 'Менеджер',
          date: '2024-04-25'
        }
      ]
    }
  ];

  useEffect(() => {
    setClients(mockClients);
    setFilteredClients(mockClients);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, clients]);

  const applyFilters = () => {
    let filtered = [...clients];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm) ||
        client.phone.includes(searchTerm)
      );
    }

    // Membership type filter
    if (filters.membershipType) {
      filtered = filtered.filter(client => client.membershipType === filters.membershipType);
    }

    // Branch filter
    if (filters.branch) {
      filtered = filtered.filter(client => client.branch === filters.branch);
    }

    // Spending range filter
    if (filters.spendingRange) {
      const [min, max] = filters.spendingRange.split('-').map(v => 
        v === '+' ? Infinity : parseInt(v)
      );
      filtered = filtered.filter(client => {
        if (max === undefined) return client.totalSpent >= min;
        return client.totalSpent >= min && client.totalSpent <= max;
      });
    }

    // Response status filter
    if (filters.responseStatus) {
      if (filters.responseStatus === 'responded') {
        filtered = filtered.filter(client => client.lastCampaign?.responded);
      } else if (filters.responseStatus === 'no_response') {
        filtered = filtered.filter(client => client.lastCampaign && !client.lastCampaign.responded);
      } else if (filters.responseStatus === 'no_contact') {
        filtered = filtered.filter(client => !client.lastCampaign);
      }
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'lastActivity':
            return new Date(b.lastActivity) - new Date(a.lastActivity);
          case 'totalSpent':
            return b.totalSpent - a.totalSpent;
          case 'registrationDate':
            return new Date(b.registrationDate) - new Date(a.registrationDate);
          case 'contactAttempts':
            return b.contactAttempts - a.contactAttempts;
          default:
            return 0;
        }
      });
    }

    setFilteredClients(filtered);
  };

  const getClientSegments = () => {
    const now = new Date();
    const segments = {
      recent: [],
      moderate: [],
      longTerm: []
    };

    filteredClients.forEach(client => {
      const lastActivity = new Date(client.lastActivity);
      const daysDiff = Math.ceil((now - lastActivity) / (1000 * 60 * 60 * 24));

      if (daysDiff <= 30) {
        segments.recent.push(client);
      } else if (daysDiff <= 90) {
        segments.moderate.push(client);
      } else {
        segments.longTerm.push(client);
      }
    });

    return segments;
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
  };

  const handleStartCampaign = (client) => {
    setCampaignClient(client);
    setShowCampaignModal(true);
  };

  const handleLaunchCampaign = (campaignData) => {
    console.log('Launching campaign:', campaignData);
    // Here you would typically send the campaign data to your backend
  };

  const handleAddNote = (clientId, note) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          notes: [
            ...client.notes,
            {
              content: note,
              author: 'Текущий пользователь',
              date: new Date().toISOString()
            }
          ]
        };
      }
      return client;
    });
    setClients(updatedClients);
  };

  const segments = getClientSegments();

  const tabs = [
    { id: 'segments', label: 'Сегменты клиентов', icon: 'Users' },
    { id: 'analytics', label: 'Аналитика кампаний', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Filter Panel */}
        <FilterPanel
          onFiltersChange={setFilters}
          isCollapsed={isFilterCollapsed}
          onToggle={() => setIsFilterCollapsed(!isFilterCollapsed)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-surface border-b border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  Управление удержанием клиентов
                </h1>
                <p className="text-text-secondary mt-1">
                  Выявление клиентов в группе риска и проведение кампаний по возвращению
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  onClick={() => console.log('Export data')}
                >
                  Экспорт
                </Button>
                <Button
                  variant="primary"
                  iconName="Plus"
                  onClick={() => setShowCampaignModal(true)}
                >
                  Создать кампанию
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    activeTab === tab.id
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'segments' && (
              <div className="flex h-full">
                {/* Client Segments */}
                <div className={`flex-1 overflow-y-auto p-6 ${selectedClient ? 'w-2/3' : 'w-full'}`}>
                  <div className="space-y-8">
                    {/* Recent Segment */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-warning rounded-full"></div>
                          <h2 className="text-lg font-semibold text-text-primary">
                            Недавно истекшие (0-30 дней)
                          </h2>
                          <span className="bg-warning-100 text-warning-700 px-2 py-1 rounded-full text-sm font-medium">
                            {segments.recent.length}
                          </span>
                        </div>
                        {segments.recent.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Mail"
                            onClick={() => console.log('Bulk campaign for recent')}
                          >
                            Массовая кампания
                          </Button>
                        )}
                      </div>
                      {segments.recent.length === 0 ? (
                        <div className="text-center py-8 text-text-muted">
                          <Icon name="Users" size={48} className="mx-auto mb-2 opacity-50" />
                          <p>Нет клиентов в этом сегменте</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                          {segments.recent.map(client => (
                            <ClientSegmentCard
                              key={client.id}
                              client={client}
                              onSelect={handleClientSelect}
                              onContact={handleStartCampaign}
                              onViewHistory={(client) => handleClientSelect(client)}
                              isSelected={selectedClient?.id === client.id}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Moderate Segment */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-error rounded-full"></div>
                          <h2 className="text-lg font-semibold text-text-primary">
                            Умеренно просроченные (31-90 дней)
                          </h2>
                          <span className="bg-error-100 text-error-700 px-2 py-1 rounded-full text-sm font-medium">
                            {segments.moderate.length}
                          </span>
                        </div>
                        {segments.moderate.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Mail"
                            onClick={() => console.log('Bulk campaign for moderate')}
                          >
                            Массовая кампания
                          </Button>
                        )}
                      </div>
                      {segments.moderate.length === 0 ? (
                        <div className="text-center py-8 text-text-muted">
                          <Icon name="Users" size={48} className="mx-auto mb-2 opacity-50" />
                          <p>Нет клиентов в этом сегменте</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                          {segments.moderate.map(client => (
                            <ClientSegmentCard
                              key={client.id}
                              client={client}
                              onSelect={handleClientSelect}
                              onContact={handleStartCampaign}
                              onViewHistory={(client) => handleClientSelect(client)}
                              isSelected={selectedClient?.id === client.id}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Long-term Segment */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-text-muted rounded-full"></div>
                          <h2 className="text-lg font-semibold text-text-primary">
                            Долгосрочно неактивные (90+ дней)
                          </h2>
                          <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-sm font-medium">
                            {segments.longTerm.length}
                          </span>
                        </div>
                        {segments.longTerm.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Mail"
                            onClick={() => console.log('Bulk campaign for long-term')}
                          >
                            Массовая кампания
                          </Button>
                        )}
                      </div>
                      {segments.longTerm.length === 0 ? (
                        <div className="text-center py-8 text-text-muted">
                          <Icon name="Users" size={48} className="mx-auto mb-2 opacity-50" />
                          <p>Нет клиентов в этом сегменте</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                          {segments.longTerm.map(client => (
                            <ClientSegmentCard
                              key={client.id}
                              client={client}
                              onSelect={handleClientSelect}
                              onContact={handleStartCampaign}
                              onViewHistory={(client) => handleClientSelect(client)}
                              isSelected={selectedClient?.id === client.id}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Client Detail Panel */}
                {selectedClient && (
                  <div className="w-1/3 min-w-[400px]">
                    <ClientDetailPanel
                      client={selectedClient}
                      onClose={() => setSelectedClient(null)}
                      onStartCampaign={handleStartCampaign}
                      onAddNote={handleAddNote}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="p-6 overflow-y-auto">
                <CampaignAnalytics />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Modal */}
      <CampaignModal
        isOpen={showCampaignModal}
        onClose={() => {
          setShowCampaignModal(false);
          setCampaignClient(null);
        }}
        client={campaignClient}
        onLaunchCampaign={handleLaunchCampaign}
      />
    </div>
  );
};

export default ClientRetentionManagement;