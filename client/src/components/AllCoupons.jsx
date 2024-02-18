import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { getAllProductsShop } from "../redux/actions/productAction";
import axios from "axios";
import { toast } from "react-toastify";

export default function AllCoupons() {
  const { currentSeller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(currentSeller._id));
    setIsLoading(true);
    axios
      .get(`/api/coupon/get-all-coupon-shop/${currentSeller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.coupons);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    value: 0,
    minAmount: 0,
    maxAmount: 0,
    shopId: currentSeller._id,
    selectProduct: "",
  });

  function handleChange(event) {
    const { id, value } = event.target;

    if (event.target.tagName === "SELECT") {
      setFormData({
        ...formData,
        selectProduct: value, // Update category for the select element
      });
    } else {
      setFormData({
        ...formData,
        [id]: value, // Update other inputs using their IDs
      });
    }
  }

  function handleDelete(id) {
    axios
      .delete(`/api/coupon/delete-shop-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Coupon code deleted succesfully!");
      })
      .catch((error) => {
        toast.error("Failed to delete!");
      });
    window.location.reload();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post("/api/coupon/create-coupon-code", formData, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setIsLoading(false);
        setOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        setOpen(false);
        toast.error(error.response.data.message.message);
      });
  }

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupouns &&
    coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <div className="w-full flex justify-end">
        <div
          className=" bg-black my-3 flex items-center justify-center cursor-pointer w-max h-[45px] px-3 rounded-[5px] mr-3 mb-3"
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Create Coupon Code</span>
        </div>
      </div>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
      {open && (
        <div className="fixed h-screen top-0 left-0 w-full flex items-center justify-center bg-[#00000062] z-[20000]">
          <div className="w-[90%] lg:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-scroll">
            <div className="w-full flex justify-end">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h5 className="text-[30px] font-Poppins text-center">
              Create Coupon code
            </h5>
            <form onSubmit={handleSubmit} aria-required={true}>
              <br />
              <div>
                <label className="pb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                  placeholder="Enter your coupon code name..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Discount Percentenge <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="value"
                  value={formData.value}
                  required
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                  placeholder="Enter your coupon code value..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">Min Amount</label>
                <input
                  type="number"
                  id="minAmount"
                  value={formData.minAmount}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                  placeholder="Enter your coupon code min amount..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">Max Amount</label>
                <input
                  type="number"
                  id="maxAmount"
                  value={formData.maxAmount}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChange}
                  placeholder="Enter your coupon code max amount..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">Selected Product</label>
                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  value={formData.selectProduct}
                  onChange={handleChange}
                >
                  <option value="Choose your selected products">
                    Choose a selected product
                  </option>
                  {products &&
                    products.map((i) => (
                      <option value={i.name} key={i.name}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>
              <br />
              <div>
                <input
                  type="submit"
                  disabled={isLoading}
                  value={isLoading ? "Loading..." : "Create"}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer bg-black text-white"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
