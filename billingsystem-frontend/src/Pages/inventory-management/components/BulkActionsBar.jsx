import React from 'react';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ onExport, onImport, onScanBarcode, onConfigureAlerts }) => {
  return (
    <div className="bg-card rounded-md p-4 shadow-elevation-2 border border-border">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          iconName="Download"
          iconPosition="left"
        >
          Export CSV
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onImport}
          iconName="Upload"
          iconPosition="left"
        >
          Import CSV
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onScanBarcode}
          iconName="Scan"
          iconPosition="left"
        >
          Scan Barcode
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onConfigureAlerts}
          iconName="Bell"
          iconPosition="left"
        >
          Configure Alerts
        </Button>

        <div className="ml-auto">
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;