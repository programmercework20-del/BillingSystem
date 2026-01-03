// import React, { useState, useEffect } from 'react';
// import NavigationBar from '../../components/ui/NavigationBar';
// import PaymentModal from '../../components/ui/PaymentModal';
// import CategoryTabs from './components/CategoryTabs';
// import ProductGrid from './components/ProductGrid';
// import OrderSummary from './components/OrderSummary';
// import QuickActions from './components/QuickActions';
// import TableSelector from './components/TableSelector';
// import PaymentControls from './components/PaymentControls';
// import Input from '../../components/ui/Input';
// import Icon from '../../components/AppIcon';

// const CounterBillingDashboard = () => {
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [orderItems, setOrderItems] = useState([]);
//   const [selectedTable, setSelectedTable] = useState('takeaway');
//   const [discount, setDiscount] = useState('');
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

//   const categories = [
//   { id: 'all', name: 'All Items', icon: 'Grid3x3', count: 24 },
//   { id: 'appetizers', name: 'Appetizers', icon: 'Salad', count: 8 },
//   { id: 'mains', name: 'Main Course', icon: 'Utensils', count: 10 },
//   { id: 'beverages', name: 'Beverages', icon: 'Coffee', count: 6 }];


//   const products = [
//   {
//     id: 1,
//     name: 'Classic Burger',
//     price: 12.99,
//     category: 'mains',
//     stock: 25,
//     image: "https://images.unsplash.com/photo-1585508718415-6d83666de492",
//     imageAlt: 'Juicy beef burger with melted cheese, fresh lettuce, tomatoes and sesame seed bun on wooden board'
//   },
//   {
//     id: 2,
//     name: 'Caesar Salad',
//     price: 8.99,
//     category: 'appetizers',
//     stock: 15,
//     image: "https://images.unsplash.com/photo-1598148147984-fe53fb44a15d",
//     imageAlt: 'Fresh Caesar salad with crispy romaine lettuce, parmesan cheese, croutons and creamy dressing in white bowl'
//   },
//   {
//     id: 3,
//     name: 'Iced Coffee',
//     price: 4.50,
//     category: 'beverages',
//     stock: 30,
//     image: "https://images.unsplash.com/photo-1513576008-8e9f04201318",
//     imageAlt: 'Tall glass of iced coffee with cream swirls, ice cubes and straw on marble counter'
//   },
//   {
//     id: 4,
//     name: 'Margherita Pizza',
//     price: 14.99,
//     category: 'mains',
//     stock: 8,
//     image: "https://images.unsplash.com/photo-1677357903776-6a5c18c729e6",
//     imageAlt: 'Traditional Margherita pizza with fresh mozzarella, basil leaves and tomato sauce on wooden pizza board'
//   },
//   {
//     id: 5,
//     name: 'Chicken Wings',
//     price: 10.99,
//     category: 'appetizers',
//     stock: 20,
//     image: "https://images.unsplash.com/photo-1557391095-93c2c23b6d2f",
//     imageAlt: 'Crispy golden chicken wings with BBQ sauce glaze served on white plate with celery sticks'
//   },
//   {
//     id: 6,
//     name: 'Fresh Lemonade',
//     price: 3.50,
//     category: 'beverages',
//     stock: 0,
//     image: "https://images.unsplash.com/photo-1560008436-8a7a17ae4cc1",
//     imageAlt: 'Glass pitcher of fresh lemonade with lemon slices, mint leaves and ice on rustic wooden table'
//   },
//   {
//     id: 7,
//     name: 'Grilled Steak',
//     price: 24.99,
//     category: 'mains',
//     stock: 12,
//     image: "https://images.unsplash.com/photo-1713742000867-404a4a32dd72",
//     imageAlt: 'Perfectly grilled ribeye steak with grill marks, herb butter and roasted vegetables on black plate'
//   },
//   {
//     id: 8,
//     name: 'Mozzarella Sticks',
//     price: 7.99,
//     category: 'appetizers',
//     stock: 18,
//     image: "https://images.unsplash.com/photo-1554561343-a8d5032dbad7",
//     imageAlt: 'Golden fried mozzarella sticks with melted cheese pull and marinara dipping sauce in small bowl'
//   },
//   {
//     id: 9,
//     name: 'Cappuccino',
//     price: 4.99,
//     category: 'beverages',
//     stock: 35,
//     image: "https://images.unsplash.com/photo-1623588724261-9a644de10acc",
//     imageAlt: 'Creamy cappuccino with perfect foam art in white ceramic cup on saucer with coffee beans'
//   },
//   {
//     id: 10,
//     name: 'Fish Tacos',
//     price: 13.99,
//     category: 'mains',
//     stock: 14,
//     image: "https://images.unsplash.com/photo-1696935191484-7677e929b0dc",
//     imageAlt: 'Three soft shell fish tacos with grilled fish, cabbage slaw, lime wedges and cilantro on wooden board'
//   },
//   {
//     id: 11,
//     name: 'Nachos Supreme',
//     price: 9.99,
//     category: 'appetizers',
//     stock: 22,
//     image: "https://images.unsplash.com/photo-1601831132992-548e9366e073",
//     imageAlt: 'Loaded nachos with melted cheese, jalapeños, sour cream, guacamole and salsa on large platter'
//   },
//   {
//     id: 12,
//     name: 'Smoothie Bowl',
//     price: 8.50,
//     category: 'beverages',
//     stock: 16,
//     image: "https://images.unsplash.com/photo-1684403731883-67a71a793d2d",
//     imageAlt: 'Colorful acai smoothie bowl topped with fresh berries, granola, banana slices and coconut flakes'
//   }];


