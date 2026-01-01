import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';

import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import OrderSummaryCard from './components/OrderSummaryCard';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import CashPaymentCalculator from './components/CashPaymentCalculator';
import CardPaymentInterface from './components/CardPaymentInterface';
import DigitalWalletInterface from './components/DigitalWalletInterface';
import SplitPaymentManager from './components/SplitPaymentManager';
import TipCalculator from './components/TipCalculator';
import SecurityIndicators from './components/SecurityIndicators';

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cashReceived, setCashReceived] = useState(0);
  const [cashChange, setCashChange] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isSplitPayment, setIsSplitPayment] = useState(false);

  const mockOrderData = {
    orderNumber: "ORD-2025-001234",
    tableNumber: "12",
    taxRate: 8.5,
    discount: 5.00,
    items: [
      {
        name: "Grilled Chicken Sandwich",
        quantity: 2,
        price: 12.99,
        notes: "No onions, extra sauce"
      },
      {
        name: "Caesar Salad",
        quantity: 1,
        price: 8.99,
        notes: "Dressing on the side"
      },
      {
        name: "French Fries",
        quantity: 2,
        price: 4.99,
        notes: ""
      },
      {
        name: "Coca-Cola",
        quantity: 3,
        price: 2.99,
        notes: "No ice"
      }
    ]
  };

  const subtotal = mockOrderData?.items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const taxAmount = subtotal * (mockOrderData?.taxRate / 100);
  const discountAmount = mockOrderData?.discount || 0;
  const totalBeforeTip = subtotal + taxAmount - discountAmount;
  const finalTotal = totalBeforeTip + tipAmount;

  const handleCashAmountChange = (received, change) => {
    setCashReceived(received);
    setCashChange(change);
  };

  const handleTipChange = (amount) => {
    setTipAmount(amount);
  };

  const handleProcessPayment = async () => {
    if (paymentMethod === 'cash' && cashChange < 0) {
      alert('Insufficient amount received');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      console.log('Payment processed:', {
        method: paymentMethod,
        orderNumber: mockOrderData?.orderNumber,
        amount: finalTotal,
        tip: tipAmount,
        cashReceived: paymentMethod === 'cash' ? cashReceived : null,
        change: paymentMethod === 'cash' ? cashChange : null
      });
      
      setIsProcessing(false);
      setShowReceiptModal(true);
    }, 2000);
  };

  const handlePrintReceipt = () => {
    console.log('Printing receipt...');
    setTimeout(() => {
      setShowReceiptModal(false);
      navigate('/counter-billing-dashboard');
    }, 1000);
  };

  const canProcessPayment = () => {
    if (isSplitPayment) return false;
    if (paymentMethod === 'cash') {
      return cashReceived > 0 && cashChange >= 0;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-[76px] pb-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                Payment Processing
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Complete the transaction and generate receipt
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/counter-billing-dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                onMethodChange={setPaymentMethod}
                disabled={isProcessing}
              />

              {paymentMethod === 'cash' && (
                <CashPaymentCalculator
                  totalAmount={finalTotal}
                  onAmountChange={handleCashAmountChange}
                />
              )}

              {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
                <CardPaymentInterface
                  totalAmount={finalTotal}
                  cardType={paymentMethod}
                />
              )}

              {paymentMethod === 'digital-wallet' && (
                <DigitalWalletInterface totalAmount={finalTotal} />
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSplitPayment(!isSplitPayment)}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-smooth
                    ${isSplitPayment
                      ? 'border-accent bg-accent/10 text-accent' :'border-border hover:border-muted-foreground text-muted-foreground'
                    }
                  `}
                >
                  <Icon name="Split" size={20} />
                  <span className="text-sm md:text-base font-medium">Split Payment</span>
                </button>
              </div>

              {isSplitPayment && (
                <SplitPaymentManager
                  totalAmount={finalTotal}
                  onSplitComplete={() => setIsSplitPayment(false)}
                />
              )}

              <TipCalculator
                subtotal={totalBeforeTip}
                onTipChange={handleTipChange}
              />

              <SecurityIndicators />
            </div>

            <div className="space-y-4 md:space-y-6">
              <OrderSummaryCard orderData={mockOrderData} />

              {tipAmount > 0 && (
                <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm md:text-base text-muted-foreground">Tip Amount</span>
                    <span className="text-lg md:text-xl font-heading font-bold text-accent data-text">
                      ${tipAmount?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-base md:text-lg font-heading font-semibold text-foreground">
                      Final Total
                    </span>
                    <span className="text-2xl md:text-3xl font-heading font-bold text-accent data-text">
                      ${finalTotal?.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <Button
                variant="default"
                onClick={handleProcessPayment}
                loading={isProcessing}
                disabled={!canProcessPayment() || isProcessing}
                iconName="CreditCard"
                iconPosition="left"
                fullWidth
              >
                {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
              </Button>

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Icon name="AlertCircle" size={18} className="text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Ensure all payment details are verified before completing the transaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {showReceiptModal && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1020]"
            onClick={() => setShowReceiptModal(false)}
          />
          <div className="fixed inset-0 z-[1020] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-card rounded-lg shadow-elevation-5 overflow-hidden">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle2" size={32} className="text-success" />
                </div>
                <h2 className="text-2xl font-heading font-semibold text-card-foreground mb-2">
                  Payment Successful!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Transaction completed successfully
                </p>
                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Number</span>
                      <span className="font-medium text-foreground data-text">{mockOrderData?.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount Paid</span>
                      <span className="font-medium text-foreground data-text">${finalTotal?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Method</span>
                      <span className="font-medium text-foreground capitalize">{paymentMethod?.replace('-', ' ')}</span>
                    </div>
                    {paymentMethod === 'cash' && cashChange > 0 && (
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="text-success">Change Returned</span>
                        <span className="font-medium text-success data-text">${cashChange?.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowReceiptModal(false);
                      navigate('/counter-billing-dashboard');
                    }}
                    fullWidth
                  >
                    Close
                  </Button>
                  <Button
                    variant="default"
                    onClick={handlePrintReceipt}
                    iconName="Printer"
                    iconPosition="left"
                    fullWidth
                  >
                    Print Receipt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentProcessing;