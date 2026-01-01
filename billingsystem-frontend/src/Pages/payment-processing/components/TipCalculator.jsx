import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const TipCalculator = ({ subtotal, onTipChange }) => {
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState('');

  const tipPresets = [
    { label: '10%', percentage: 10 },
    { label: '15%', percentage: 15 },
    { label: '18%', percentage: 18 },
    { label: '20%', percentage: 20 }
  ];

  const handlePresetTip = (percentage) => {
    setSelectedTip(percentage);
    setCustomTip('');
    const tipAmount = (subtotal * percentage) / 100;
    onTipChange(tipAmount);
  };

  const handleCustomTip = (value) => {
    setCustomTip(value);
    setSelectedTip(null);
    const tipAmount = parseFloat(value) || 0;
    onTipChange(tipAmount);
  };

  const calculateTipAmount = () => {
    if (customTip) {
      return parseFloat(customTip) || 0;
    }
    if (selectedTip) {
      return (subtotal * selectedTip) / 100;
    }
    return 0;
  };

  const tipAmount = calculateTipAmount();

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Icon name="Heart" size={20} className="text-accent" />
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
          Add Tip (Optional)
        </h3>
      </div>
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Quick Tip Amount
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
            {tipPresets?.map((preset) => (
              <button
                key={preset?.percentage}
                onClick={() => handlePresetTip(preset?.percentage)}
                className={`
                  px-4 py-3 md:py-3.5 rounded-lg font-medium text-sm md:text-base
                  transition-smooth touch-target press-effect
                  ${selectedTip === preset?.percentage
                    ? 'bg-accent text-accent-foreground shadow-elevation-1'
                    : 'bg-muted hover:bg-muted-foreground/10 text-foreground'
                  }
                `}
              >
                <div>{preset?.label}</div>
                <div className="text-xs md:text-sm opacity-80 data-text">
                  ${((subtotal * preset?.percentage) / 100)?.toFixed(2)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Input
            label="Custom Tip Amount"
            type="number"
            placeholder="Enter custom amount"
            value={customTip}
            onChange={(e) => handleCustomTip(e?.target?.value)}
          />
        </div>

        {tipAmount > 0 && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Heart" size={20} className="text-accent" />
                <span className="text-sm md:text-base font-medium text-accent">
                  Tip Amount
                </span>
              </div>
              <span className="text-xl md:text-2xl font-heading font-bold text-accent data-text">
                ${tipAmount?.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-accent/20">
              <span className="text-sm md:text-base text-muted-foreground">
                New Total
              </span>
              <span className="text-lg md:text-xl font-heading font-bold text-foreground data-text">
                ${(subtotal + tipAmount)?.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-muted-foreground">
              Tips are greatly appreciated by our staff and help support excellent service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;