import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onAddToOrder, searchQuery }) => {
  const filteredProducts = products?.filter(product =>
    product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  if (filteredProducts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">🔍</span>
        </div>
        <p className="text-muted-foreground">No products found</p>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {filteredProducts?.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
          onAddToOrder={onAddToOrder}
        />
      ))}
    </div>
  );
};

export default ProductGrid;