import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const DigitalWalletInterface = ({ totalAmount }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const walletOptions = [
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: 'Smartphone',
      description: 'Pay with your iPhone or Apple Watch'
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: 'Smartphone',
      description: 'Pay with your Android device'
    },
    {
      id: 'samsung-pay',
      name: 'Samsung Pay',
      icon: 'Smartphone',
      description: 'Pay with your Samsung device'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay with your PayPal account'
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground mb-4 md:mb-6">
        Digital Wallet Payment
      </h3>
      <div className="space-y-4 md:space-y-6">
        <div className="bg-accent/10 rounded-lg p-4 md:p-6 text-center border-2 border-accent/20">
          <p className="text-sm md:text-base text-muted-foreground mb-2">Amount to Pay</p>
          <p className="text-3xl md:text-4xl font-heading font-bold text-accent data-text">
            ${totalAmount?.toFixed(2)}
          </p>
        </div>

        <div>
          <label className="block text-sm md:text-base font-medium text-foreground mb-3">
            Select Wallet Provider
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {walletOptions?.map((wallet) => (
              <button
                key={wallet?.id}
                onClick={() => setSelectedWallet(wallet?.id)}
                className={`
                  flex items-center gap-3 p-4 rounded-lg border-2 transition-smooth
                  touch-target text-left
                  ${selectedWallet === wallet?.id
                    ? 'border-accent bg-accent/10 shadow-elevation-1'
                    : 'border-border hover:border-muted-foreground hover:bg-muted/50'
                  }
                  press-effect
                `}
              >
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                  ${selectedWallet === wallet?.id ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  <Icon name={wallet?.icon} size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`
                      text-sm md:text-base font-heading font-semibold
                      ${selectedWallet === wallet?.id ? 'text-accent' : 'text-foreground'}
                    `}>
                      {wallet?.name}
                    </span>
                    {selectedWallet === wallet?.id && (
                      <Icon name="CheckCircle2" size={16} className="text-accent flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5 line-clamp-1">
                    {wallet?.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedWallet && (
          <div className="bg-muted/30 rounded-lg p-4 md:p-6 text-center space-y-4">
            <div className="w-48 h-48 md:w-56 md:h-56 mx-auto bg-white rounded-lg p-4 shadow-elevation-2">
              <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 rounded flex items-center justify-center">
                <div className="text-center">
                  <Icon name="QrCode" size={64} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">QR Code</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm md:text-base font-medium text-foreground">
                Scan QR code with your {walletOptions?.find(w => w?.id === selectedWallet)?.name}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Or tap your device on the NFC reader
              </p>
            </div>
          </div>
        )}

        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-muted-foreground">
              Ensure your device has NFC enabled and your wallet app is set up with a valid payment method
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalWalletInterface;