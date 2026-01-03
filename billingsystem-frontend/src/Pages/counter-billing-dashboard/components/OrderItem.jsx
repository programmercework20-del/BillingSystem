// import React from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';

// const OrderItem = ({ item, onUpdateQuantity, onRemove }) => {
//   return (
//     <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
//       <div className="flex-1 min-w-0">
//         <h4 className="font-medium text-sm md:text-base text-foreground line-clamp-1">
//           {item?.name}
//         </h4>
//         <p className="text-xs md:text-sm text-muted-foreground data-text">
//           ${item?.price?.toFixed(2)} each
//         </p>
//       </div>
//       <div className="flex items-center gap-2">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => onUpdateQuantity(item?.id, item?.quantity - 1)}
//           disabled={item?.quantity <= 1}
//         >
//           <Icon name="Minus" size={16} />
//         </Button>
        
//         <span className="w-8 text-center font-medium data-text">
//           {item?.quantity}
//         </span>
        
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => onUpdateQuantity(item?.id, item?.quantity + 1)}
//         >
//           <Icon name="Plus" size={16} />
//         </Button>
//       </div>
//       <div className="flex items-center gap-2">
//         <span className="font-bold text-sm md:text-base data-text whitespace-nowrap">
//           ${(item?.price * item?.quantity)?.toFixed(2)}
//         </span>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => onRemove(item?.id)}
//         >
//           <Icon name="Trash2" size={16} className="text-error" />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default OrderItem;


import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const OrderItem = ({ item, onUpdateQuantity, onRemove }) => {
  const price = Number(item?.price || 0);
  const quantity = Number(item?.quantity || 1);
  const total = price * quantity;

  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-muted/40 rounded-md">
      {/* Left */}
      <div className="flex-1">
        <h4 className="font-medium text-foreground text-sm">
          {item?.name}
        </h4>
        <p className="text-xs text-muted-foreground">
         ₹{price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, quantity - 1)}
          disabled={quantity <= 1}
        >
          <Icon name="Minus" size={14} />
        </Button>

        <span className="min-w-[20px] text-center font-medium">
          {quantity}
        </span>

        <Button
          size="icon"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, quantity + 1)}
        >
          <Icon name="Plus" size={14} />
        </Button>
      </div>

      {/* Price + Remove */}
      <div className="flex items-center gap-3">
        <span className="font-semibold data-text">
          ₹{total.toFixed(2)}
        </span>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => onRemove(item.id)}
        >
          <Icon name="Trash2" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;
