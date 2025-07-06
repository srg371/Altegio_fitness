import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const CampaignAnalytics = () => {
  const campaignStats = {
    totalCampaigns: 24,
    activeCampaigns: 3,
    totalSent: 1247,
    totalResponses: 186,
    responseRate: 14.9,
    conversions: 42,
    conversionRate: 22.6,
    roi: 340
  };

  const campaignPerformance = [
    { name: 'Email кампании', sent: 850, responses: 127, conversions: 28 },
    { name: 'SMS кампании', sent: 397, responses: 59, conversions: 14 }
  ];

  const monthlyTrends = [
    { month: 'Янв', campaigns: 4, responses: 23, conversions: 8 },
    { month: 'Фев', campaigns: 3, responses: 18, conversions: 5 },
    { month: 'Мар', campaigns: 5, responses: 31, conversions: 12 },
    { month: 'Апр', campaigns: 4, responses: 28, conversions: 9 },
    { month: 'Май', campaigns: 6, responses: 42, conversions: 15 },
    { month: 'Июн', campaigns: 2, responses: 44, conversions: 18 }
  ];

  const segmentPerformance = [
    { name: 'Недавно истекшие (0-30 дней)', value: 35, color: '#F59E0B' },
    { name: 'Умеренно просроченные (31-90 дней)', value: 45, color: '#EF4444' },
    { name: 'Долгосрочно неактивные (90+ дней)', value: 20, color: '#6B7280' }
  ];

  const topCampaigns = [
    {
      name: 'Добро пожаловать обратно - Май',
      type: 'email',
      sent: 156,
      responses: 34,
      conversions: 12,
      roi: 450
    },
    {
      name: 'Специальная скидка 30%',
      type: 'sms',
      sent: 89,
      responses: 23,
      conversions: 8,
      roi: 380
    },
    {
      name: 'Персональный тренер бесплатно',
      type: 'email',
      sent: 203,
      responses: 41,
      conversions: 15,
      roi: 320
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Всего кампаний</p>
              <p className="text-2xl font-bold text-text-primary">{campaignStats.totalCampaigns}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Mail" size={24} className="text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-sm text-success">+3 активные</span>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Отправлено</p>
              <p className="text-2xl font-bold text-text-primary">{campaignStats.totalSent.toLocaleString('ru-RU')}</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Icon name="Send" size={24} className="text-accent" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="Users" size={16} className="text-text-muted mr-1" />
            <span className="text-sm text-text-secondary">уникальных клиентов</span>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Отклик</p>
              <p className="text-2xl font-bold text-text-primary">{campaignStats.responseRate}%</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Icon name="MessageCircle" size={24} className="text-warning" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-text-secondary">{campaignStats.totalResponses} ответов</span>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Конверсия</p>
              <p className="text-2xl font-bold text-text-primary">{campaignStats.conversionRate}%</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={24} className="text-success" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-sm text-success">ROI {campaignStats.roi}%</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Эффективность по типам кампаний
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sent" fill="#3B82F6" name="Отправлено" />
                <Bar dataKey="responses" fill="#10B981" name="Ответы" />
                <Bar dataKey="conversions" fill="#F59E0B" name="Конверсии" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segment Performance */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Эффективность по сегментам
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentPerformance}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                >
                  {segmentPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {segmentPerformance.map((segment, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: segment.color }}
                ></div>
                <span className="text-sm text-text-secondary">{segment.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Тренды по месяцам
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="campaigns" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Кампании"
              />
              <Line 
                type="monotone" 
                dataKey="responses" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Ответы"
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="Конверсии"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Campaigns */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Лучшие кампании
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-text-primary">Кампания</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary">Тип</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary">Отправлено</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary">Ответы</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary">Конверсии</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary">ROI</th>
              </tr>
            </thead>
            <tbody>
              {topCampaigns.map((campaign, index) => (
                <tr key={index} className="border-b border-border hover:bg-secondary-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-text-primary">{campaign.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={campaign.type === 'email' ? 'Mail' : 'MessageSquare'} 
                        size={16} 
                        className="text-text-muted" 
                      />
                      <span className="text-sm text-text-secondary capitalize">
                        {campaign.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-primary">{campaign.sent}</td>
                  <td className="py-3 px-4 text-text-primary">{campaign.responses}</td>
                  <td className="py-3 px-4 text-text-primary">{campaign.conversions}</td>
                  <td className="py-3 px-4">
                    <span className="text-success font-medium">{campaign.roi}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignAnalytics;