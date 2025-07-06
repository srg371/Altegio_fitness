import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ booking, onClose, onCancelBooking }) => {
  const [timeUntilSession, setTimeUntilSession] = useState('');
  const [canCancel, setCanCancel] = useState(true);
  const [cancelCountdown, setCancelCountdown] = useState('');

  useEffect(() => {
    if (!booking) return;

    const updateCountdown = () => {
      const sessionDateTime = new Date(booking.date + 'T' + booking.time);
      const now = new Date();
      const timeDiff = sessionDateTime.getTime() - now.getTime();
      const cancelDeadline = sessionDateTime.getTime() - (6 * 60 * 60 * 1000); // 6 hours before
      const timeToCancelDeadline = cancelDeadline - now.getTime();

      // Time until session
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeUntilSession(`${days} дн. ${hours} ч.`);
        } else if (hours > 0) {
          setTimeUntilSession(`${hours} ч. ${minutes} мин.`);
        } else {
          setTimeUntilSession(`${minutes} мин.`);
        }
      } else {
        setTimeUntilSession('Тренировка началась');
      }

      // Cancellation availability
      if (timeToCancelDeadline > 0) {
        setCanCancel(true);
        const cancelHours = Math.floor(timeToCancelDeadline / (1000 * 60 * 60));
        const cancelMinutes = Math.floor((timeToCancelDeadline % (1000 * 60 * 60)) / (1000 * 60));
        setCancelCountdown(`${cancelHours} ч. ${cancelMinutes} мин.`);
      } else {
        setCanCancel(false);
        setCancelCountdown('Время отмены истекло');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [booking]);

  if (!booking) return null;

  const sessionDateTime = new Date(booking.date + 'T' + booking.time);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success-100 text-success-700';
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'cancelled': return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Подтверждено';
      case 'pending': return 'Ожидает подтверждения';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  const handleCancelBooking = () => {
    if (onCancelBooking) {
      onCancelBooking(booking.id);
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
            <Icon name="CheckCircle" size={24} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Запись подтверждена</h2>
            <p className="text-sm text-text-secondary">Номер записи: #{booking.id}</p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" onClick={onClose} className="p-2">
            <Icon name="X" size={20} />
          </Button>
        )}
      </div>

      {/* Booking Details */}
      <div className="bg-primary-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-text-primary mb-3">{booking.type}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-text-secondary" />
                <span className="text-text-secondary">
                  {formatDateTime(sessionDateTime)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-text-secondary" />
                <span className="text-text-secondary">{booking.trainer}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-text-secondary" />
                <span className="text-text-secondary">{booking.duration} минут</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-text-secondary" />
                <span className="text-text-secondary">Зал №{booking.room || 1}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Статус</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusText(booking.status)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Стоимость</span>
                <span className="font-medium text-text-primary">{booking.price} ₽</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">До начала</span>
                <span className="font-medium text-primary">{timeUntilSession}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown and Actions */}
      <div className="space-y-4">
        {/* Cancellation Info */}
        <div className={`rounded-lg p-4 ${canCancel ? 'bg-warning-50' : 'bg-error-50'}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={canCancel ? "AlertTriangle" : "XCircle"} 
              size={16} 
              className={canCancel ? "text-warning" : "text-error"} 
            />
            <span className={`font-medium ${canCancel ? "text-warning" : "text-error"}`}>
              {canCancel ? "Возможность отмены" : "Отмена недоступна"}
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            {canCancel 
              ? `Вы можете отменить запись в течение ${cancelCountdown}`
              : "Время для отмены записи истекло (менее 6 часов до начала)"
            }
          </p>
        </div>

        {/* Reminder Settings */}
        <div className="bg-accent-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Bell" size={16} className="text-accent" />
            <span className="font-medium text-accent">Напоминания</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded border-border" />
              <span className="text-text-secondary">За 2 часа до тренировки</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded border-border" />
              <span className="text-text-secondary">За 30 минут до тренировки</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(`https://www.google.com/maps?q=55.7558,37.6176&z=15`, '_blank')}
          >
            <Icon name="MapPin" size={16} className="mr-2" />
            Показать на карте
          </Button>
          
          <Button
            variant="outline"
            className="flex-1"
          >
            <Icon name="Calendar" size={16} className="mr-2" />
            Добавить в календарь
          </Button>

          {canCancel && (
            <Button
              variant="danger"
              onClick={handleCancelBooking}
              className="flex-1"
            >
              <Icon name="X" size={16} className="mr-2" />
              Отменить запись
            </Button>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Phone" size={16} className="text-text-secondary" />
            <span className="font-medium text-text-primary">Контакты</span>
          </div>
          <div className="space-y-1 text-sm text-text-secondary">
            <p>Телефон: +7 (495) 123-45-67</p>
            <p>Email: info@altegio-fitness.ru</p>
            <p>Адрес: ул. Примерная, 123, Москва</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;