import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const PaymentModal = ({ isOpen, onClose, orderData }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amountReceived, setAmountReceived] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const orderTotal = orderData?.total || 0;
  const changeAmount = amountReceived ? parseFloat(amountReceived) - orderTotal : 0;

  useEffect(() => {
    if (!isOpen) {
      setPaymentMethod('cash');
      setAmountReceived('');
      setIsProcessing(false);
    }
  }, [isOpen]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method !== 'cash') {
      setAmountReceived(orderTotal?.toString());
    } else {
      setAmountReceived('');
    }
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      console.log('Payment processed:', {
        method: paymentMethod,
        amount: orderTotal,
        received: amountReceived,
        change: changeAmount
      });
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  const paymentMethods = [
    { id: 'cash', label: 'Cash', icon: 'Banknote' },
    { id: 'card', label: 'Card', icon: 'CreditCard' },
    { id: 'upi', label: 'UPI', icon: 'Smartphone' },
    { id: 'wallet', label: 'Wallet', icon: 'Wallet' }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background z-[1020]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[1020] flex items-start justify-center pt-[8vh] px-4">
        <div className="w-full max-w-2xl bg-card rounded-lg shadow-elevation-5 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-heading font-semibold text-card-foreground">
              Process Payment
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted transition-smooth"
              aria-label="Close"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-muted/30 rounded-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground caption">Order Total</span>
                <span className="text-3xl font-heading font-bold text-foreground data-text">
                  ₹{orderTotal?.toFixed(2)}
                </span>
              </div>
              {orderData?.items && (
                <div className="space-y-2">
                  {orderData?.items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item?.quantity}x {item?.name}
                      </span>
                      <span className="text-foreground data-text">₹{item?.price?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {paymentMethods?.map((method) => (
                  <button
                    key={method?.id}
                    onClick={() => handlePaymentMethodChange(method?.id)}
                    className={`
                      flex flex-col items-center justify-center gap-2 p-4 rounded-md
                      border-2 transition-smooth touch-target
                      ${paymentMethod === method?.id
                        ? 'border-accent bg-accent/10 text-accent' :'border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <Icon name={method?.icon} size={28} />
                    <span className="text-sm font-medium">{method?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === 'cash' && (
              <div className="space-y-4">
                <Input
                  label="Amount Received"
                  type="number"
                  placeholder="Enter amount"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e?.target?.value)}
                  required
                />
                {amountReceived && changeAmount >= 0 && (
                  <div className="bg-success/10 border border-success/20 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-success font-medium">Change to Return</span>
                      <span className="text-2xl font-heading font-bold text-success data-text">
                        ₹{changeAmount?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
                {amountReceived && changeAmount < 0 && (
                  <div className="bg-error/10 border border-error/20 rounded-md p-4">
                    <div className="flex items-center gap-2 text-error">
                      <Icon name="AlertCircle" size={20} />
                      <span className="font-medium">Insufficient amount received</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {paymentMethod !== 'cash' && (
              <div className="bg-muted/30 rounded-md p-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Icon name="Info" size={20} />
                  <span className="text-sm">
                    {paymentMethod === 'card' && 'Please insert or tap card on the terminal'}
                    {paymentMethod === 'upi' && 'Scan QR code or enter UPI ID'}
                    {paymentMethod === 'wallet' && 'Select wallet provider and authorize payment'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleProcessPayment}
              loading={isProcessing}
              disabled={paymentMethod === 'cash' && (!amountReceived || changeAmount < 0)}
              iconName="Check"
              iconPosition="left"
            >
              {isProcessing ? 'Processing...' : 'Complete Payment'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;