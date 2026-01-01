import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummaryPanel = ({ summary }) => {
  const summaryCards = [
    {
      label: 'Total Orders',
      value: summary?.totalOrders,
      icon: 'Receipt',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Total Revenue',
      value: `$${summary?.totalRevenue?.toFixed(2)}`,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Completed',
      value: summary?.completed,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Cancelled',
      value: summary?.cancelled,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'Refunded',
      value: summary?.refunded,
      icon: 'RotateCcw',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {summaryCards?.map((card, index) => (
        <div
          key={index}
          className="bg-card rounded-md shadow-elevation-1 p-4 md:p-6 transition-smooth hover-lift"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 ${card?.bgColor} rounded-md flex items-center justify-center`}>
              <Icon name={card?.icon} size={20} className={card?.color} />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-heading font-bold text-card-foreground data-text mb-1">
            {card?.value}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground caption">
            {card?.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSummaryPanel;