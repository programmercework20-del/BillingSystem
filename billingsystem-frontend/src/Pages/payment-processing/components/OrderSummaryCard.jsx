import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummaryCard = ({ orderData }) => {
  const subtotal = orderData?.items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const taxAmount = subtotal * (orderData?.taxRate / 100);
  const discountAmount = orderData?.discount || 0;
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
            Order Summary
          </h3>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-md">
            <Icon name="Hash" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent data-text">
              {orderData?.orderNumber}
            </span>
          </div>
        </div>
        {orderData?.tableNumber && (
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <Icon name="Utensils" size={16} />
            <span className="text-sm caption">Table {orderData?.tableNumber}</span>
          </div>
        )}
      </div>
      <div className="p-4 md:p-6 space-y-3 max-h-[280px] md:max-h-[320px] overflow-y-auto custom-scrollbar">
        {orderData?.items?.map((item, index) => (
          <div key={index} className="flex items-start justify-between gap-3 pb-3 border-b border-border last:border-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                  {item?.name}
                </span>
                <span className="flex-shrink-0 px-2 py-0.5 bg-muted rounded text-xs font-medium text-muted-foreground data-text">
                  x{item?.quantity}
                </span>
              </div>
              {item?.notes && (
                <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                  {item?.notes}
                </p>
              )}
            </div>
            <span className="flex-shrink-0 text-sm md:text-base font-medium text-foreground data-text">
              ${(item?.price * item?.quantity)?.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 md:p-6 bg-muted/30 space-y-3">
        <div className="flex items-center justify-between text-sm md:text-base">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground data-text">${subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm md:text-base">
          <span className="text-muted-foreground">Tax ({orderData?.taxRate}%)</span>
          <span className="font-medium text-foreground data-text">${taxAmount?.toFixed(2)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex items-center justify-between text-sm md:text-base">
            <span className="text-success">Discount</span>
            <span className="font-medium text-success data-text">-${discountAmount?.toFixed(2)}</span>
          </div>
        )}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-base md:text-lg font-heading font-semibold text-foreground">
              Total Amount
            </span>
            <span className="text-2xl md:text-3xl font-heading font-bold text-accent data-text">
              ${total?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;