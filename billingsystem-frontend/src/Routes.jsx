import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InventoryManagement from "pages/inventory-management";
import CounterBillingDashboard from "pages/counter-billing-dashboard";
import Login from "pages/login";
import OrderHistory from "pages/order-history";
import TableManagement from "pages/table-management";
import PaymentProcessing from "pages/payment-processing";



const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/counter-billing-dashboard" element={<CounterBillingDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/table-management" element={<TableManagement />} />
        <Route path="/payment-processing" element={<PaymentProcessing />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
