import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeekNavigation = ({ currentWeek, onWeekChange, onToday }) => {
  const formatWeekRange = (weekStart) => {
    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    const formatDate = (date) => {
      return date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long' 
      });
    };
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const isCurrentWeek = () => {
    const today = new Date();
    const weekStart = new Date(currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return today >= weekStart && today <= weekEnd;
  };

  const goToPreviousWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() - 7);
    onWeekChange(newWeek);
  };

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + 7);
    onWeekChange(newWeek);
  };

  return (
    <div className="flex items-center justify-between bg-surface rounded-lg border border-border p-4 mb-6">
      {/* Навигация по неделям */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={goToPreviousWeek}
          iconName="ChevronLeft"
          className="p-2"
        />
        
        <div className="text-center">
          <h2 className="text-lg font-semibold text-text-primary">
            {formatWeekRange(currentWeek)}
          </h2>
          <p className="text-sm text-text-secondary">
            {currentWeek.getFullYear()} год
          </p>
        </div>
        
        <Button
          variant="ghost"
          onClick={goToNextWeek}
          iconName="ChevronRight"
          className="p-2"
        />
      </div>

      {/* Быстрые действия */}
      <div className="flex items-center space-x-3">
        {!isCurrentWeek() && (
          <Button
            variant="ghost"
            onClick={onToday}
            iconName="Calendar"
            iconPosition="left"
          >
            Текущая неделя
          </Button>
        )}
        
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Info" size={14} />
          <span>Перетащите сессии для изменения расписания</span>
        </div>
      </div>
    </div>
  );
};

export default WeekNavigation;