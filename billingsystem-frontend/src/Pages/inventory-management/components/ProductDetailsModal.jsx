import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StockStatusBadge from './StockStatusBadge';

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })?.format(amount);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1020]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[1020] flex items-start justify-center pt-[8vh] px-4 overflow-y-auto">
        <div className="w-full max-w-3xl bg-card rounded-lg shadow-elevation-5 mb-8">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center">
                <Icon name="Package" size={24} color="var(--color-accent)" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-semibold text-card-foreground">
                  {product?.name}
                </h2>
                <p className="text-sm text-muted-foreground caption mt-1">{product?.sku}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted transition-smooth"
              aria-label="Close"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-md p-4">
                <p className="text-xs text-muted-foreground caption mb-2">Current Stock</p>
                <p className="text-2xl font-heading font-bold text-card-foreground data-text">
                  {product?.currentStock} {product?.unit}
                </p>
                <StockStatusBadge
                  quantity={product?.currentStock}
                  reorderPoint={product?.reorderPoint}
                  status={product?.currentStock <= product?.reorderPoint ? 'low' : 'adequate'}
                />
              </div>

              <div className="bg-muted/30 rounded-md p-4">
                <p className="text-xs text-muted-foreground caption mb-2">Reorder Point</p>
                <p className="text-2xl font-heading font-bold text-card-foreground data-text">
                  {product?.reorderPoint}
                </p>
                <p className="text-xs text-muted-foreground caption mt-2">Suggested: {product?.suggestedReorder}</p>
              </div>

              <div className="bg-muted/30 rounded-md p-4">
                <p className="text-xs text-muted-foreground caption mb-2">Unit Cost</p>
                <p className="text-2xl font-heading font-bold text-card-foreground data-text">
                  {formatCurrency(product?.unitCost)}
                </p>
                <p className="text-xs text-muted-foreground caption mt-2">Total: {formatCurrency(product?.currentStock * product?.unitCost)}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-heading font-semibold text-card-foreground mb-3">
                Product Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground caption mb-1">Category</p>
                  <p className="text-sm font-medium text-card-foreground">{product?.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground caption mb-1">Supplier</p>
                  <p className="text-sm font-medium text-card-foreground">{product?.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground caption mb-1">Last Updated</p>
                  <p className="text-sm font-medium text-card-foreground caption">{formatDate(product?.lastUpdated)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground caption mb-1">Storage Location</p>
                  <p className="text-sm font-medium text-card-foreground">{product?.storageLocation}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-heading font-semibold text-card-foreground mb-3">
                Recent Stock Movements
              </h3>
              <div className="space-y-3">
                {product?.recentMovements?.map((movement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                        movement?.type === 'in' ? 'bg-success/10' : 'bg-error/10'
                      }`}>
                        <Icon
                          name={movement?.type === 'in' ? 'ArrowDown' : 'ArrowUp'}
                          size={16}
                          color={movement?.type === 'in' ? 'var(--color-success)' : 'var(--color-error)'}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          {movement?.type === 'in' ? 'Stock In' : 'Stock Out'}: {movement?.quantity} {product?.unit}
                        </p>
                        <p className="text-xs text-muted-foreground caption">{movement?.reason}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground caption whitespace-nowrap">
                      {formatDate(movement?.date)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-heading font-semibold text-card-foreground mb-3">
                Consumption Pattern
              </h3>
              <div className="bg-muted/30 rounded-md p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground caption mb-1">Daily Avg</p>
                    <p className="text-lg font-heading font-bold text-card-foreground data-text">
                      {product?.consumptionPattern?.daily}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground caption mb-1">Weekly Avg</p>
                    <p className="text-lg font-heading font-bold text-card-foreground data-text">
                      {product?.consumptionPattern?.weekly}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground caption mb-1">Monthly Avg</p>
                    <p className="text-lg font-heading font-bold text-card-foreground data-text">
                      {product?.consumptionPattern?.monthly}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="default" iconName="ShoppingCart" iconPosition="left">
              Create Purchase Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsModal;