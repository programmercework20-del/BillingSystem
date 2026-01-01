import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterControls = ({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedSupplier,
  onSupplierChange,
  searchQuery,
  onSearchChange,
  onClearFilters
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'appetizers', label: 'Appetizers' },
    { value: 'main-course', label: 'Main Course' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'ingredients', label: 'Raw Ingredients' },
    { value: 'supplies', label: 'Kitchen Supplies' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' }
  ];

  const supplierOptions = [
    { value: 'all', label: 'All Suppliers' },
    { value: 'fresh-foods', label: 'Fresh Foods Co.' },
    { value: 'beverage-dist', label: 'Beverage Distributors Inc.' },
    { value: 'quality-meats', label: 'Quality Meats Supply' },
    { value: 'dairy-farm', label: 'Dairy Farm Products' },
    { value: 'spice-world', label: 'Spice World Imports' }
  ];

  return (
    <div className="bg-card rounded-md p-4 md:p-6 shadow-elevation-2 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />

        <Select
          options={categoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
          placeholder="Select category"
        />

        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={onStatusChange}
          placeholder="Select status"
        />

        <Select
          options={supplierOptions}
          value={selectedSupplier}
          onChange={onSupplierChange}
          placeholder="Select supplier"
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground caption">
          Active filters: {[selectedCategory !== 'all', selectedStatus !== 'all', selectedSupplier !== 'all', searchQuery]?.filter(Boolean)?.length}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;