import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentMethodSelector = ({ selectedMethod, onMethodChange, disabled }) => {
  const paymentMethods = [
    {
      id: 'cash',
      label: 'Cash',
      icon: 'Banknote',
      description: 'Pay with physical currency'
    },
    {
      id: 'credit-card',
      label: 'Credit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, Amex'
    },
    {
      id: 'debit-card',
      label: 'Debit Card',
      icon: 'CreditCard',
      description: 'Direct bank payment'
    },
    {
      id: 'digital-wallet',
      label: 'Digital Wallet',
      icon: 'Smartphone',
      description: 'Apple Pay, Google Pay'
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground mb-4 md:mb-6">
        Select Payment Method
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {paymentMethods?.map((method) => (
          <button
            key={method?.id}
            onClick={() => onMethodChange(method?.id)}
            disabled={disabled}
            className={`
              flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-lg border-2 transition-smooth
              touch-target text-left
              ${selectedMethod === method?.id
                ? 'border-accent bg-accent/10 shadow-elevation-1'
                : 'border-border hover:border-muted-foreground hover:bg-muted/50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover-lift press-effect'}
            `}
          >
            <div className={`
              flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center
              ${selectedMethod === method?.id ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}
            `}>
              <Icon name={method?.icon} size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`
                  text-sm md:text-base font-heading font-semibold
                  ${selectedMethod === method?.id ? 'text-accent' : 'text-foreground'}
                `}>
                  {method?.label}
                </span>
                {selectedMethod === method?.id && (
                  <Icon name="CheckCircle2" size={18} className="text-accent flex-shrink-0" />
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-1">
                {method?.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;