//   const tables = [
//   { id: 'table-1', number: 1, status: 'Available' },
//   { id: 'table-2', number: 2, status: 'Occupied' },
//   { id: 'table-3', number: 3, status: 'Available' },
//   { id: 'table-4', number: 4, status: 'Available' },
//   { id: 'table-5', number: 5, status: 'Reserved' },
//   { id: 'table-6', number: 6, status: 'Available' }];


//   const filteredProducts = activeCategory === 'all' ?
//   products :
//   products?.filter((p) => p?.category === activeCategory);

//   const handleAddToOrder = (product) => {
//     const existingItem = orderItems?.find((item) => item?.id === product?.id);

//     if (existingItem) {
//       setOrderItems(orderItems?.map((item) =>
//       item?.id === product?.id ?
//       { ...item, quantity: item?.quantity + 1 } :
//       item
//       ));
//     } else {
//       setOrderItems([...orderItems, { ...product, quantity: 1 }]);
//     }
//   };

//   const handleUpdateQuantity = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setOrderItems(orderItems?.map((item) =>
//     item?.id === itemId ? { ...item, quantity: newQuantity } : item
//     ));
//   };

//   const handleRemoveItem = (itemId) => {
//     setOrderItems(orderItems?.filter((item) => item?.id !== itemId));
//   };

//   const handleClearOrder = () => {
//     setOrderItems([]);
//     setDiscount('');
//   };

//   const handleAddQuickItem = (quickItem) => {
//     const product = products?.find((p) => p?.id === quickItem?.id) || {
//       id: quickItem?.id,
//       name: quickItem?.name,
//       price: quickItem?.price,
//       stock: 100
//     };
//     handleAddToOrder(product);
//   };

// const printKOT = () => {
//   if (!orderItems.length) {
//     alert('No items to print');
//     return;
//   }

//   const kotWindow = window.open('', 'KOT', 'width=300,height=600');

//   kotWindow.document.write(`
//     <html>
//       <head>
//         <title>KOT</title>
//         <style>
//           body {
//             font-family: monospace;
//             width: 80mm;
//             margin: 0;
//             padding: 6px;
//           }
//           h2 { text-align: center; margin: 5px 0; }
//           hr { border: 1px dashed #000; }
//           table { width: 100%; font-size: 12px; }
//           td { padding: 3px 0; }
//         </style>
//       </head>
//       <body>
//         <h2>KITCHEN ORDER TICKET</h2>
//         <hr/>
//         <p><b>Table:</b> ${selectedTable}</p>
//         <p><b>Time:</b> ${new Date().toLocaleString()}</p>
//         <hr/>
//         <table>
//           ${orderItems.map(item => `
//             <tr>
//               <td>${item.name}</td>
//               <td align="right">x${item.quantity}</td>
//             </tr>
//           `).join('')}
//         </table>
//         <hr/>
//         <p style="text-align:center">--- END ---</p>
//       </body>
//     </html>
//   `);

