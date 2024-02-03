import React from "react";
import DashboardHeader from "../components/ShopLayout/DashboardHeader";
import DashboardSideBar from "../components/ShopLayout/DashboardSideBar";
import AllEvents from "../components/AllEvents";

export default function ShopAllEvents() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] lg:w-[330px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <AllEvents />
        </div>
      </div>
    </div>
  );
}
