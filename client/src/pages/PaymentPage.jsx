import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CheckoutSteps from "../components/CheckoutSteps";
import Payment from "../components/Payment";

export default function PaymentPage() {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
}
