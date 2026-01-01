import React from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const OrderFilters = ({ filters, onFilterChange, onReset, onExport }) => {
  const paymentMethodOptions = [
    { value: 'all', label: 'All Payment Methods' },
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'wallet', label: 'Wallet' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'refunded', label: 'Refunded' }
  ];

  return (
    <div className="bg-card rounded-md shadow-elevation-2 p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
          Filter Orders
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="text"
          label="Search"
          placeholder="Order ID, Customer, Phone"
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <Input
          type="date"
          label="From Date"
          value={filters?.fromDate}
          onChange={(e) => onFilterChange('fromDate', e?.target?.value)}
        />

        <Input
          type="date"
          label="To Date"
          value={filters?.toDate}
          onChange={(e) => onFilterChange('toDate', e?.target?.value)}
        />

        <Select
          label="Payment Method"
          options={paymentMethodOptions}
          value={filters?.paymentMethod}
          onChange={(value) => onFilterChange('paymentMethod', value)}
        />

        <Select
          label="Order Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <div className="flex items-end">
          <Button
            variant="default"
            fullWidth
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;