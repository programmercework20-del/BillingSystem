import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const CashPaymentCalculator = ({ totalAmount, onAmountChange }) => {
  const [receivedAmount, setReceivedAmount] = useState('');
  const [changeAmount, setChangeAmount] = useState(0);

  const quickAmounts = [
    { label: '$20', value: 20 },
    { label: '$50', value: 50 },
    { label: '$100', value: 100 },
    { label: 'Exact', value: totalAmount }
  ];

  const denominations = [
    { label: '$100', value: 100 },
    { label: '$50', value: 50 },
    { label: '$20', value: 20 },
    { label: '$10', value: 10 },
    { label: '$5', value: 5 },
    { label: '$1', value: 1 }
  ];

  useEffect(() => {
    const received = parseFloat(receivedAmount) || 0;
    const change = received - totalAmount;
    setChangeAmount(change);
    onAmountChange(received, change);
  }, [receivedAmount, totalAmount, onAmountChange]);

  const handleQuickAmount = (amount) => {
    setReceivedAmount(amount?.toString());
  };

  const calculateDenominations = () => {
    if (changeAmount <= 0) return [];
    
    let remaining = changeAmount;
    const breakdown = [];
    
    denominations?.forEach(denom => {
      const count = Math.floor(remaining / denom?.value);
      if (count > 0) {
        breakdown?.push({ ...denom, count });
        remaining = remaining % denom?.value;
      }
    });
    
    return breakdown;
  };

  const denominationBreakdown = calculateDenominations();

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6 space-y-4 md:space-y-6">
      <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
        Cash Payment Calculator
      </h3>
      <div className="space-y-4">
        <Input
          label="Amount Received"
          type="number"
          placeholder="Enter amount received"
          value={receivedAmount}
          onChange={(e) => setReceivedAmount(e?.target?.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Quick Amount
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
            {quickAmounts?.map((amount) => (
              <button
                key={amount?.label}
                onClick={() => handleQuickAmount(amount?.value)}
                className="px-4 py-3 md:py-3.5 bg-muted hover:bg-accent hover:text-accent-foreground rounded-lg font-medium text-sm md:text-base transition-smooth touch-target press-effect"
              >
                {amount?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {receivedAmount && (
        <div className={`
          rounded-lg p-4 md:p-5 border-2
          ${changeAmount >= 0 
            ? 'bg-success/10 border-success/20' :'bg-error/10 border-error/20'
          }
        `}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm md:text-base font-medium ${changeAmount >= 0 ? 'text-success' : 'text-error'}`}>
              {changeAmount >= 0 ? 'Change to Return' : 'Insufficient Amount'}
            </span>
            {changeAmount >= 0 ? (
              <Icon name="CheckCircle2" size={20} className="text-success" />
            ) : (
              <Icon name="AlertCircle" size={20} className="text-error" />
            )}
          </div>
          <div className={`text-2xl md:text-3xl font-heading font-bold data-text ${changeAmount >= 0 ? 'text-success' : 'text-error'}`}>
            ${Math.abs(changeAmount)?.toFixed(2)}
          </div>
        </div>
      )}
      {denominationBreakdown?.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-4 md:p-5">
          <h4 className="text-sm md:text-base font-heading font-semibold text-foreground mb-3">
            Denomination Breakdown
          </h4>
          <div className="space-y-2">
            {denominationBreakdown?.map((denom, index) => (
              <div key={index} className="flex items-center justify-between text-sm md:text-base">
                <span className="text-muted-foreground">
                  {denom?.label} x {denom?.count}
                </span>
                <span className="font-medium text-foreground data-text">
                  ${(denom?.value * denom?.count)?.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CashPaymentCalculator;