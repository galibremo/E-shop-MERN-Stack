import React from "react";
import AdminHeader from "../components/AdminLayout/AdminHeader";
import AdminSideBar from "../components/AdminLayout/AdminSideBar";
import AdminAllOrders from "../components/AdminAllOrders";

export default function AdminDashboardOrder() {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] lg:w-[330px]">
            <AdminSideBar active={2} />
          </div>
          <AdminAllOrders />
        </div>
      </div>
    </div>
  );
}
