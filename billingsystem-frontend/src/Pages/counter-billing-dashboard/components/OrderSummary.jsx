import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import OrderItem from './OrderItem';

const OrderSummary = ({ 
  orderItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearOrder,
  subtotal,
  tax,
  discount,
  total
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Current Order
        </h2>
        {orderItems?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearOrder}
            iconName="Trash2"
            iconPosition="left"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {orderItems?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Icon name="ShoppingCart" size={32} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No items in order</p>
            <p className="text-sm text-muted-foreground mt-1">Add products to start billing</p>
          </div>
        ) : (
          orderItems?.map((item) => (
            <OrderItem
              key={item?.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
            />
          ))
        )}
      </div>
      {orderItems?.length > 0 && (
        <div className="border-t border-border p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium data-text">${subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span className="font-medium data-text">${tax?.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-success">
                <span>Discount</span>
                <span className="font-medium data-text">-${discount?.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t border-border">
            <span className="text-lg font-heading font-semibold text-foreground">Total</span>
            <span className="text-2xl md:text-3xl font-heading font-bold text-accent data-text">
              ${total?.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;