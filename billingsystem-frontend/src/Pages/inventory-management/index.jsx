import React, { useState, useMemo } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import InventoryMetricsCard from './components/InventoryMetricsCard';
import FilterControls from './components/FilterControls';
import BulkActionsBar from './components/BulkActionsBar';
import ProductTableRow from './components/ProductTableRow';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InventoryManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const inventoryData = [
    {
      id: 1,
      name: "Coca Cola 330ml",
      sku: "BEV-CC-330",
      category: "Beverages",
      currentStock: 145,
      reorderPoint: 50,
      unit: "units",
      supplier: "Beverage Distributors Inc.",
      lastUpdated: "2025-12-27T10:30:00",
      unitCost: 0.85,
      suggestedReorder: 200,
      storageLocation: "Beverage Cooler A",
      recentMovements: [
        { type: "out", quantity: 24, reason: "Table 5 order", date: "2025-12-28T09:15:00" },
        { type: "in", quantity: 100, reason: "Weekly delivery", date: "2025-12-26T14:00:00" },
        { type: "out", quantity: 36, reason: "Multiple orders", date: "2025-12-25T18:30:00" }
      ],
      consumptionPattern: { daily: 25, weekly: 175, monthly: 700 }
    },
    {
      id: 2,
      name: "Chicken Breast",
      sku: "ING-CB-001",
      category: "Raw Ingredients",
      currentStock: 12,
      reorderPoint: 15,
      unit: "kg",
      supplier: "Quality Meats Supply",
      lastUpdated: "2025-12-28T08:00:00",
      unitCost: 8.50,
      suggestedReorder: 30,
      storageLocation: "Walk-in Freezer B",
      recentMovements: [
        { type: "out", quantity: 5, reason: "Grilled chicken prep", date: "2025-12-28T11:00:00" },
        { type: "in", quantity: 20, reason: "Fresh delivery", date: "2025-12-27T07:00:00" },
        { type: "out", quantity: 8, reason: "Chicken tikka prep", date: "2025-12-26T16:00:00" }
      ],
      consumptionPattern: { daily: 6, weekly: 42, monthly: 180 }
    },
    {
      id: 3,
      name: "Mozzarella Cheese",
      sku: "ING-MC-500",
      category: "Raw Ingredients",
      currentStock: 0,
      reorderPoint: 10,
      unit: "kg",
      supplier: "Dairy Farm Products",
      lastUpdated: "2025-12-27T20:00:00",
      unitCost: 12.00,
      suggestedReorder: 25,
      storageLocation: "Dairy Refrigerator",
      recentMovements: [
        { type: "out", quantity: 3, reason: "Pizza preparation", date: "2025-12-27T19:30:00" },
        { type: "out", quantity: 2, reason: "Pasta dishes", date: "2025-12-27T15:00:00" },
        { type: "in", quantity: 15, reason: "Weekly stock", date: "2025-12-24T09:00:00" }
      ],
      consumptionPattern: { daily: 4, weekly: 28, monthly: 120 }
    },
    {
      id: 4,
      name: "French Fries",
      sku: "APP-FF-001",
      category: "Appetizers",
      currentStock: 85,
      reorderPoint: 40,
      unit: "kg",
      supplier: "Fresh Foods Co.",
      lastUpdated: "2025-12-28T12:00:00",
      unitCost: 3.50,
      suggestedReorder: 100,
      storageLocation: "Walk-in Freezer A",
      recentMovements: [
        { type: "out", quantity: 8, reason: "Lunch rush orders", date: "2025-12-28T13:00:00" },
        { type: "in", quantity: 50, reason: "Bi-weekly delivery", date: "2025-12-26T10:00:00" },
        { type: "out", quantity: 12, reason: "Dinner service", date: "2025-12-25T20:00:00" }
      ],
      consumptionPattern: { daily: 15, weekly: 105, monthly: 450 }
    },
    {
      id: 5,
      name: "Tomato Sauce",
      sku: "ING-TS-5L",
      category: "Raw Ingredients",
      currentStock: 28,
      reorderPoint: 20,
      unit: "liters",
      supplier: "Fresh Foods Co.",
      lastUpdated: "2025-12-28T09:00:00",
      unitCost: 4.25,
      suggestedReorder: 40,
      storageLocation: "Dry Storage Shelf 3",
      recentMovements: [
        { type: "out", quantity: 3, reason: "Pasta sauce prep", date: "2025-12-28T10:00:00" },
        { type: "in", quantity: 25, reason: "Monthly stock", date: "2025-12-25T11:00:00" },
        { type: "out", quantity: 5, reason: "Pizza base prep", date: "2025-12-24T14:00:00" }
      ],
      consumptionPattern: { daily: 5, weekly: 35, monthly: 150 }
    },
    {
      id: 6,
      name: "Olive Oil",
      sku: "ING-OO-1L",
      category: "Raw Ingredients",
      currentStock: 42,
      reorderPoint: 25,
      unit: "liters",
      supplier: "Spice World Imports",
      lastUpdated: "2025-12-27T16:00:00",
      unitCost: 15.00,
      suggestedReorder: 50,
      storageLocation: "Dry Storage Shelf 2",
      recentMovements: [
        { type: "out", quantity: 2, reason: "Salad dressing", date: "2025-12-27T17:00:00" },
        { type: "in", quantity: 30, reason: "Quarterly order", date: "2025-12-20T09:00:00" },
        { type: "out", quantity: 3, reason: "Cooking prep", date: "2025-12-26T12:00:00" }
      ],
      consumptionPattern: { daily: 3, weekly: 21, monthly: 90 }
    },
    {
      id: 7,
      name: "Chocolate Cake",
      sku: "DES-CC-001",
      category: "Desserts",
      currentStock: 18,
      reorderPoint: 12,
      unit: "units",
      supplier: "Fresh Foods Co.",
      lastUpdated: "2025-12-28T07:00:00",
      unitCost: 6.50,
      suggestedReorder: 30,
      storageLocation: "Dessert Display Cooler",
      recentMovements: [
        { type: "out", quantity: 4, reason: "Evening dessert orders", date: "2025-12-27T21:00:00" },
        { type: "in", quantity: 20, reason: "Daily fresh batch", date: "2025-12-27T06:00:00" },
        { type: "out", quantity: 6, reason: "Lunch desserts", date: "2025-12-26T14:00:00" }
      ],
      consumptionPattern: { daily: 8, weekly: 56, monthly: 240 }
    },
    {
      id: 8,
      name: "Paper Napkins",
      sku: "SUP-PN-500",
      category: "Kitchen Supplies",
      currentStock: 320,
      reorderPoint: 200,
      unit: "packs",
      supplier: "Fresh Foods Co.",
      lastUpdated: "2025-12-26T14:00:00",
      unitCost: 2.50,
      suggestedReorder: 500,
      storageLocation: "Supply Closet A",
      recentMovements: [
        { type: "out", quantity: 25, reason: "Daily service use", date: "2025-12-28T08:00:00" },
        { type: "in", quantity: 300, reason: "Monthly bulk order", date: "2025-12-23T10:00:00" },
        { type: "out", quantity: 30, reason: "Weekend service", date: "2025-12-22T19:00:00" }
      ],
      consumptionPattern: { daily: 20, weekly: 140, monthly: 600 }
    }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = inventoryData?.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product?.category?.toLowerCase()?.replace(' ', '-') === selectedCategory;
      
      const matchesStatus = selectedStatus === 'all' || 
        (selectedStatus === 'in-stock' && product?.currentStock > product?.reorderPoint) ||
        (selectedStatus === 'low-stock' && product?.currentStock > 0 && product?.currentStock <= product?.reorderPoint) ||
        (selectedStatus === 'out-of-stock' && product?.currentStock === 0);
      
      const matchesSupplier = selectedSupplier === 'all' || 
        product?.supplier?.toLowerCase()?.replace(/[^a-z]/g, '-') === selectedSupplier;
      
      const matchesSearch = searchQuery === '' || 
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.sku?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      
      return matchesCategory && matchesStatus && matchesSupplier && matchesSearch;
    });

    filtered?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];
      
      if (sortField === 'name' || sortField === 'category') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [inventoryData, selectedCategory, selectedStatus, selectedSupplier, searchQuery, sortField, sortDirection]);

  const metrics = useMemo(() => {
    const totalValue = inventoryData?.reduce((sum, product) => 
      sum + (product?.currentStock * product?.unitCost), 0
    );
    
    const lowStockItems = inventoryData?.filter(product => 
      product?.currentStock > 0 && product?.currentStock <= product?.reorderPoint
    )?.length;
    
    const outOfStockItems = inventoryData?.filter(product => 
      product?.currentStock === 0
    )?.length;
    
    const reorderNeeded = lowStockItems + outOfStockItems;

    return {
      totalValue,
      reorderNeeded,
      lowStockItems,
      outOfStockItems,
      totalProducts: inventoryData?.length
    };
  }, [inventoryData]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedSupplier('all');
    setSearchQuery('');
  };

  const handleAdjustStock = (productId, adjustment) => {
    console.log(`Adjusting stock for product ${productId} by ${adjustment}`);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  const handleExport = () => {
    console.log('Exporting inventory data to CSV');
  };

  const handleImport = () => {
    console.log('Opening import dialog');
  };

  const handleScanBarcode = () => {
    console.log('Activating barcode scanner');
  };

  const handleConfigureAlerts = () => {
    console.log('Opening alert configuration');
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <Icon name="ChevronsUpDown" size={16} className="text-muted-foreground" />;
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
        size={16} 
        color="var(--color-accent)" 
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-[60px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              Inventory Management
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Monitor stock levels, track product movements, and manage reorder points
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <InventoryMetricsCard
              title="Total Inventory Value"
              value={`$${metrics?.totalValue?.toFixed(2)}`}
              subtitle={`${metrics?.totalProducts} products`}
              icon="DollarSign"
              trend="up"
              trendValue="+8.2%"
            />
            <InventoryMetricsCard
              title="Reorder Required"
              value={metrics?.reorderNeeded}
              subtitle={`${metrics?.lowStockItems} low, ${metrics?.outOfStockItems} out`}
              icon="AlertTriangle"
              trend="down"
              trendValue="-12.5%"
            />
            <InventoryMetricsCard
              title="Low Stock Items"
              value={metrics?.lowStockItems}
              subtitle="Below reorder point"
              icon="TrendingDown"
              trend={null}
              trendValue={null}
            />
            <InventoryMetricsCard
              title="Out of Stock"
              value={metrics?.outOfStockItems}
              subtitle="Immediate action needed"
              icon="XCircle"
              trend={null}
              trendValue={null}
            />
          </div>

          <div className="space-y-4 md:space-y-6">
            <FilterControls
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedSupplier={selectedSupplier}
              onSupplierChange={setSelectedSupplier}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
            />

            <BulkActionsBar
              onExport={handleExport}
              onImport={handleImport}
              onScanBarcode={handleScanBarcode}
              onConfigureAlerts={handleConfigureAlerts}
            />

            <div className="hidden lg:block bg-card rounded-md shadow-elevation-2 border border-border overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                        >
                          Product
                          <SortIcon field="name" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleSort('category')}
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                        >
                          Category
                          <SortIcon field="category" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleSort('currentStock')}
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                        >
                          Stock
                          <SortIcon field="currentStock" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleSort('reorderPoint')}
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                        >
                          Reorder Point
                          <SortIcon field="reorderPoint" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <span className="text-sm font-medium text-muted-foreground">Status</span>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleSort('lastUpdated')}
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                        >
                          Last Updated
                          <SortIcon field="lastUpdated" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <span className="text-sm font-medium text-muted-foreground">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedProducts?.length > 0 ? (
                      filteredAndSortedProducts?.map(product => (
                        <ProductTableRow
                          key={product?.id}
                          product={product}
                          onAdjustStock={handleAdjustStock}
                          onViewDetails={handleViewDetails}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <Icon name="Package" size={48} className="text-muted-foreground" />
                            <p className="text-muted-foreground">No products found matching your filters</p>
                            <Button variant="outline" size="sm" onClick={handleClearFilters}>
                              Clear Filters
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAndSortedProducts?.length > 0 ? (
                filteredAndSortedProducts?.map(product => (
                  <ProductCard
                    key={product?.id}
                    product={product}
                    onAdjustStock={handleAdjustStock}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center gap-4 py-12 bg-card rounded-md border border-border">
                  <Icon name="Package" size={48} className="text-muted-foreground" />
                  <p className="text-muted-foreground">No products found matching your filters</p>
                  <Button variant="outline" size="sm" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default InventoryManagement;