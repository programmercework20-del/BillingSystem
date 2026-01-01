import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TableCard = ({ table, onStatusChange, onViewOrder, onPrintBill }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 border-success/30 text-success';
      case 'occupied':
        return 'bg-error/10 border-error/30 text-error';
      case 'reserved':
        return 'bg-warning/10 border-warning/30 text-warning';
      case 'cleaning':
        return 'bg-accent/10 border-accent/30 text-accent';
      default:
        return 'bg-muted/10 border-muted/30 text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle2';
      case 'occupied':
        return 'Users';
      case 'reserved':
        return 'Clock';
      case 'cleaning':
        return 'Sparkles';
      default:
        return 'Circle';
    }
  };

  const getStatusLabel = (status) => {
    return status?.charAt(0)?.toUpperCase() + status?.slice(1);
  };

  return (
    <div
      className={`
        relative rounded-md border-2 p-4 transition-smooth hover-lift
        ${getStatusColor(table?.status)}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
            Table {table?.number}
          </h3>
          <div className="flex items-center gap-2">
            <Icon name={getStatusIcon(table?.status)} size={16} />
            <span className="text-sm font-medium caption">
              {getStatusLabel(table?.status)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-background/50 rounded-md">
          <Icon name="Users" size={14} className="text-muted-foreground" />
          <span className="text-sm font-medium data-text">{table?.capacity}</span>
        </div>
      </div>
      {table?.status === 'occupied' && (
        <>
          <div className="space-y-2 mb-4 pb-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Order Total</span>
              <span className="text-lg font-heading font-bold text-foreground data-text">
                ${table?.orderTotal?.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Elapsed Time</span>
              <span className="text-sm font-medium text-foreground data-text">
                {table?.elapsedTime}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Server</span>
              <span className="text-sm font-medium text-foreground">
                {table?.server}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onViewOrder(table)}
              fullWidth
            >
              View
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Printer"
              iconPosition="left"
              onClick={() => onPrintBill(table)}
              fullWidth
            >
              Bill
            </Button>
          </div>
        </>
      )}
      {table?.status === 'reserved' && (
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="User" size={16} className="text-muted-foreground" />
            <span className="text-foreground">{table?.reservationName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-foreground">{table?.reservationTime}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="CheckCircle2"
            iconPosition="left"
            onClick={() => onStatusChange(table?.id, 'occupied')}
            fullWidth
          >
            Mark Seated
          </Button>
        </div>
      )}
      {table?.status === 'available' && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Users"
            iconPosition="left"
            onClick={() => onStatusChange(table?.id, 'occupied')}
            fullWidth
          >
            Occupy
          </Button>
          <Button
            variant="secondary"
            size="sm"
            iconName="Clock"
            iconPosition="left"
            onClick={() => onStatusChange(table?.id, 'reserved')}
            fullWidth
          >
            Reserve
          </Button>
        </div>
      )}
      {table?.status === 'cleaning' && (
        <Button
          variant="success"
          size="sm"
          iconName="CheckCircle2"
          iconPosition="left"
          onClick={() => onStatusChange(table?.id, 'available')}
          fullWidth
        >
          Mark Clean
        </Button>
      )}
    </div>
  );
};

export default TableCard;