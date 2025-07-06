import React from 'react';
import Icon from '../../../components/AppIcon';

const SalesFunnel = ({ data, title }) => {
  const calculateConversionRate = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current / previous) * 100).toFixed(1);
  };

  const getStageColor = (index) => {
    const colors = [
      'bg-primary text-primary-foreground',
      'bg-success text-success-foreground',
      'bg-warning text-warning-foreground',
      'bg-error text-error-foreground',
      'bg-secondary text-secondary-foreground'
    ];
    return colors[index % colors.length];
  };

  const getStageIcon = (stage) => {
    switch (stage.toLowerCase()) {
      case 'посетители': return 'Users';
      case 'консультации': return 'MessageCircle';
      case 'пробные занятия': return 'Play';
      case 'продажи': return 'CreditCard';
      case 'активные клиенты': return 'UserCheck';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-text-primary mb-6">{title}</h3>
      
      <div className="space-y-4">
        {data.map((stage, index) => {
          const conversionRate = index > 0 ? calculateConversionRate(stage.value, data[index - 1].value) : 100;
          const isLastStage = index === data.length - 1;
          
          return (
            <div key={index} className="relative">
              <div className="flex items-center space-x-4">
                {/* Stage Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStageColor(index)}`}>
                  <Icon name={getStageIcon(stage.stage)} size={20} />
                </div>
                
                {/* Stage Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">{stage.stage}</h4>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-bold text-text-primary">
                        {stage.value.toLocaleString('ru-RU')}
                      </span>
                      {index > 0 && (
                        <div className="text-right">
                          <div className="text-sm text-text-secondary">Конверсия</div>
                          <div className={`text-sm font-medium ${
                            conversionRate >= 20 ? 'text-success' : 
                            conversionRate >= 10 ? 'text-warning' : 'text-error'
                          }`}>
                            {conversionRate}%
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-secondary-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getStageColor(index).split(' ')[0]}`}
                      style={{ 
                        width: `${(stage.value / data[0].value) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Connector Line */}
              {!isLastStage && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-border"></div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {calculateConversionRate(data[data.length - 1].value, data[0].value)}%
            </div>
            <div className="text-sm text-text-secondary">Общая конверсия</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {data.reduce((sum, stage) => sum + stage.value, 0).toLocaleString('ru-RU')}
            </div>
            <div className="text-sm text-text-secondary">Всего контактов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {Math.round(data[0].value / (data[data.length - 1].value || 1))}:1
            </div>
            <div className="text-sm text-text-secondary">Соотношение</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesFunnel;