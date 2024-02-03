import React from "react";
import DashboardHeader from "../components/ShopLayout/DashboardHeader";
import DashboardSideBar from "../components/ShopLayout/DashboardSideBar";

export default function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] lg:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        {/* <DashboardHero /> */}
      </div>
    </div>
  );
}
