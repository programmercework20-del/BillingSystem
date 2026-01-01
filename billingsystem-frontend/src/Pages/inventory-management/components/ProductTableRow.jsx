import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StockStatusBadge from './StockStatusBadge';

const ProductTableRow = ({ product, onAdjustStock, onViewDetails }) => {
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
    <tr className="border-b border-border hover:bg-muted/30 transition-smooth">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name="Package" size={20} color="var(--color-muted-foreground)" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-card-foreground truncate">{product?.name}</p>
            <p className="text-xs text-muted-foreground caption truncate">{product?.sku}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-muted-foreground">{product?.category}</span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium data-text">{product?.currentStock}</span>
          <span className="text-xs text-muted-foreground">/{product?.unit}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-muted-foreground data-text">{product?.reorderPoint}</span>
      </td>
      <td className="px-4 py-4">
        <StockStatusBadge
          quantity={product?.currentStock}
          reorderPoint={product?.reorderPoint}
          status={product?.currentStock <= product?.reorderPoint ? 'low' : 'normal'}
        />
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-muted-foreground caption">{formatDate(product?.lastUpdated)}</span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdjust(-1)}
            disabled={isAdjusting || product?.currentStock === 0}
            iconName="Minus"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdjust(1)}
            disabled={isAdjusting}
            iconName="Plus"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(product)}
            iconName="Eye"
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductTableRow;