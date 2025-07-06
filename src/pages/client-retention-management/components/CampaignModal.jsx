import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CampaignModal = ({ isOpen, onClose, client, onLaunchCampaign }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [campaignType, setCampaignType] = useState('email');
  const [scheduledDate, setScheduledDate] = useState('');
  const [offerType, setOfferType] = useState('');

  if (!isOpen) return null;

  const emailTemplates = [
    {
      id: 'welcome_back',
      name: 'Добро пожаловать обратно',
      subject: 'Мы скучали по вам!',
      content: `Привет, {name}!\n\nМы заметили, что вы давно не посещали наш фитнес-клуб. Мы очень скучали по вам!\n\nВернитесь к нам и получите специальную скидку 20% на продление абонемента.`
    },
    {
      id: 'special_offer',
      name: 'Специальное предложение',
      subject: 'Эксклюзивное предложение только для вас',
      content: `Дорогой {name}!\n\nУ нас есть специальное предложение именно для вас - скидка 30% на любой абонемент при возвращении в течение 7 дней.`
    },
    {
      id: 'personal_trainer',
      name: 'Персональный тренер',
      subject: 'Бесплатная консультация с тренером',
      content: `Привет, {name}!\n\nМы хотим помочь вам достичь ваших фитнес-целей. Запишитесь на бесплатную консультацию с персональным тренером.`
    }
  ];

  const smsTemplates = [
    {
      id: 'quick_return',
      name: 'Быстрое возвращение',
      content: `{name}, вернитесь в {branch} и получите скидку 25%! Предложение действует 3 дня.`
    },
    {
      id: 'reminder',
      name: 'Напоминание',
      content: `{name}, мы ждем вас в {branch}! Ваш любимый зал скучает по вам.`
    }
  ];

  const offerTypes = [
    { id: 'discount_20', name: '20% скидка на абонемент', value: 20 },
    { id: 'discount_30', name: '30% скидка на абонемент', value: 30 },
    { id: 'free_session', name: 'Бесплатная тренировка', value: 0 },
    { id: 'free_consultation', name: 'Бесплатная консультация', value: 0 },
    { id: 'guest_pass', name: 'Гостевой пропуск на неделю', value: 0 }
  ];

  const handleLaunch = () => {
    const campaignData = {
      clientId: client.id,
      type: campaignType,
      template: selectedTemplate,
      customMessage,
      scheduledDate,
      offerType,
      createdAt: new Date().toISOString()
    };
    
    onLaunchCampaign(campaignData);
    onClose();
  };

  const getCurrentTemplates = () => {
    return campaignType === 'email' ? emailTemplates : smsTemplates;
  };

  const getSelectedTemplate = () => {
    return getCurrentTemplates().find(t => t.id === selectedTemplate);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              Создать кампанию для {client?.name}
            </h2>
            <Button variant="ghost" onClick={onClose} className="p-2">
              <Icon name="X" size={20} className="text-text-secondary" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Campaign Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Тип кампании
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setCampaignType('email')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-smooth ${
                  campaignType === 'email' ?'border-primary bg-primary-50 text-primary' :'border-border text-text-secondary hover:bg-secondary-50'
                }`}
              >
                <Icon name="Mail" size={16} />
                <span>Email</span>
              </button>
              <button
                onClick={() => setCampaignType('sms')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-smooth ${
                  campaignType === 'sms' ?'border-primary bg-primary-50 text-primary' :'border-border text-text-secondary hover:bg-secondary-50'
                }`}
              >
                <Icon name="MessageSquare" size={16} />
                <span>SMS</span>
              </button>
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Выберите шаблон
            </label>
            <div className="space-y-2">
              {getCurrentTemplates().map(template => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-smooth ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary-50' :'border-border hover:bg-secondary-50'
                  }`}
                >
                  <h4 className="font-medium text-text-primary mb-1">{template.name}</h4>
                  {template.subject && (
                    <p className="text-sm text-text-secondary mb-2">Тема: {template.subject}</p>
                  )}
                  <p className="text-sm text-text-secondary">{template.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Offer Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Тип предложения
            </label>
            <select
              value={offerType}
              onChange={(e) => setOfferType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Выберите предложение</option>
              {offerTypes.map(offer => (
                <option key={offer.id} value={offer.id}>
                  {offer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Дополнительное сообщение (опционально)
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Добавьте персональное сообщение..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Scheduling */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Запланировать отправку (опционально)
            </label>
            <Input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Preview */}
          {selectedTemplate && (
            <div className="bg-secondary-50 rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-2">Предварительный просмотр</h4>
              <div className="text-sm text-text-secondary">
                {getSelectedTemplate()?.subject && (
                  <p className="font-medium mb-2">Тема: {getSelectedTemplate().subject}</p>
                )}
                <p className="whitespace-pre-line">
                  {getSelectedTemplate()?.content.replace('{name}', client?.name).replace('{branch}', client?.branch)}
                </p>
                {customMessage && (
                  <p className="mt-3 pt-3 border-t border-border whitespace-pre-line">
                    {customMessage}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleLaunch}
            disabled={!selectedTemplate}
            iconName="Send"
          >
            {scheduledDate ? 'Запланировать' : 'Отправить сейчас'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignModal;