import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkOperationsToolbar = ({ 
  selectedSessions, 
  onBulkAction, 
  onClearSelection,
  isVisible 
}) => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  if (!isVisible || selectedSessions.length === 0) return null;

  const bulkActions = [
    {
      id: 'move',
      label: 'Переместить',
      icon: 'Move',
      description: 'Переместить выбранные сессии',
      color: 'text-primary'
    },
    {
      id: 'duplicate',
      label: 'Дублировать',
      icon: 'Copy',
      description: 'Создать копии сессий',
      color: 'text-success'
    },
    {
      id: 'cancel',
      label: 'Отменить',
      icon: 'X',
      description: 'Отменить выбранные сессии',
      color: 'text-warning'
    },
    {
      id: 'delete',
      label: 'Удалить',
      icon: 'Trash2',
      description: 'Удалить выбранные сессии',
      color: 'text-error'
    }
  ];

  const handleBulkAction = (actionId) => {
    onBulkAction(actionId, selectedSessions);
    setIsActionMenuOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-surface border border-border rounded-lg shadow-lg p-4 min-w-[400px]">
        <div className="flex items-center justify-between">
          {/* Информация о выборе */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary-50 rounded-full p-2">
              <Icon name="CheckSquare" size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-text-primary">
                Выбрано сессий: {selectedSessions.length}
              </p>
              <p className="text-sm text-text-secondary">
                Выберите действие для выполнения
              </p>
            </div>
          </div>

          {/* Действия */}
          <div className="flex items-center space-x-2">
            {/* Быстрые действия */}
            <div className="flex items-center space-x-1">
              {bulkActions.slice(0, 2).map(action => (
                <Button
                  key={action.id}
                  variant="ghost"
                  onClick={() => handleBulkAction(action.id)}
                  className="p-2"
                  title={action.description}
                >
                  <Icon name={action.icon} size={16} className={action.color} />
                </Button>
              ))}
            </div>

            {/* Меню дополнительных действий */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                className="p-2"
              >
                <Icon name="MoreVertical" size={16} />
              </Button>

              {isActionMenuOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-surface border border-border rounded-lg shadow-lg py-2">
                  {bulkActions.slice(2).map(action => (
                    <button
                      key={action.id}
                      onClick={() => handleBulkAction(action.id)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-secondary-50 transition-colors"
                    >
                      <Icon name={action.icon} size={16} className={action.color} />
                      <div>
                        <p className="font-medium text-text-primary">{action.label}</p>
                        <p className="text-xs text-text-secondary">{action.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Очистить выбор */}
            <Button
              variant="ghost"
              onClick={onClearSelection}
              className="p-2"
              title="Очистить выбор"
            >
              <Icon name="X" size={16} className="text-text-secondary" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsToolbar;