import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentControls = ({ 
  discount, 
  onDiscountChange, 
  onProcessPayment, 
  onPrintKOT, 
  onPrintReceipt,
  hasItems 
}) => {
  return (
    <div className="space-y-4">
      <Input
        label="Discount Amount ($)"
        type="number"
        placeholder="0.00"
        value={discount}
        onChange={(e) => onDiscountChange(e?.target?.value)}
        description="Enter discount amount to apply"
      />
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={onPrintKOT}
          disabled={!hasItems}
          iconName="Printer"
          iconPosition="left"
          className="h-12"
        >
          Print KOT
        </Button>
        <Button
          variant="outline"
          onClick={onPrintReceipt}
          disabled={!hasItems}
          iconName="Receipt"
          iconPosition="left"
          className="h-12"
        >
          Print Receipt
        </Button>
      </div>
      <Button
        variant="default"
        onClick={onProcessPayment}
        disabled={!hasItems}
        iconName="CreditCard"
        iconPosition="left"
        fullWidth
        className="h-14 text-base md:text-lg"
      >
        Process Payment
      </Button>
    </div>
  );
};

export default PaymentControls;