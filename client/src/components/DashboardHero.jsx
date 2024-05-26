import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders } from "../redux/actions/orderAction";
import { getAllProductsShop } from "../redux/actions/productAction";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { loadSeller } from "../redux/actions/userAction";

export default function DashboardHero() {
  const { orders } = useSelector((state) => state.orders);
  const { currentSeller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSeller());
    dispatch(getAllShopOrders(currentSeller._id));
    dispatch(getAllProductsShop(currentSeller._id));
  }, [dispatch]);

  const availableBalance = currentSeller?.availableBalance.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row[params.field] === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-5">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block lg:flex items-center justify-between">
        <div className="w-full mb-4 lg:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3 className="font-Roboto text-[#333] text-[18px] leading-5 font-[400] text-[#00000085]">
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${availableBalance}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 lg:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3 className="font-Roboto text-[#333] text-[18px] leading-5 font-[400] text-[#00000085]">
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 lg:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3 className="font-Roboto text-[#333] text-[18px] leading-5 font-[400] text-[#00000085]">
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full max-h-[45vh] bg-white rounded overflow-y-scroll">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
}