//   kotWindow.document.close();
//   kotWindow.focus();
//   kotWindow.print();   // ✅ YAHI E-PRINT / PDF TRIGGER HOTA HAI
//   kotWindow.close();
// };


//  const printReceipt = () => {
//   if (!orderItems.length) {
//     alert('No items to print');
//     return;
//   }

//   const receiptWindow = window.open('', 'RECEIPT', 'width=300,height=700');

//   receiptWindow.document.write(`
//     <html>
//       <head>
//         <title>Receipt</title>
//         <style>
//           body {
//             font-family: monospace;
//             width: 80mm;
//             margin: 0;
//             padding: 6px;
//           }
//           h2, h3 {
//             text-align: center;
//             margin: 5px 0;
//           }
//           hr {
//             border: 1px dashed #000;
//           }
//           table {
//             width: 100%;
//             font-size: 12px;
//             border-collapse: collapse;
//           }
//           td {
//             padding: 3px 0;
//           }
//           .right { text-align: right; }
//           .center { text-align: center; }
//         </style>
//       </head>

//       <body>
//         <h2>RestaurantPOS Pro</h2>
//         <h3>Customer Receipt</h3>
//         <hr/>

//         <p><b>Table:</b> ${selectedTable}</p>
//         <p><b>Date:</b> ${new Date().toLocaleString()}</p>

//         <hr/>

//         <table>
//           ${orderItems.map(item => `
//             <tr>
//               <td>${item.name} x${item.quantity}</td>
//               <td class="right">$${(item.price * item.quantity).toFixed(2)}</td>
//             </tr>
//           `).join('')}
//         </table>

//         <hr/>

//         <table>
//           <tr>
//             <td>Subtotal</td>
//             <td class="right">$${subtotal.toFixed(2)}</td>
//           </tr>
//           <tr>
//             <td>Tax (8%)</td>
//             <td class="right">$${tax.toFixed(2)}</td>
//           </tr>
//           <tr>
//             <td>Discount</td>
//             <td class="right">-$${discountAmount.toFixed(2)}</td>
//           </tr>
//         </table>

//         <hr/>

//         <table>
//           <tr>
//             <td><b>Total</b></td>
//             <td class="right"><b>$${total.toFixed(2)}</b></td>
//           </tr>
//         </table>

//         <hr/>
//         <p class="center">Thank You 🙏</p>
//         <p class="center">Visit Again</p>
//       </body>
//     </html>
//   `);

//   receiptWindow.document.close();
//   receiptWindow.focus();
//   receiptWindow.print();   // ✅ REAL E-PRINT
//   receiptWindow.close();
// };


//   const handleProcessPayment = () => {
//     setIsPaymentModalOpen(true);
//   };

//   const subtotal = orderItems?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
//   const tax = subtotal * 0.08;
//   const discountAmount = parseFloat(discount) || 0;
//   const total = subtotal + tax - discountAmount;

//   useEffect(() => {
//     document.title = 'Counter Billing Dashboard - RestaurantPOS Pro';
//   }, []);

//   return (
//     <div className="min-h-screen bg-background">
//       <NavigationBar />
//       <main className="pt-[60px] min-h-screen">
//         <div className="h-[calc(100vh-60px)] flex flex-col lg:flex-row">
//           <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
//             <div className="p-4 md:p-6 border-b border-border space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="flex-1">
//                   <Input
//                     type="search"
//                     placeholder="Search products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e?.target?.value)} />

//                 </div>
//                 <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center">
//                   <Icon name="Search" size={20} className="text-accent" />
//                 </div>
//               </div>
//               <CategoryTabs
//                 categories={categories}
//                 activeCategory={activeCategory}
//                 onCategoryChange={setActiveCategory} />

//             </div>

//             <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6">
//               <ProductGrid
//                 products={filteredProducts}
//                 onAddToOrder={handleAddToOrder}
//                 searchQuery={searchQuery} />

