import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClientDetailPanel = ({ client, onClose, onStartCampaign, onAddNote }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [newNote, setNewNote] = useState('');

  if (!client) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(client.id, newNote);
      setNewNote('');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'history', label: 'История', icon: 'History' },
    { id: 'campaigns', label: 'Кампании', icon: 'Mail' },
    { id: 'notes', label: 'Заметки', icon: 'FileText' }
  ];

  return (
    <div className="bg-surface border-l border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Детали клиента</h2>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <Icon name="X" size={20} className="text-text-secondary" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center">
            <Icon name="User" size={24} className="text-secondary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{client.name}</h3>
            <p className="text-text-secondary">{client.email}</p>
            <p className="text-text-secondary">{client.phone}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 mt-4">
          <Button
            variant="primary"
            onClick={() => onStartCampaign(client)}
            iconName="Mail"
            className="flex-1"
          >
            Начать кампанию
          </Button>
          <Button variant="outline" iconName="Phone" className="flex-1">
            Позвонить
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-smooth ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-text-primary mb-3">Основная информация</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Дата регистрации</p>
                    <p className="text-sm text-text-primary">{formatDate(client.registrationDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Филиал</p>
                    <p className="text-sm text-text-primary">{client.branch}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Возраст</p>
                    <p className="text-sm text-text-primary">{client.age} лет</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-3">Статистика</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Всего посещений</p>
                    <p className="text-sm text-text-primary">{client.totalVisits}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Потрачено всего</p>
                    <p className="text-sm text-text-primary">{formatCurrency(client.totalSpent)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Средний чек</p>
                    <p className="text-sm text-text-primary">{formatCurrency(client.averageSpend)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-3">Предпочтения</h4>
              <div className="flex flex-wrap gap-2">
                {client.preferences?.map((pref, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">История активности</h4>
            <div className="space-y-3">
              {client.activityHistory?.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <Icon name="Clock" size={16} className="text-text-muted mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{activity.description}</p>
                    <p className="text-xs text-text-muted mt-1">{formatDate(activity.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">История кампаний</h4>
            <div className="space-y-3">
              {client.campaignHistory?.map((campaign, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-text-primary">{campaign.name}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'completed' ? 'bg-success-100 text-success-700' :
                      campaign.status === 'active'? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-700'
                    }`}>
                      {campaign.status === 'completed' ? 'Завершена' :
                       campaign.status === 'active' ? 'Активна' : 'Черновик'}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{campaign.description}</p>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Отправлено: {formatDate(campaign.sentDate)}</span>
                    <span className={campaign.responded ? 'text-success' : 'text-error'}>
                      {campaign.responded ? 'Отвечен' : 'Не отвечен'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-text-primary">Заметки</h4>
            </div>
            
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Добавить заметку..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full"
              />
              <Button
                variant="primary"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="w-full"
              >
                Добавить заметку
              </Button>
            </div>

            <div className="space-y-3">
              {client.notes?.map((note, index) => (
                <div key={index} className="p-3 bg-secondary-50 rounded-lg">
                  <p className="text-sm text-text-primary mb-2">{note.content}</p>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Автор: {note.author}</span>
                    <span>{formatDate(note.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetailPanel;