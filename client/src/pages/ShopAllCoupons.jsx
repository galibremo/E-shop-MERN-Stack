import React from "react";
import DashboardHeader from "../components/ShopLayout/DashboardHeader";
import DashboardSideBar from "../components/ShopLayout/DashboardSideBar";
import AllCoupons from "../components/AllCoupons";

export default function ShopAllCoupons() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] lg:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
}
