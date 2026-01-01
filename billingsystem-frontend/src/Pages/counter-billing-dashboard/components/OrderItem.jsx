import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm md:text-base text-foreground line-clamp-1">
          {item?.name}
        </h4>
        <p className="text-xs md:text-sm text-muted-foreground data-text">
          ${item?.price?.toFixed(2)} each
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(item?.id, item?.quantity - 1)}
          disabled={item?.quantity <= 1}
        >
          <Icon name="Minus" size={16} />
        </Button>
        
        <span className="w-8 text-center font-medium data-text">
          {item?.quantity}
        </span>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(item?.id, item?.quantity + 1)}
        >
          <Icon name="Plus" size={16} />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm md:text-base data-text whitespace-nowrap">
          ${(item?.price * item?.quantity)?.toFixed(2)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item?.id)}
        >
          <Icon name="Trash2" size={16} className="text-error" />
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;