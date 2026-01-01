import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RefundModal = ({ isOpen, onClose, order }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [refundReason, setRefundReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !order) return null;

  const handleItemToggle = (itemIndex) => {
    setSelectedItems((prev) =>
      prev?.includes(itemIndex)
        ? prev?.filter((i) => i !== itemIndex)
        : [...prev, itemIndex]
    );
  };

  const calculateRefundAmount = () => {
    if (selectedItems?.length === 0) return 0;
    return selectedItems?.reduce((total, index) => {
      return total + order?.items?.[index]?.price;
    }, 0);
  };

  const handleProcessRefund = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      console.log('Refund processed:', {
        orderId: order?.id,
        items: selectedItems,
        amount: calculateRefundAmount(),
        reason: refundReason
      });
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  const refundAmount = calculateRefundAmount();

  return (
    <>
      <div
        className="fixed inset-0 bg-background z-[1020]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[1020] flex items-start justify-center pt-[8vh] px-4">
        <div className="w-full max-w-2xl bg-card rounded-lg shadow-elevation-5 overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-card-foreground">
              Process Refund - Order #{order?.id}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted transition-smooth"
              aria-label="Close"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <div className="p-4 md:p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="bg-muted/30 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Original Amount</span>
                <span className="text-lg font-heading font-bold text-foreground data-text">
                  ${order?.total?.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Payment Method</span>
                <span className="text-sm text-foreground capitalize">{order?.paymentMethod}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Select Items to Refund
              </label>
              <div className="space-y-2">
                {order?.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/30 transition-smooth"
                  >
                    <Checkbox
                      label={
                        <div className="flex items-center justify-between flex-1 ml-3">
                          <div>
                            <div className="text-sm font-medium text-foreground">{item?.name}</div>
                            <div className="text-xs text-muted-foreground caption">
                              Quantity: {item?.quantity}
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-foreground data-text ml-4">
                            ${item?.price?.toFixed(2)}
                          </span>
                        </div>
                      }
                      checked={selectedItems?.includes(index)}
                      onChange={() => handleItemToggle(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Input
              label="Refund Reason"
              type="text"
              placeholder="Enter reason for refund"
              value={refundReason}
              onChange={(e) => setRefundReason(e?.target?.value)}
              required
              description="Please provide a detailed reason for the refund"
            />

            {selectedItems?.length > 0 && (
              <div className="bg-warning/10 border border-warning/20 rounded-md p-4">
                <div className="flex items-center justify-between">
                  <span className="text-warning font-medium">Refund Amount</span>
                  <span className="text-2xl font-heading font-bold text-warning data-text">
                    ${refundAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 md:p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              fullWidth
              className="sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="warning"
              onClick={handleProcessRefund}
              loading={isProcessing}
              disabled={selectedItems?.length === 0 || !refundReason?.trim()}
              iconName="RotateCcw"
              iconPosition="left"
              fullWidth
              className="sm:w-auto"
            >
              {isProcessing ? 'Processing...' : 'Process Refund'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundModal;