import React from 'react';

const StockStatusBadge = ({ status, quantity, reorderPoint }) => {
  const getStatusConfig = () => {
    if (quantity === 0) {
      return {
        label: 'Out of Stock',
        bgColor: 'bg-error/10',
        textColor: 'text-error',
        borderColor: 'border-error/20'
      };
    }
    
    if (quantity <= reorderPoint) {
      return {
        label: 'Low Stock',
        bgColor: 'bg-warning/10',
        textColor: 'text-warning',
        borderColor: 'border-warning/20'
      };
    }
    
    return {
      label: 'In Stock',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      borderColor: 'border-success/20'
    };
  };

  const config = getStatusConfig();

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-md text-xs font-medium
        border ${config?.bgColor} ${config?.textColor} ${config?.borderColor}
      `}
    >
      {config?.label}
    </span>
  );
};

export default StockStatusBadge;