import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import UserOrderDetails from "../components/UserOrderDetails";

export default function OrderDetailsPage() {
  return (
    <div>
      <Header />
      <UserOrderDetails />
      <Footer />
    </div>
  );
}
