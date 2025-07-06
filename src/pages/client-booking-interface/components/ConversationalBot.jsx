import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationalBot = ({ onBookingRequest, userMembership, availableSessions }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickActions, setQuickActions] = useState([]);
  const messagesEndRef = useRef(null);

  const initialMessages = [
    {
      id: 1,
      type: 'bot',
      content: `Привет! Я помогу вам записаться на тренировки. Ваше членство действительно до ${userMembership.expiryDate}. На этой неделе у вас ${userMembership.weeklySessionsUsed} из 2 доступных тренировок.`,
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'bot',
      content: 'Что вы хотели бы сделать?',
      timestamp: new Date()
    }
  ];

  const initialQuickActions = [
    { id: 1, text: 'Записаться на йогу', action: 'book_yoga' },
    { id: 2, text: 'Показать расписание', action: 'show_schedule' },
    { id: 3, text: 'Мои записи', action: 'my_bookings' },
    { id: 4, text: 'Отменить тренировку', action: 'cancel_booking' }
  ];

  useEffect(() => {
    setMessages(initialMessages);
    setQuickActions(initialQuickActions);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (content, type = 'user') => {
    const newMessage = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    simulateTyping(() => {
      if (message.includes('йога') || message.includes('yoga')) {
        const yogaSessions = availableSessions.filter(s => s.type.toLowerCase().includes('йога'));
        if (yogaSessions.length > 0) {
          addMessage(`Нашел ${yogaSessions.length} доступных занятий йогой. Посмотрите варианты в календаре ниже.`, 'bot');
          setQuickActions([
            { id: 1, text: 'Утренняя йога', action: 'book_morning_yoga' },
            { id: 2, text: 'Вечерняя йога', action: 'book_evening_yoga' },
            { id: 3, text: 'Другие тренировки', action: 'show_all' }
          ]);
        } else {
          addMessage('К сожалению, сейчас нет доступных занятий йогой. Могу предложить другие тренировки.', 'bot');
        }
      } else if (message.includes('расписание') || message.includes('schedule')) {
        addMessage('Вот ваше расписание на неделю. Доступные слоты выделены зеленым цветом.', 'bot');
        setQuickActions([
          { id: 1, text: 'Записаться сейчас', action: 'quick_book' },
          { id: 2, text: 'Фильтр по тренеру', action: 'filter_trainer' },
          { id: 3, text: 'Фильтр по времени', action: 'filter_time' }
        ]);
      } else if (message.includes('отмен') || message.includes('cancel')) {
        addMessage('Для отмены тренировки помните: отменить можно не позднее чем за 6 часов до начала. Какую тренировку хотите отменить?', 'bot');
        setQuickActions([
          { id: 1, text: 'Показать мои записи', action: 'show_my_bookings' },
          { id: 2, text: 'Отменить последнюю', action: 'cancel_last' }
        ]);
      } else if (message.includes('завтра') || message.includes('tomorrow')) {
        addMessage('Ищу доступные тренировки на завтра...', 'bot');
        setTimeout(() => {
          addMessage('На завтра доступно 5 тренировок. Выберите подходящее время в календаре.', 'bot');
        }, 1000);
      } else {
        addMessage('Понял! Могу помочь с записью на тренировки, показать расписание или ответить на вопросы о членстве.', 'bot');
        setQuickActions(initialQuickActions);
      }
    });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    handleBotResponse(inputValue);
    setInputValue('');
  };

  const handleQuickAction = (action) => {
    const actionTexts = {
      book_yoga: 'Записаться на йогу',
      show_schedule: 'Показать расписание',
      my_bookings: 'Мои записи',
      cancel_booking: 'Отменить тренировку',
      book_morning_yoga: 'Утренняя йога',
      book_evening_yoga: 'Вечерняя йога',
      show_all: 'Показать все тренировки',
      quick_book: 'Быстрая запись',
      filter_trainer: 'Фильтр по тренеру',
      filter_time: 'Фильтр по времени'
    };

    const actionText = actionTexts[action] || action;
    addMessage(actionText, 'user');
    handleBotResponse(actionText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Помощник по записи</h3>
            <p className="text-sm text-text-secondary">Онлайн • Готов помочь</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-96">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user' ?'bg-primary text-white' :'bg-secondary-100 text-text-primary'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-primary-100' : 'text-text-muted'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <div className="p-4 border-t border-border">
          <p className="text-sm text-text-secondary mb-2">Быстрые действия:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.action)}
                className="text-xs"
              >
                {action.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите ваш вопрос..."
              className="w-full px-3 py-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows="1"
            />
          </div>
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="px-3"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationalBot;