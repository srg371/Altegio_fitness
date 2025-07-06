import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionBookingModal = ({ session, isOpen, onClose, onConfirm, userMembership }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [bookingStep, setBookingStep] = useState('details'); // details, confirm, success
  const [cancellationPolicy, setCancellationPolicy] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setBookingStep('details');
      setIsConfirming(false);
    }
  }, [isOpen]);

  if (!isOpen || !session) return null;

  const sessionDate = new Date(session.date + 'T' + session.time);
  const now = new Date();
  const cancellationDeadline = new Date(sessionDate.getTime() - 6 * 60 * 60 * 1000);

  const handleConfirmBooking = async () => {
    setIsConfirming(true);
    
    // Simulate API call
    setTimeout(() => {
      setBookingStep('success');
      setIsConfirming(false);
      
      // Auto close after success
      setTimeout(() => {
        onConfirm(session);
        onClose();
      }, 2000);
    }, 1500);
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Начинающий': return 'bg-success-100 text-success-700';
      case 'Средний': return 'bg-warning-100 text-warning-700';
      case 'Продвинутый': return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              {bookingStep === 'success' ? 'Запись подтверждена!' : 'Запись на тренировку'}
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {bookingStep === 'details' && (
            <div className="space-y-6">
              {/* Session Details */}
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Dumbbell" size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{session.type}</h3>
                    <p className="text-sm text-text-secondary">{session.trainer}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-text-secondary">Дата и время</p>
                    <p className="font-medium text-text-primary">
                      {formatDateTime(sessionDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Продолжительность</p>
                    <p className="font-medium text-text-primary">{session.duration} минут</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Стоимость</p>
                    <p className="font-medium text-text-primary">{session.price} ₽</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Свободных мест</p>
                    <p className="font-medium text-text-primary">
                      {session.capacity - session.booked} из {session.capacity}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(session.level)}`}>
                    {session.level}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-medium text-text-primary mb-2">Описание тренировки</h4>
                <p className="text-sm text-text-secondary">{session.description}</p>
              </div>

              {/* Membership Status */}
              <div className="bg-accent-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CreditCard" size={16} className="text-accent" />
                  <span className="font-medium text-accent">Статус членства</span>
                </div>
                <div className="text-sm space-y-1">
                  <p className="text-text-secondary">
                    Действительно до: <span className="font-medium">{new Date(userMembership.expiryDate).toLocaleDateString('ru-RU')}</span>
                  </p>
                  <p className="text-text-secondary">
                    Использовано тренировок: <span className="font-medium">{userMembership.weeklySessionsUsed}/2</span>
                  </p>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-warning-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="font-medium text-warning">Правила отмены</span>
                </div>
                <div className="text-sm text-text-secondary space-y-1">
                  <p>• Отмена возможна не позднее чем за 6 часов до начала</p>
                  <p>• Крайний срок отмены: {cancellationDeadline.toLocaleString('ru-RU')}</p>
                  <p>• При нарушении правил отмены тренировка засчитывается как проведенная</p>
                </div>
                
                <div className="mt-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={cancellationPolicy}
                      onChange={(e) => setCancellationPolicy(e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-text-secondary">
                      Я ознакомлен с правилами отмены
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {bookingStep === 'confirm' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Icon name="Clock" size={32} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Подтверждение записи
                </h3>
                <p className="text-text-secondary">
                  Пожалуйста, подождите. Обрабатываем вашу запись...
                </p>
              </div>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </div>
          )}

          {bookingStep === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" size={32} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Запись успешно подтверждена!
                </h3>
                <p className="text-text-secondary">
                  Вы записаны на тренировку "{session.type}" на {formatDateTime(sessionDate)}
                </p>
              </div>
              <div className="bg-success-50 rounded-lg p-4">
                <p className="text-sm text-success-700">
                  Напоминание будет отправлено за 2 часа до начала тренировки
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {bookingStep === 'details' && (
          <div className="p-6 border-t border-border">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Отмена
              </Button>
              <Button
                variant="primary"
                onClick={() => setBookingStep('confirm')}
                disabled={!cancellationPolicy}
                className="flex-1"
              >
                Записаться
              </Button>
            </div>
          </div>
        )}

        {bookingStep === 'confirm' && (
          <div className="p-6 border-t border-border">
            <Button
              variant="primary"
              onClick={handleConfirmBooking}
              disabled={isConfirming}
              className="w-full"
            >
              {isConfirming ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Подтверждение...</span>
                </div>
              ) : (
                'Подтвердить запись'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionBookingModal;