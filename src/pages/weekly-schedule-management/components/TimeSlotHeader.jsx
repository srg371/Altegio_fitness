import React from 'react';

const TimeSlotHeader = ({ time }) => {
  const isPeakHour = () => {
    const hour = parseInt(time.split(':')[0]);
    return (hour >= 7 && hour <= 9) || (hour >= 18 && hour <= 20);
  };

  return (
    <div className={`
      p-3 border-r border-border flex items-center justify-center
      ${isPeakHour() ? 'bg-primary-50' : 'bg-secondary-50'}
    `}>
      <div className="text-center">
        <div className="text-sm font-medium text-text-primary">
          {time}
        </div>
        {isPeakHour() && (
          <div className="text-xs text-primary mt-1">
            Пик
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSlotHeader;