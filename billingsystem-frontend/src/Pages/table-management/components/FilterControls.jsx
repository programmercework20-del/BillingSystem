import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterControls = ({ filters, onFilterChange, onResetFilters }) => {
  const sectionOptions = [
    { value: 'all', label: 'All Sections' },
    { value: 'main', label: 'Main Dining' },
    { value: 'patio', label: 'Patio' },
    { value: 'private', label: 'Private Room' },
    { value: 'bar', label: 'Bar Area' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'occupied', label: 'Occupied' },
    { value: 'reserved', label: 'Reserved' },
    { value: 'cleaning', label: 'Cleaning' }
  ];

  const capacityOptions = [
    { value: 'all', label: 'All Sizes' },
    { value: '2', label: '2 Seats' },
    { value: '4', label: '4 Seats' },
    { value: '6', label: '6 Seats' },
    { value: '8', label: '8+ Seats' }
  ];

  return (
    <div className="bg-card rounded-md shadow-elevation-2 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={24} className="text-accent" />
          <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
            Filter Tables
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onResetFilters}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select
          label="Section"
          options={sectionOptions}
          value={filters?.section}
          onChange={(value) => onFilterChange('section', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          label="Capacity"
          options={capacityOptions}
          value={filters?.capacity}
          onChange={(value) => onFilterChange('capacity', value)}
        />
      </div>
    </div>
  );
};

export default FilterControls;