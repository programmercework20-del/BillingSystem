import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'PCI DSS Compliant',
      description: 'Level 1 certified payment processing'
    },
    {
      icon: 'Lock',
      title: '256-bit SSL Encryption',
      description: 'Bank-grade security for all transactions'
    },
    {
      icon: 'ShieldCheck',
      title: 'Fraud Protection',
      description: 'Real-time fraud detection and prevention'
    },
    {
      icon: 'FileCheck',
      title: 'Transaction Logging',
      description: 'Complete audit trail for all payments'
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Icon name="ShieldCheck" size={20} className="text-success" />
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
          Payment Security
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 md:p-4 bg-muted/30 rounded-lg"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={20} className="text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base font-heading font-semibold text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 md:mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground">
              All payment information is encrypted and securely processed. We never store complete card details on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityIndicators;