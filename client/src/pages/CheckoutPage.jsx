import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Checkout from "../components/Checkout";
import CheckoutSteps from "../components/CheckoutSteps";

export default function CheckoutPage() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
}
