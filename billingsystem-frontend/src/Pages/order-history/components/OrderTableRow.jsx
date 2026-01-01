import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import OrderStatusBadge from './OrderStatusBadge';

const OrderTableRow = ({ order, onReprint, onRefund, onDuplicate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    return new Date(date)?.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <tr className="border-b border-border hover:bg-muted/30 transition-smooth">
        <td className="px-4 md:px-6 py-3 md:py-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-smooth"
          >
            <Icon
              name={isExpanded ? 'ChevronDown' : 'ChevronRight'}
              size={20}
            />
            <span className="font-medium data-text text-sm md:text-base">#{order?.id}</span>
          </button>
        </td>
        <td className="px-4 md:px-6 py-3 md:py-4">
          <div className="text-sm md:text-base text-foreground">{formatDate(order?.timestamp)}</div>
        </td>
        <td className="px-4 md:px-6 py-3 md:py-4">
          <div className="text-sm md:text-base text-foreground font-medium">{order?.customerName}</div>
          {order?.customerPhone && (
            <div className="text-xs md:text-sm text-muted-foreground caption">{order?.customerPhone}</div>
          )}
        </td>
        <td className="px-4 md:px-6 py-3 md:py-4">
          <div className="text-sm md:text-base font-semibold text-foreground data-text">
            ${order?.total?.toFixed(2)}
          </div>
        </td>
        <td className="px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <Icon name={order?.paymentIcon} size={16} className="text-muted-foreground" />
            <span className="text-sm md:text-base text-foreground capitalize">{order?.paymentMethod}</span>
          </div>
        </td>
        <td className="px-4 md:px-6 py-3 md:py-4">
          <OrderStatusBadge status={order?.status} />
        </td>
        <td className="px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onReprint(order)}
              iconName="Printer"
            />
            {order?.status === 'completed' && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRefund(order)}
                  iconName="RotateCcw"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDuplicate(order)}
                  iconName="Copy"
                />
              </>
            )}
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-muted/20">
          <td colSpan="7" className="px-4 md:px-6 py-4 md:py-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm md:text-base font-semibold text-foreground mb-3">Order Items</h4>
                <div className="space-y-2">
                  {order?.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div className="flex-1">
                        <div className="text-sm md:text-base text-foreground font-medium">{item?.name}</div>
                        {item?.modifications && (
                          <div className="text-xs md:text-sm text-muted-foreground caption mt-1">
                            {item?.modifications}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className="text-sm md:text-base text-muted-foreground">x{item?.quantity}</span>
                        <span className="text-sm md:text-base font-semibold text-foreground data-text min-w-[60px] md:min-w-[80px] text-right">
                          ${item?.price?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {order?.specialInstructions && (
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-2">Special Instructions</h4>
                  <p className="text-sm md:text-base text-muted-foreground">{order?.specialInstructions}</p>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center justify-between pt-3 border-t border-border">
                <div className="space-y-1 mb-3 md:mb-0">
                  {order?.discount > 0 && (
                    <div className="text-sm md:text-base text-muted-foreground">
                      Discount: <span className="font-medium">-${order?.discount?.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="text-sm md:text-base text-muted-foreground">
                    Tax: <span className="font-medium">${order?.tax?.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-lg md:text-xl font-heading font-bold text-foreground data-text">
                  Total: ${order?.total?.toFixed(2)}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default OrderTableRow;