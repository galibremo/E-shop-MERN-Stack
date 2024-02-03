import React from "react";
import DashboardHeader from "../components/ShopLayout/DashboardHeader";
import DashboardSideBar from "../components/ShopLayout/DashboardSideBar";
import AllProducts from "../components/AllProducts";

export default function ShopAllProducts() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] lg:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <AllProducts />
        </div>
      </div>
    </div>
  );
}