//             </div>
//           </div>

//           <div className="w-full lg:w-[400px] xl:w-[480px] flex flex-col border-r border-border bg-card">
//             <OrderSummary
//               orderItems={orderItems}
//               onUpdateQuantity={handleUpdateQuantity}
//               onRemoveItem={handleRemoveItem}
//               onClearOrder={handleClearOrder}
//               subtotal={subtotal}
//               tax={tax}
//               discount={discountAmount}
//               total={total} />

//           </div>

//           <div className="w-full lg:w-[360px] xl:w-[400px] bg-card p-4 md:p-6 overflow-y-auto custom-scrollbar space-y-6">
//             <div>
//               <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
//                 Quick Add
//               </h3>
//               <QuickActions onAddQuickItem={handleAddQuickItem} />
//             </div>

//             <div>
//               <TableSelector
//                 selectedTable={selectedTable}
//                 onTableChange={setSelectedTable}
//                 tables={tables} 
//                 orderItems={orderItems}   // 👈 YE ADD KARNA HAI
//                 />

//             </div>

//             <div>
//               <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
//                 Payment
//               </h3>
//               <PaymentControls
//                 discount={discount}
//                 onDiscountChange={setDiscount}
//                 onProcessPayment={handleProcessPayment}
//                 onPrintKOT={printKOT}          // ✅ REAL PRINT
//                  onPrintReceipt={printReceipt}   // ✅ REAL RECEIPT PRINT
//                 hasItems={orderItems?.length > 0} />

//             </div>
//           </div>
//         </div>
//       </main>
//       <PaymentModal
//         isOpen={isPaymentModalOpen}
//         onClose={() => setIsPaymentModalOpen(false)}
//         orderData={{
//           items: orderItems,
//           total: total
//         }} />

//     </div>);

// };

// export default CounterBillingDashboard;






// import React, { useState, useEffect } from 'react';
// import NavigationBar from '../../components/ui/NavigationBar';
// import PaymentModal from '../../components/ui/PaymentModal';
// import CategoryTabs from './components/CategoryTabs';
// import ProductGrid from './components/ProductGrid';
// import OrderSummary from './components/OrderSummary';
// import QuickActions from './components/QuickActions';
// import TableSelector from './components/TableSelector';
// import PaymentControls from './components/PaymentControls';
// import Input from '../../components/ui/Input';
// import Icon from '../../components/AppIcon';

// const CounterBillingDashboard = () => {
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [orderItems, setOrderItems] = useState([]);
//   const [selectedTable, setSelectedTable] = useState('takeaway');
//   const [discount, setDiscount] = useState('');
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

// // dynamaic categories
// const [categories, setCategories] = useState([]);
// const [products, setProducts] = useState([]);
// const [loadingProducts, setLoadingProducts] = useState(false);

// const categoryIconMap = {
//   all: 'Grid3x3',
//   appetizers: 'Salad',
//   mains: 'Utensils',
//   beverages: 'Coffee',
// };

// useEffect(() => {
//   fetch('http://localhost/BillingSystem/public/api/categories')
//     .then(res => res.json())
//     .then(json => {
//       if (json.success) {
//         const mappedCategories = json.data.map(cat => ({
//           ...cat,
//           icon: categoryIconMap[cat.slug] || 'Grid3x3',
//           count: products.filter(p =>
//             cat.slug === 'all' ? true : p.category === cat.slug
//           ).length
//         }));
//         setCategories(mappedCategories);
//       }
//     });
// }, []);

// // fetch products

// useEffect(() => {
//   setLoadingProducts(true);

//   let url = 'http://localhost/BillingSystem/public/api/products';

//   if (activeCategory !== 'all') {
//     url += `?category=${activeCategory}`;
//   }

//   fetch(url)
//     .then(res => res.json())
//     .then(json => {
//       if (json.success) {
//         // backend: category_slug → frontend: category
//         const mappedProducts = json.data.map(p => ({
//           ...p,
//           category: p.category_slug,
//           imageAlt: p.image_alt
//         }));
//         setProducts(mappedProducts);
//       }
//     })
//     .finally(() => setLoadingProducts(false));
// }, [activeCategory]);


