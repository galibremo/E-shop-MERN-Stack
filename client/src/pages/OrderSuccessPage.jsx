import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Lottie from "lottie-react";
import animationData from "../assets/animations/107043-success.json";

export default function OrderSuccessPage() {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
}

function Success() {
  return (
    <div className="flex items-center justify-center flex-col">
      <Lottie
        animationData={animationData}
        loop={false}
        autoPlay={true}
        className="w-[300px] h-[300px]"
      />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
}
