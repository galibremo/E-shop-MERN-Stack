import React from "react";
import AllRefunds from "../components/AllRefunds";
import DashboardHeader from "../components/ShopLayout/DashboardHeader";
import DashboardSideBar from "../components/ShopLayout/DashboardSideBar";

export default function ShopAllRefunds() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] lg:w-[330px]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
          <AllRefunds />
        </div>
      </div>
    </div>
  );
}