//   const tables = [
//   { id: 'table-1', number: 1, status: 'Available' },
//   { id: 'table-2', number: 2, status: 'Occupied' },
//   { id: 'table-3', number: 3, status: 'Available' },
//   { id: 'table-4', number: 4, status: 'Available' },
//   { id: 'table-5', number: 5, status: 'Reserved' },
//   { id: 'table-6', number: 6, status: 'Available' }];


//   const filteredProducts = activeCategory === 'all' ?
//   products :
//   products?.filter((p) => p?.category === activeCategory);

//   const handleAddToOrder = (product) => {
//     const existingItem = orderItems?.find((item) => item?.id === product?.id);

//     if (existingItem) {
//       setOrderItems(orderItems?.map((item) =>
//       item?.id === product?.id ?
//       { ...item, quantity: item?.quantity + 1 } :
//       item
//       ));
//     } else {
//       setOrderItems([...orderItems, { ...product, quantity: 1 }]);
//     }
//   };

//   const handleUpdateQuantity = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setOrderItems(orderItems?.map((item) =>
//     item?.id === itemId ? { ...item, quantity: newQuantity } : item
//     ));
//   };

//   const handleRemoveItem = (itemId) => {
//     setOrderItems(orderItems?.filter((item) => item?.id !== itemId));
//   };

//   const handleClearOrder = () => {
//     setOrderItems([]);
//     setDiscount('');
//   };

//   const handleAddQuickItem = (quickItem) => {
//     const product = products?.find((p) => p?.id === quickItem?.id) || {
//       id: quickItem?.id,
//       name: quickItem?.name,
//       price: quickItem?.price,
//       stock: 100
//     };
//     handleAddToOrder(product);
//   };

// const printKOT = () => {
//   if (!orderItems.length) {
//     alert('No items to print');
//     return;
//   }

//   const kotWindow = window.open('', 'KOT', 'width=300,height=600');

//   kotWindow.document.write(`
//     <html>
//       <head>
//         <title>KOT</title>
//         <style>
//           body {
//             font-family: monospace;
//             width: 80mm;
//             margin: 0;
//             padding: 6px;
//           }
//           h2 { text-align: center; margin: 5px 0; }
//           hr { border: 1px dashed #000; }
//           table { width: 100%; font-size: 12px; }
//           td { padding: 3px 0; }
//         </style>
//       </head>
//       <body>
//         <h2>KITCHEN ORDER TICKET</h2>
//         <hr/>
//         <p><b>Table:</b> ${selectedTable}</p>
//         <p><b>Time:</b> ${new Date().toLocaleString()}</p>
//         <hr/>
//         <table>
//           ${orderItems.map(item => `
//             <tr>
//               <td>${item.name}</td>
//               <td align="right">x${item.quantity}</td>
//             </tr>
//           `).join('')}
//         </table>
//         <hr/>
//         <p style="text-align:center">--- END ---</p>
//       </body>
//     </html>
//   `);

//   kotWindow.document.close();
//   kotWindow.focus();
//   kotWindow.print();   // ✅ YAHI E-PRINT / PDF TRIGGER HOTA HAI
//   kotWindow.close();
// };


//  const printReceipt = () => {
//   if (!orderItems.length) {
//     alert('No items to print');
//     return;
//   }

//   const receiptWindow = window.open('', 'RECEIPT', 'width=300,height=700');

//   receiptWindow.document.write(`
//     <html>
//       <head>
//         <title>Receipt</title>
//         <style>
//           body {
//             font-family: monospace;
//             width: 80mm;
//             margin: 0;
//             padding: 6px;
//           }
//           h2, h3 {
//             text-align: center;
//             margin: 5px 0;
//           }
//           hr {
//             border: 1px dashed #000;
//           }
//           table {
//             width: 100%;
//             font-size: 12px;
//             border-collapse: collapse;
//           }
//           td {
//             padding: 3px 0;
//           }
//           .right { text-align: right; }
//           .center { text-align: center; }
//         </style>
//       </head>

//       <body>
//         <h2>RestaurantPOS Pro</h2>
//         <h3>Customer Receipt</h3>
//         <hr/>

