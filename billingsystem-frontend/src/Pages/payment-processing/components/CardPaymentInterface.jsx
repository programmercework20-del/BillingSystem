import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CardPaymentInterface = ({ totalAmount, cardType }) => {
  const [processingStatus, setProcessingStatus] = useState('waiting');
  const [progress, setProgress] = useState(0);

  const statusMessages = {
    waiting: 'Waiting for card...',
    reading: 'Reading card information...',
    authorizing: 'Authorizing payment...',
    processing: 'Processing transaction...',
    success: 'Payment successful!',
    failed: 'Payment failed. Please try again.'
  };

  const statusIcons = {
    waiting: 'CreditCard',
    reading: 'Loader',
    authorizing: 'Shield',
    processing: 'Loader',
    success: 'CheckCircle2',
    failed: 'XCircle'
  };

  useEffect(() => {
    if (processingStatus === 'waiting') {
      const timer = setTimeout(() => {
        setProcessingStatus('reading');
        setProgress(25);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [processingStatus]);

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground mb-4 md:mb-6">
        {cardType === 'credit-card' ? 'Credit Card' : 'Debit Card'} Payment
      </h3>
      <div className="space-y-4 md:space-y-6">
        <div className="bg-muted/30 rounded-lg p-6 md:p-8 text-center">
          <div className={`
            w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full flex items-center justify-center
            ${processingStatus === 'success' ? 'bg-success/20' : 
              processingStatus === 'failed' ? 'bg-error/20' : 'bg-accent/20'}
            ${processingStatus === 'reading' || processingStatus === 'processing' ? 'animate-pulse' : ''}
          `}>
            <Icon 
              name={statusIcons?.[processingStatus]} 
              size={32}
              className={
                processingStatus === 'success' ? 'text-success' :
                processingStatus === 'failed' ? 'text-error' : 'text-accent'
              }
            />
          </div>
          <p className="text-base md:text-lg font-medium text-foreground mb-2">
            {statusMessages?.[processingStatus]}
          </p>
          <p className="text-2xl md:text-3xl font-heading font-bold text-accent data-text">
            ${totalAmount?.toFixed(2)}
          </p>
        </div>

        {processingStatus !== 'waiting' && processingStatus !== 'success' && processingStatus !== 'failed' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Processing...</span>
              <span className="data-text">{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 md:p-5">
          <div className="flex items-start gap-3">
            <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base font-heading font-semibold text-foreground mb-1">
                Secure Payment
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground">
                Your payment is protected by PCI DSS Level 1 compliance and 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Card Type</span>
            <span className="font-medium text-foreground">
              {cardType === 'credit-card' ? 'Credit Card' : 'Debit Card'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Transaction ID</span>
            <span className="font-medium text-foreground data-text">TXN-{Date.now()?.toString()?.slice(-8)}</span>
          </div>
          <div className="flex items-center justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Terminal ID</span>
            <span className="font-medium text-foreground data-text">POS-001</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentInterface;