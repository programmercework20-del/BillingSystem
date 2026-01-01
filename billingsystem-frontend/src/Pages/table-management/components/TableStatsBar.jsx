import React from 'react';
import Icon from '../../../components/AppIcon';

const TableStatsBar = ({ stats }) => {
  const statItems = [
    {
      label: 'Available',
      value: stats?.available,
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Occupied',
      value: stats?.occupied,
      icon: 'Users',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'Reserved',
      value: stats?.reserved,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Cleaning',
      value: stats?.cleaning,
      icon: 'Sparkles',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems?.map((item, index) => (
        <div
          key={index}
          className="bg-card rounded-md shadow-elevation-1 p-4 md:p-6 transition-smooth hover-lift"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 ${item?.bgColor} rounded-md flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            <span className={`text-3xl md:text-4xl font-heading font-bold ${item?.color} data-text`}>
              {item?.value}
            </span>
          </div>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            {item?.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TableStatsBar;