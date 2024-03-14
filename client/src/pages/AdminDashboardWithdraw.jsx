import React from "react";
import AdminAllUsers from "../components/AdminAllUsers";
import AdminHeader from "../components/AdminLayout/AdminHeader";
import AdminSideBar from "../components/AdminLayout/AdminSideBar";
import AdminAllWithdraw from "../components/AdminAllWithdraw";

export default function AdminDashboardWithdraw() {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] lg:w-[330px]">
            <AdminSideBar active={7} />
          </div>
          <AdminAllWithdraw />
        </div>
      </div>
    </div>
  );
}
