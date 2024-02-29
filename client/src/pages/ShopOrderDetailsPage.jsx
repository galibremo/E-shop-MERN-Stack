import React from "react";
import DashboardHeader from "../components/ShopLayout/DashboardHeader";
import Footer from "../components/Layout/Footer";
import OrderDetails from "../components/OrderDetails";

export default function ShopOrderDetailsPage() {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
}
