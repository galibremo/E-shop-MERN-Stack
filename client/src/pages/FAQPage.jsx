import React from "react";
import Header from "../components/Layout/Header";
import Faq from "../components/Faq";
import Footer from "../components/Layout/Footer";
export default function FAQPage() {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq/>
      <Footer/>
    </div>
  );
}
