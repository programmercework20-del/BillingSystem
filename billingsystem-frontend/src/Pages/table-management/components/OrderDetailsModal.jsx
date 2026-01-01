import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderDetailsModal = ({ isOpen, onClose, table }) => {
  if (!isOpen || !table) return null;

  const orderItems = [
    { id: 1, name: 'Grilled Salmon', quantity: 2, price: 24.99, notes: 'No lemon' },
    { id: 2, name: 'Caesar Salad', quantity: 1, price: 12.99, notes: '' },
    { id: 3, name: 'Ribeye Steak', quantity: 1, price: 34.99, notes: 'Medium rare' },
    { id: 4, name: 'Red Wine', quantity: 2, price: 15.99, notes: '' },
    { id: 5, name: 'Chocolate Cake', quantity: 1, price: 8.99, notes: 'Extra whipped cream' }
  ];

  const subtotal = orderItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1020]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[1020] flex items-start justify-center pt-[8vh] px-4 overflow-y-auto">
        <div className="w-full max-w-3xl bg-card rounded-lg shadow-elevation-5 mb-8">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-semibold text-card-foreground">
                Table {table?.number} - Order Details
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Server: {table?.server} • Time: {table?.elapsedTime}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted transition-smooth touch-target"
              aria-label="Close"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <div className="p-4 md:p-6 space-y-4">
            <div className="space-y-3">
              {orderItems?.map((item) => (
                <div
                  key={item?.id}
                  className="flex items-start justify-between p-4 bg-muted/30 rounded-md"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-base md:text-lg font-medium text-foreground">
                        {item?.name}
                      </span>
                      <span className="text-sm text-muted-foreground data-text">
                        x{item?.quantity}
                      </span>
                    </div>
                    {item?.notes && (
                      <div className="flex items-center gap-2 mt-2">
                        <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground caption">
                          {item?.notes}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-base md:text-lg font-semibold text-foreground data-text">
                    ${(item?.price * item?.quantity)?.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex items-center justify-between text-sm md:text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground data-text">
                  ${subtotal?.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm md:text-base">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium text-foreground data-text">
                  ${tax?.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-lg md:text-xl font-heading font-semibold text-foreground">
                  Total
                </span>
                <span className="text-2xl md:text-3xl font-heading font-bold text-accent data-text">
                  ${total?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="secondary"
              iconName="Edit"
              iconPosition="left"
            >
              Modify Order
            </Button>
            <Button
              variant="default"
              iconName="CreditCard"
              iconPosition="left"
            >
              Process Payment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsModal;