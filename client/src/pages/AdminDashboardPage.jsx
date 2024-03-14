import React from "react";
import AdminHeader from "../components/AdminLayout/AdminHeader";
import AdminSideBar from "../components/AdminLayout/AdminSideBar";
import AdminDashboardMain from "../components/AdminDashboardMain";

export default function AdminDashboardPage() {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] lg:w-[330px]">
            <AdminSideBar active={1} />
          </div>
          <AdminDashboardMain />
        </div>
      </div>
    </div>
  );
}
