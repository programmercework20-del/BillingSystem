import React from 'react';

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    completed: {
      label: 'Completed',
      className: 'bg-success/10 text-success border-success/20'
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-error/10 text-error border-error/20'
    },
    refunded: {
      label: 'Refunded',
      className: 'bg-warning/10 text-warning border-warning/20'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.completed;

  return (
    <span
      className={`inline-flex items-center px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium border ${config?.className}`}
    >
      {config?.label}
    </span>
  );
};

export default OrderStatusBadge;