//         <p><b>Table:</b> ${selectedTable}</p>
//         <p><b>Date:</b> ${new Date().toLocaleString()}</p>

//         <hr/>

//         <table>
//           ${orderItems.map(item => `
//             <tr>
//               <td>${item.name} x${item.quantity}</td>
//               <td class="right">$${(item.price * item.quantity).toFixed(2)}</td>
//             </tr>
//           `).join('')}
//         </table>

//         <hr/>

//         <table>
//           <tr>
//             <td>Subtotal</td>
//             <td class="right">$${subtotal.toFixed(2)}</td>
//           </tr>
//           <tr>
//             <td>Tax (8%)</td>
//             <td class="right">$${tax.toFixed(2)}</td>
//           </tr>
//           <tr>
//             <td>Discount</td>
//             <td class="right">-$${discountAmount.toFixed(2)}</td>
//           </tr>
//         </table>

//         <hr/>

//         <table>
//           <tr>
//             <td><b>Total</b></td>
//             <td class="right"><b>$${total.toFixed(2)}</b></td>
//           </tr>
//         </table>

//         <hr/>
//         <p class="center">Thank You 🙏</p>
//         <p class="center">Visit Again</p>
//       </body>
//     </html>
//   `);

//   receiptWindow.document.close();
//   receiptWindow.focus();
//   receiptWindow.print();   // ✅ REAL E-PRINT
//   receiptWindow.close();
// };


//   const handleProcessPayment = () => {
//     setIsPaymentModalOpen(true);
//   };

//   const subtotal = orderItems?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
//   const tax = subtotal * 0.08;
//   const discountAmount = parseFloat(discount) || 0;
//   const total = subtotal + tax - discountAmount;

//   useEffect(() => {
//     document.title = 'Counter Billing Dashboard - RestaurantPOS Pro';
//   }, []);

//   return (
//     <div className="min-h-screen bg-background">
//       <NavigationBar />
//       <main className="pt-[60px] min-h-screen">
//         <div className="h-[calc(100vh-60px)] flex flex-col lg:flex-row">
//           <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
//             <div className="p-4 md:p-6 border-b border-border space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="flex-1">
//                   <Input
//                     type="search"
//                     placeholder="Search products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e?.target?.value)} />

//                 </div>
//                 <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center">
//                   <Icon name="Search" size={20} className="text-accent" />
//                 </div>
//               </div>
//               <CategoryTabs
//                 categories={categories}
//                 activeCategory={activeCategory}
//                 onCategoryChange={setActiveCategory} />

//             </div>

//             <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6">
//               <ProductGrid
//                 products={products}
//   onAddToOrder={handleAddToOrder}
//   searchQuery={searchQuery}
//   loading={loadingProducts} 
//   />

//             </div>
//           </div>

//           <div className="w-full lg:w-[400px] xl:w-[480px] flex flex-col border-r border-border bg-card">
//             <OrderSummary
//               orderItems={orderItems}
//               onUpdateQuantity={handleUpdateQuantity}
//               onRemoveItem={handleRemoveItem}
//               onClearOrder={handleClearOrder}
//               subtotal={subtotal}
//               tax={tax}
//               discount={discountAmount}
//               total={total} />

//           </div>

//           <div className="w-full lg:w-[360px] xl:w-[400px] bg-card p-4 md:p-6 overflow-y-auto custom-scrollbar space-y-6">
//             <div>
//               <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
//                 Quick Add
//               </h3>
//               <QuickActions onAddQuickItem={handleAddQuickItem} />
//             </div>

//             <div>
//               <TableSelector
//                 selectedTable={selectedTable}
//                 onTableChange={setSelectedTable}
//                 tables={tables} 
//                 orderItems={orderItems}   // 👈 YE ADD KARNA HAI
//                 />

//             </div>

//             <div>
//               <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
//                 Payment
//               </h3>
//               <PaymentControls
//                 discount={discount}
//                 onDiscountChange={setDiscount}
//                 onProcessPayment={handleProcessPayment}
//                 onPrintKOT={printKOT}          // ✅ REAL PRINT
//                  onPrintReceipt={printReceipt}   // ✅ REAL RECEIPT PRINT
//                 hasItems={orderItems?.length > 0} />

