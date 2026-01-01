import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import TableCard from './components/TableCard';
import ReservationPanel from './components/ReservationPanel';
import FilterControls from './components/FilterControls';
import TableStatsBar from './components/TableStatsBar';
import OrderDetailsModal from './components/OrderDetailsModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TableManagement = () => {
  const [tables, setTables] = useState([
    {
      id: 1,
      number: 1,
      capacity: 2,
      status: 'available',
      section: 'main',
      orderTotal: 0,
      elapsedTime: '0:00',
      server: ''
    },
    {
      id: 2,
      number: 2,
      capacity: 4,
      status: 'occupied',
      section: 'main',
      orderTotal: 89.47,
      elapsedTime: '45:23',
      server: 'Sarah Johnson'
    },
    {
      id: 3,
      number: 3,
      capacity: 4,
      status: 'reserved',
      section: 'main',
      reservationName: 'Michael Anderson',
      reservationTime: '7:30 PM',
    //   capacity: 4
    },
    {
      id: 4,
      number: 4,
      capacity: 6,
      status: 'occupied',
      section: 'patio',
      orderTotal: 156.89,
      elapsedTime: '1:12:45',
      server: 'David Martinez'
    },
    {
      id: 5,
      number: 5,
      capacity: 2,
      status: 'cleaning',
      section: 'main',
      orderTotal: 0,
      elapsedTime: '0:00',
      server: ''
    },
    {
      id: 6,
      number: 6,
      capacity: 4,
      status: 'available',
      section: 'patio',
      orderTotal: 0,
      elapsedTime: '0:00',
      server: ''
    },
    {
      id: 7,
      number: 7,
      capacity: 8,
      status: 'reserved',
      section: 'private',
      reservationName: 'Emily Thompson',
      reservationTime: '8:00 PM',
    //   capacity: 8
    },
    {
      id: 8,
      number: 8,
      capacity: 2,
      status: 'occupied',
      section: 'bar',
      orderTotal: 42.50,
      elapsedTime: '28:15',
      server: 'Jessica Lee'
    },
    {
      id: 9,
      number: 9,
      capacity: 4,
      status: 'available',
      section: 'main',
      orderTotal: 0,
      elapsedTime: '0:00',
      server: ''
    },
    {
      id: 10,
      number: 10,
      capacity: 6,
      status: 'occupied',
      section: 'patio',
      orderTotal: 203.75,
      elapsedTime: '1:45:30',
      server: 'Robert Chen'
    },
    {
      id: 11,
      number: 11,
      capacity: 2,
      status: 'available',
      section: 'bar',
      orderTotal: 0,
      elapsedTime: '0:00',
      server: ''
    },
    {
      id: 12,
      number: 12,
      capacity: 4,
      status: 'cleaning',
      section: 'main',
      orderTotal: 0,
      elapsedTime: '0:00',
      server: ''
    }
  ]);

  const [filters, setFilters] = useState({
    section: 'all',
    status: 'all',
    capacity: 'all'
  });

  const [showReservationPanel, setShowReservationPanel] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (tableId, newStatus) => {
    setTables(prevTables =>
      prevTables?.map(table =>
        table?.id === tableId
          ? {
              ...table,
              status: newStatus,
              ...(newStatus === 'occupied' && {
                server: 'Sarah Johnson',
                elapsedTime: '0:00',
                orderTotal: 0
              }),
              ...(newStatus === 'available' && {
                server: '',
                elapsedTime: '0:00',
                orderTotal: 0,
                reservationName: '',
                reservationTime: ''
              })
            }
          : table
      )
    );
  };

  const handleViewOrder = (table) => {
    setSelectedTable(table);
    setShowOrderModal(true);
  };

  const handlePrintBill = (table) => {
    console.log('Printing bill for table:', table?.number);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      section: 'all',
      status: 'all',
      capacity: 'all'
    });
  };

  const handleCreateReservation = (reservationData) => {
    const tableId = parseInt(reservationData?.tableNumber);
    setTables(prevTables =>
      prevTables?.map(table =>
        table?.number === tableId
          ? {
              ...table,
              status: 'reserved',
              reservationName: reservationData?.customerName,
              reservationTime: reservationData?.time
            }
          : table
      )
    );
    setShowReservationPanel(false);
  };

  const filteredTables = tables?.filter(table => {
    if (filters?.section !== 'all' && table?.section !== filters?.section) return false;
    if (filters?.status !== 'all' && table?.status !== filters?.status) return false;
    if (filters?.capacity !== 'all') {
      const capacityFilter = parseInt(filters?.capacity);
      if (capacityFilter === 8) {
        if (table?.capacity < 8) return false;
      } else {
        if (table?.capacity !== capacityFilter) return false;
      }
    }
    return true;
  });

  const stats = {
    available: tables?.filter(t => t?.status === 'available')?.length,
    occupied: tables?.filter(t => t?.status === 'occupied')?.length,
    reserved: tables?.filter(t => t?.status === 'reserved')?.length,
    cleaning: tables?.filter(t => t?.status === 'cleaning')?.length
  };

  const availableTables = tables?.filter(t => t?.status === 'available');

  return (
    <>
      <Helmet>
        <title>Table Management - RestaurantPOS Pro</title>
        <meta name="description" content="Monitor dining area status and manage table assignments for dine-in orders with real-time updates and visual floor plan" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationBar />

        <main className="pt-[76px] pb-8 px-4 md:px-6 lg:px-8">
          <div className="max-w-[1600px] mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                  Table Management
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Monitor and manage dining area tables in real-time
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-md shadow-elevation-1">
                  <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground caption">
                    Updated {lastUpdate?.toLocaleTimeString()}
                  </span>
                </div>
                <Button
                  variant="default"
                  iconName="CalendarPlus"
                  iconPosition="left"
                  onClick={() => setShowReservationPanel(!showReservationPanel)}
                >
                  New Reservation
                </Button>
              </div>
            </div>

            <TableStatsBar stats={stats} />

            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-card rounded-md shadow-elevation-2 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Icon name="LayoutGrid" size={24} className="text-accent" />
                      <h2 className="text-xl md:text-2xl font-heading font-semibold text-card-foreground">
                        Floor Plan
                      </h2>
                    </div>
                    <span className="text-sm text-muted-foreground caption">
                      {filteredTables?.length} of {tables?.length} tables
                    </span>
                  </div>

                  {filteredTables?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTables?.map((table) => (
                        <TableCard
                          key={table?.id}
                          table={table}
                          onStatusChange={handleStatusChange}
                          onViewOrder={handleViewOrder}
                          onPrintBill={handlePrintBill}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                        <Icon name="Search" size={32} className="text-muted-foreground" />
                      </div>
                      <p className="text-lg text-muted-foreground mb-2">No tables found</p>
                      <p className="text-sm text-muted-foreground caption">
                        Try adjusting your filters
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {showReservationPanel && (
                <div className="lg:col-span-1">
                  <ReservationPanel
                    onCreateReservation={handleCreateReservation}
                    availableTables={availableTables}
                  />
                </div>
              )}
            </div>
          </div>
        </main>

        <OrderDetailsModal
          isOpen={showOrderModal}
          onClose={() => setShowOrderModal(false)}
          table={selectedTable}
        />
      </div>
    </>
  );
};

export default TableManagement;