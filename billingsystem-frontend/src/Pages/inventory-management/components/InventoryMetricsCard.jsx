import React from 'react';
import Icon from '../../../components/AppIcon';

const InventoryMetricsCard = ({ title, value, subtitle, icon, trend, trendValue }) => {
  return (
    <div className="bg-card rounded-md p-4 md:p-6 shadow-elevation-2 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground caption mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-card-foreground data-text">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground caption mt-1">{subtitle}</p>
          )}
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-md flex items-center justify-center flex-shrink-0">
          <Icon name={icon} size={20} color="var(--color-accent)" className="md:w-6 md:h-6" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <Icon
            name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
            size={16}
            color={trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'}
          />
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-success' : 'text-error'}`}>
            {trendValue}
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default InventoryMetricsCard;