import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import OrderStatusBadge from './OrderStatusBadge';

const OrderTableMobile = ({ orders, onReprint, onRefund, onDuplicate }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

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

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="space-y-4">
      {orders?.map((order) => (
        <div
          key={order?.id}
          className="bg-card rounded-md shadow-elevation-2 overflow-hidden"
        >
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-semibold text-foreground data-text">
                    #{order?.id}
                  </span>
                  <OrderStatusBadge status={order?.status} />
                </div>
                <div className="text-sm text-muted-foreground caption">
                  {formatDate(order?.timestamp)}
                </div>
              </div>
              <button
                onClick={() => toggleExpand(order?.id)}
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted transition-smooth"
              >
                <Icon
                  name={expandedOrder === order?.id ? 'ChevronUp' : 'ChevronDown'}
                  size={20}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-b border-border">
              <div>
                <div className="text-sm text-muted-foreground caption mb-1">Customer</div>
                <div className="text-base font-medium text-foreground">{order?.customerName}</div>
                {order?.customerPhone && (
                  <div className="text-sm text-muted-foreground caption">{order?.customerPhone}</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground caption mb-1">Total</div>
                <div className="text-xl font-heading font-bold text-foreground data-text">
                  ${order?.total?.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Icon name={order?.paymentIcon} size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground capitalize">{order?.paymentMethod}</span>
            </div>

            {expandedOrder === order?.id && (
              <div className="pt-3 border-t border-border space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order?.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between py-2 border-b border-border last:border-0"
                      >
                        <div className="flex-1">
                          <div className="text-sm text-foreground font-medium">{item?.name}</div>
                          {item?.modifications && (
                            <div className="text-xs text-muted-foreground caption mt-1">
                              {item?.modifications}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 ml-2">
                          <span className="text-sm text-muted-foreground">x{item?.quantity}</span>
                          <span className="text-sm font-semibold text-foreground data-text min-w-[60px] text-right">
                            ${item?.price?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {order?.specialInstructions && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Special Instructions</h4>
                    <p className="text-sm text-muted-foreground">{order?.specialInstructions}</p>
                  </div>
                )}

                <div className="space-y-2 pt-3 border-t border-border">
                  {order?.discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-medium text-foreground">-${order?.discount?.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium text-foreground">${order?.tax?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => onReprint(order)}
                iconName="Printer"
                iconPosition="left"
              >
                Reprint
              </Button>
              {order?.status === 'completed' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => onRefund(order)}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Refund
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => onDuplicate(order)}
                    iconName="Copy"
                    iconPosition="left"
                  >
                    Duplicate
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTableMobile;