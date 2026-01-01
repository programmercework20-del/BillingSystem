import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAddQuickItem }) => {
  const quickItems = [
    { id: 'water', name: 'Water', price: 1.50, icon: 'Droplet' },
    { id: 'coffee', name: 'Coffee', price: 3.50, icon: 'Coffee' },
    { id: 'fries', name: 'Fries', price: 4.99, icon: 'Utensils' },
    { id: 'soda', name: 'Soda', price: 2.50, icon: 'Wine' }
  ];

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-3">
      {quickItems?.map((item) => (
        <Button
          key={item?.id}
          variant="outline"
          onClick={() => onAddQuickItem(item)}
          iconName={item?.icon}
          iconPosition="left"
          className="h-12 md:h-14"
        >
          <span className="flex flex-col items-start">
            <span className="text-xs md:text-sm font-medium">{item?.name}</span>
            <span className="text-xs text-muted-foreground data-text">${item?.price}</span>
          </span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;