//             </div>
//           </div>
//         </div>
//       </main>
//       <PaymentModal
//         isOpen={isPaymentModalOpen}
//         onClose={() => setIsPaymentModalOpen(false)}
//         orderData={{
//           items: orderItems,
//           total: total
//         }} />

//     </div>);

// };

// export default CounterBillingDashboard;



import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import PaymentModal from '../../components/ui/PaymentModal';
import CategoryTabs from './components/CategoryTabs';
import ProductGrid from './components/ProductGrid';
import OrderSummary from './components/OrderSummary';
import QuickActions from './components/QuickActions';
import TableSelector from './components/TableSelector';
import PaymentControls from './components/PaymentControls';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const CounterBillingDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [selectedTable, setSelectedTable] = useState('takeaway');
  const [discount, setDiscount] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
const [tables, setTables] = useState([]);
  const categoryIconMap = {
    all: 'Grid3x3',
    appetizers: 'Salad',
    mains: 'Utensils',
    beverages: 'Coffee',
  };

  /* ---------------- CATEGORIES ---------------- */
  useEffect(() => {
    fetch('http://localhost/BillingSystem/public/api/categories')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setCategories(
            json.data.map(cat => ({
              ...cat,
              icon: categoryIconMap[cat.slug] || 'Grid3x3',
            }))
          );
        }
      });
  }, []);

  /* ---------------- PRODUCTS ---------------- */
  useEffect(() => {
    setLoadingProducts(true);

    let url = 'http://localhost/BillingSystem/public/api/products';
    if (activeCategory !== 'all') {
      url += `?category=${activeCategory}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setProducts(
            json.data.map(p => ({
              ...p,
              category: p.category_slug,
              imageAlt: p.image_alt,
            }))
          );
        }
      })
      .finally(() => setLoadingProducts(false));
  }, [activeCategory]);

 /* ---------------- TABLES ---------------- */

useEffect(() => {
  fetch('http://localhost/BillingSystem/public/api/tables')
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        setTables(
          json.data.map(t => ({
            id: t.id,
            number: t.table_number,
            status: t.status
          }))
        );
      }
    });
}, []);



  /* ---------------- ORDER LOGIC ---------------- */
  const handleAddToOrder = (product) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, qty) => {
    if (qty < 1) return;
    setOrderItems(items =>
      items.map(i => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const handleRemoveItem = (id) => {
    setOrderItems(items => items.filter(i => i.id !== id));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
    setDiscount('');
  };

  /* ---------------- TOTALS ---------------- */
  const subtotal = orderItems.reduce(
    (sum, i) => sum + Number(i.price) * i.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const discountAmount = Number(discount) || 0;
  const total = subtotal + tax - discountAmount;

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="pt-[60px] h-[calc(100vh-60px)] flex">
        {/* LEFT */}
        <div className="flex-1 flex flex-col border-r border-border">
          <div className="p-4 border-b border-border space-y-4">
            <div className="flex gap-3">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center">
                <Icon name="Search" size={20} className="text-accent" />
              </div>
            </div>

            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <ProductGrid
              products={products}
              onAddToOrder={handleAddToOrder}
              searchQuery={searchQuery}
              loading={loadingProducts}
            />
          </div>
        </div>

        {/* CENTER */}
        <div className="w-[420px] border-r border-border bg-card">
          <OrderSummary
            orderItems={orderItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearOrder={handleClearOrder}
            subtotal={subtotal}
            tax={tax}
            discount={discountAmount}
            total={total}
          />
        </div>

        {/* RIGHT */}
        <div className="w-[380px] bg-card p-4 space-y-6">
          <QuickActions onAddQuickItem={handleAddToOrder} />

        <TableSelector
  selectedTable={selectedTable}
  onTableChange={setSelectedTable}
  tables={tables}
  orderItems={orderItems}
/>


          <PaymentControls
            discount={discount}
            onDiscountChange={setDiscount}
            onProcessPayment={() => setIsPaymentModalOpen(true)}
            hasItems={orderItems.length > 0}
          />
        </div>
      </main>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderData={{ items: orderItems, total }}
      />
    </div>
  );
};

export default CounterBillingDashboard;
