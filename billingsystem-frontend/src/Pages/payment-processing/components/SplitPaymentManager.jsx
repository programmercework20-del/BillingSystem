import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const SplitPaymentManager = ({ totalAmount, onSplitComplete }) => {
  const [splitPayments, setSplitPayments] = useState([]);
  const [currentMethod, setCurrentMethod] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');

  const remainingAmount = totalAmount - splitPayments?.reduce((sum, p) => sum + p?.amount, 0);

  const paymentMethodOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'debit-card', label: 'Debit Card' },
    { value: 'digital-wallet', label: 'Digital Wallet' }
  ];

  const handleAddPayment = () => {
    if (!currentMethod || !currentAmount || parseFloat(currentAmount) <= 0) return;
    
    const amount = parseFloat(currentAmount);
    if (amount > remainingAmount) {
      alert('Amount exceeds remaining balance');
      return;
    }

    setSplitPayments([
      ...splitPayments,
      {
        id: Date.now(),
        method: currentMethod,
        methodLabel: paymentMethodOptions?.find(m => m?.value === currentMethod)?.label,
        amount: amount
      }
    ]);

    setCurrentMethod('');
    setCurrentAmount('');
  };

  const handleRemovePayment = (id) => {
    setSplitPayments(splitPayments?.filter(p => p?.id !== id));
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
          Split Payment
        </h3>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
          <Icon name="Split" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground data-text">
            {splitPayments?.length} {splitPayments?.length === 1 ? 'Payment' : 'Payments'}
          </span>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <div className="bg-muted/30 rounded-lg p-4 md:p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-xl md:text-2xl font-heading font-bold text-foreground data-text">
                ${totalAmount?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Remaining</p>
              <p className={`text-xl md:text-2xl font-heading font-bold data-text ${
                remainingAmount === 0 ? 'text-success' : 'text-accent'
              }`}>
                ${remainingAmount?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {splitPayments?.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Applied Payments
            </label>
            <div className="space-y-2">
              {splitPayments?.map((payment) => (
                <div
                  key={payment?.id}
                  className="flex items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="CheckCircle2" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-medium text-foreground">
                        {payment?.methodLabel}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground data-text">
                        ${payment?.amount?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemovePayment(payment?.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-error/10 text-error transition-smooth"
                    aria-label="Remove payment"
                  >
                    <Icon name="Trash2" size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {remainingAmount > 0 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">
              Add Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                placeholder="Select method"
                options={paymentMethodOptions}
                value={currentMethod}
                onChange={setCurrentMethod}
              />
              <Input
                type="number"
                placeholder="Enter amount"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e?.target?.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={handleAddPayment}
              iconName="Plus"
              iconPosition="left"
              fullWidth
              disabled={!currentMethod || !currentAmount}
            >
              Add Payment
            </Button>
          </div>
        )}

        {remainingAmount === 0 && splitPayments?.length > 0 && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle2" size={24} className="text-success flex-shrink-0" />
              <div>
                <p className="text-sm md:text-base font-medium text-success">
                  Split payment complete
                </p>
                <p className="text-xs md:text-sm text-success/80 mt-0.5">
                  All payments have been applied successfully
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitPaymentManager;