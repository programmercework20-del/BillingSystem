import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StockStatusBadge from './StockStatusBadge';

const ProductCard = ({ product, onAdjustStock, onViewDetails }) => {
  const [isAdjusting, setIsAdjusting] = useState(false);

  const handleQuickAdjust = (adjustment) => {
    setIsAdjusting(true);
    setTimeout(() => {
      onAdjustStock(product?.id, adjustment);
      setIsAdjusting(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-card rounded-md p-4 shadow-elevation-2 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name="Package" size={24} color="var(--color-muted-foreground)" />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-card-foreground truncate">{product?.name}</h3>
            <p className="text-xs text-muted-foreground caption truncate">{product?.sku}</p>
          </div>
        </div>
        <StockStatusBadge
          quantity={product?.currentStock}
          reorderPoint={product?.reorderPoint}
          status={product?.currentStock <= product?.reorderPoint ? 'low' : 'normal'}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-muted-foreground caption mb-1">Category</p>
          <p className="text-sm font-medium text-card-foreground">{product?.category}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground caption mb-1">Current Stock</p>
          <p className="text-sm font-medium text-card-foreground data-text">
            {product?.currentStock} {product?.unit}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground caption mb-1">Reorder Point</p>
          <p className="text-sm font-medium text-card-foreground data-text">{product?.reorderPoint}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground caption mb-1">Last Updated</p>
          <p className="text-sm font-medium text-card-foreground caption">{formatDate(product?.lastUpdated)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdjust(-1)}
          disabled={isAdjusting || product?.currentStock === 0}
          iconName="Minus"
          fullWidth
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdjust(1)}
          disabled={isAdjusting}
          iconName="Plus"
          fullWidth
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(product)}
          iconName="Eye"
        />
      </div>
    </div>
  );
};

export default ProductCard;