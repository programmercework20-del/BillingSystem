import React, { useState, useMemo } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OrderFilters from './components/OrderFilters';
import OrderSummaryPanel from './components/OrderSummaryPanel';
import OrderTableRow from './components/OrderTableRow';
import OrderTableMobile from './components/OrderTableMobile';
import RefundModal from './components/RefundModal';

const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    fromDate: '',
    toDate: '',
    paymentMethod: 'all',
    status: 'all'
  });

  const mockOrders = [
    {
      id: 'ORD-2025-001',
      timestamp: new Date('2025-12-28T10:30:00'),
      customerName: 'Sarah Johnson',
      customerPhone: '+1 (555) 123-4567',
      total: 45.99,
      paymentMethod: 'card',
      paymentIcon: 'CreditCard',
      status: 'completed',
      items: [
        { name: 'Grilled Chicken Sandwich', quantity: 2, price: 24.98, modifications: 'No onions, extra cheese' },
        { name: 'French Fries', quantity: 2, price: 8.00 },
        { name: 'Coca Cola', quantity: 2, price: 6.00 }
      ],
      specialInstructions: 'Please pack separately for takeout',
      discount: 5.00,
      tax: 3.99
    },
    {
      id: 'ORD-2025-002',
      timestamp: new Date('2025-12-28T11:15:00'),
      customerName: 'Michael Chen',
      customerPhone: '+1 (555) 234-5678',
      total: 78.50,
      paymentMethod: 'upi',
      paymentIcon: 'Smartphone',
      status: 'completed',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 18.99 },
        { name: 'Caesar Salad', quantity: 2, price: 24.00 },
        { name: 'Garlic Bread', quantity: 1, price: 6.99 },
        { name: 'Tiramisu', quantity: 2, price: 16.00 }
      ],
      specialInstructions: 'Extra dressing on the side',
      discount: 0,
      tax: 7.52
    },
    {
      id: 'ORD-2025-003',
      timestamp: new Date('2025-12-28T12:00:00'),
      customerName: 'Emily Rodriguez',
      customerPhone: '+1 (555) 345-6789',
      total: 32.75,
      paymentMethod: 'cash',
      paymentIcon: 'Banknote',
      status: 'completed',
      items: [
        { name: 'Vegetable Burger', quantity: 1, price: 12.99 },
        { name: 'Onion Rings', quantity: 1, price: 5.99 },
        { name: 'Iced Tea', quantity: 2, price: 6.00 }
      ],
      discount: 2.00,
      tax: 2.77
    },
    {
      id: 'ORD-2025-004',
      timestamp: new Date('2025-12-28T12:45:00'),
      customerName: 'David Thompson',
      customerPhone: '+1 (555) 456-7890',
      total: 56.25,
      paymentMethod: 'wallet',
      paymentIcon: 'Wallet',
      status: 'cancelled',
      items: [
        { name: 'Beef Steak', quantity: 1, price: 34.99 },
        { name: 'Mashed Potatoes', quantity: 1, price: 7.99 },
        { name: 'Red Wine', quantity: 1, price: 12.00 }
      ],
      specialInstructions: 'Medium rare steak',
      discount: 0,
      tax: 5.27
    },
    {
      id: 'ORD-2025-005',
      timestamp: new Date('2025-12-28T13:20:00'),
      customerName: 'Jessica Martinez',
      customerPhone: '+1 (555) 567-8901',
      total: 41.80,
      paymentMethod: 'card',
      paymentIcon: 'CreditCard',
      status: 'refunded',
      items: [
        { name: 'Chicken Wings', quantity: 12, price: 18.99 },
        { name: 'Buffalo Sauce', quantity: 2, price: 4.00 },
        { name: 'Beer', quantity: 2, price: 12.00 }
      ],
      discount: 0,
      tax: 3.81
    },
    {
      id: 'ORD-2025-006',
      timestamp: new Date('2025-12-28T14:00:00'),
      customerName: 'Robert Wilson',
      customerPhone: '+1 (555) 678-9012',
      total: 92.40,
      paymentMethod: 'upi',
      paymentIcon: 'Smartphone',
      status: 'completed',
      items: [
        { name: 'Seafood Platter', quantity: 1, price: 45.99 },
        { name: 'Lobster Bisque', quantity: 2, price: 24.00 },
        { name: 'White Wine', quantity: 1, price: 15.00 }
      ],
      specialInstructions: 'Allergic to shellfish - please ensure no cross-contamination',
      discount: 10.00,
      tax: 8.41
    },
    {
      id: 'ORD-2025-007',
      timestamp: new Date('2025-12-28T14:30:00'),
      customerName: 'Amanda Lee',
      customerPhone: '+1 (555) 789-0123',
      total: 28.50,
      paymentMethod: 'cash',
      paymentIcon: 'Banknote',
      status: 'completed',
      items: [
        { name: 'Pasta Carbonara', quantity: 1, price: 16.99 },
        { name: 'Garlic Bread', quantity: 1, price: 6.99 },
        { name: 'Lemonade', quantity: 1, price: 3.00 }
      ],
      discount: 0,
      tax: 2.52
    }
  ];

  const filteredOrders = useMemo(() => {
    return mockOrders?.filter((order) => {
      const matchesSearch =
        filters?.search === '' ||
        order?.id?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        order?.customerName?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        order?.customerPhone?.includes(filters?.search);

      const matchesPayment =
        filters?.paymentMethod === 'all' || order?.paymentMethod === filters?.paymentMethod;

      const matchesStatus = filters?.status === 'all' || order?.status === filters?.status;

      const matchesDateRange =
        (!filters?.fromDate || new Date(order.timestamp) >= new Date(filters.fromDate)) &&
        (!filters?.toDate || new Date(order.timestamp) <= new Date(filters.toDate));

      return matchesSearch && matchesPayment && matchesStatus && matchesDateRange;
    });
  }, [filters, mockOrders]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredOrders?.slice(startIndex, startIndex + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredOrders?.length / pageSize);

  const summary = useMemo(() => {
    return {
      totalOrders: filteredOrders?.length,
      totalRevenue: filteredOrders?.reduce((sum, order) => sum + order?.total, 0),
      completed: filteredOrders?.filter((o) => o?.status === 'completed')?.length,
      cancelled: filteredOrders?.filter((o) => o?.status === 'cancelled')?.length,
      refunded: filteredOrders?.filter((o) => o?.status === 'refunded')?.length
    };
  }, [filteredOrders]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      fromDate: '',
      toDate: '',
      paymentMethod: 'all',
      status: 'all'
    });
    setCurrentPage(1);
  };

  const handleExport = () => {
    console.log('Exporting data:', filteredOrders);
    alert('Export functionality would download CSV/Excel file with filtered order data');
  };

  const handleReprint = (order) => {
    console.log('Reprinting receipt for order:', order?.id);
    alert(`Receipt for Order ${order?.id} sent to printer`);
  };

  const handleRefund = (order) => {
    setSelectedOrder(order);
    setRefundModalOpen(true);
  };

  const handleDuplicate = (order) => {
    console.log('Duplicating order:', order?.id);
    alert(`Order ${order?.id} duplicated. Redirecting to billing screen...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-[76px] px-4 md:px-6 lg:px-8 pb-8">
        <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                Order History
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                View and manage all restaurant transactions
              </p>
            </div>
            <Button
              variant="default"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Export Report
            </Button>
          </div>

          <OrderSummaryPanel summary={summary} />

          <OrderFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            onExport={handleExport}
          />

          <div className="bg-card rounded-md shadow-elevation-2 overflow-hidden">
            <div className="hidden lg:block overflow-x-auto custom-scrollbar">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders?.length > 0 ? (
                    paginatedOrders?.map((order) => (
                      <OrderTableRow
                        key={order?.id}
                        order={order}
                        onReprint={handleReprint}
                        onRefund={handleRefund}
                        onDuplicate={handleDuplicate}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Icon name="Search" size={48} className="text-muted-foreground" />
                          <p className="text-base text-muted-foreground">
                            No orders found matching your filters
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden p-4 md:p-6">
              {paginatedOrders?.length > 0 ? (
                <OrderTableMobile
                  orders={paginatedOrders}
                  onReprint={handleReprint}
                  onRefund={handleRefund}
                  onDuplicate={handleDuplicate}
                />
              ) : (
                <div className="flex flex-col items-center gap-3 py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground" />
                  <p className="text-base text-muted-foreground text-center">
                    No orders found matching your filters
                  </p>
                </div>
              )}
            </div>

            {paginatedOrders?.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rows per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e?.target?.value));
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      iconName="ChevronsLeft"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      iconName="ChevronLeft"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      iconName="ChevronRight"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      iconName="ChevronsRight"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <RefundModal
        isOpen={refundModalOpen}
        onClose={() => {
          setRefundModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderHistory;