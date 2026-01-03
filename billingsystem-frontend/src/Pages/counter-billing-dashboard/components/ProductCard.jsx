// import React from 'react';
// import Image from '../../../components/AppImage';
// import Icon from '../../../components/AppIcon';

// const ProductCard = ({ product, onAddToOrder }) => {
//   const isLowStock = product?.stock < 10;
//   const isOutOfStock = product?.stock === 0;

//   return (
//     <button
//       onClick={() => !isOutOfStock && onAddToOrder(product)}
//       disabled={isOutOfStock}
//       className={`
//         w-full bg-card rounded-md shadow-elevation-1 overflow-hidden
//         transition-smooth hover-lift press-effect
//         ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-elevation-2'}
//       `}
//     >
//       <div className="relative aspect-[4/3] overflow-hidden bg-muted">
//         <Image
//           src={product?.image}
//           alt={product?.imageAlt}
//           className="w-full h-full object-cover"
//         />
//         {isLowStock && !isOutOfStock && (
//           <div className="absolute top-2 right-2 bg-warning text-warning-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
//             <Icon name="AlertTriangle" size={12} />
//             Low Stock
//           </div>
//         )}
//         {isOutOfStock && (
//           <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
//             <div className="bg-error text-error-foreground px-4 py-2 rounded-md font-medium">
//               Out of Stock
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="p-3 md:p-4">
//         <h3 className="font-medium text-sm md:text-base text-card-foreground line-clamp-1 mb-1">
//           {product?.name}
//         </h3>
//         <div className="flex items-center justify-between">
//           <span className="text-lg md:text-xl font-heading font-bold text-accent data-text">
//             ${product?.price?.toFixed(2)}
//           </span>
//           <span className="text-xs text-muted-foreground caption">
//             Stock: {product?.stock}
//           </span>
//         </div>
//       </div>
//     </button>
//   );
// };

// export default ProductCard;



import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductCard = ({ product, onAddToOrder }) => {
  const stock = Number(product?.stock || 0);
  const price = Number(product?.price || 0);

  const isLowStock = stock > 0 && stock < 10;
  const isOutOfStock = stock === 0;

  return (
    <button
      onClick={() => !isOutOfStock && onAddToOrder(product)}
      disabled={isOutOfStock}
      className={`
        w-full bg-card rounded-md shadow-elevation-1 overflow-hidden
        transition-smooth hover-lift press-effect
        ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-elevation-2'}
      `}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product?.image}
          alt={product?.imageAlt || product?.image_alt || product?.name}
          className="w-full h-full object-cover"
        />

        {isLowStock && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-warning text-warning-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
            <Icon name="AlertTriangle" size={12} />
            Low Stock
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="bg-error text-error-foreground px-4 py-2 rounded-md font-medium">
              Out of Stock
            </div>
          </div>
        )}
      </div>

      <div className="p-3 md:p-4">
        <h3 className="font-medium text-sm md:text-base text-card-foreground line-clamp-1 mb-1">
          {product?.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-lg md:text-xl font-heading font-bold text-accent data-text">
            ₹{price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground caption">
            Stock: {stock}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
