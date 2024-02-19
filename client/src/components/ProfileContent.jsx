import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";
import { updateUserInfo } from "../redux/actions/userAction.js";
import { toast } from "react-toastify";
import axios from "axios";

export default function ProfileContent({ active }) {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, [imageFile]);
  function handleFileUpload(imageFile) {
    const storage = getStorage(app);
    const fileName = new Date().getTime + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  }
  function handleChange(event) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUserInfo(formData, currentUser._id))
      .then(() => {
        toast.success("User information updated successfully!");
      })
      .catch((error) => {
        toast.error(
          `Failed to update user information: ${error.response.data.message}`
        );
      });
  }
  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center w-full flex-col items-center">
              <div className="relative">
                <img
                  src={formData.avatar || currentUser.avatar}
                  className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                  alt=""
                />
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    accept="image/*"
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera />
                  </label>
                </div>
              </div>
              <p className="text-sm self-center mt-2">
                {fileUploadError ? (
                  <span className="text-red-700">
                    Error Image upload (image must be less than 2 mb)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-700">
                    Image successfully uploaded!
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>
            <br />
            <div className="px-5">
              <div className="w-full lg:flex block pb-3">
                <div className=" w-[100%] lg:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    className="border p-1 rounded-[5px] w-full lg:w-[95%]  mb-2 lg:mb-0"
                    required
                    onChange={handleChange}
                    defaultValue={currentUser.name}
                  />
                </div>
                <div className=" w-[100%] lg:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className="border p-1 rounded-[5px] w-full lg:w-[95%] mb-2 lg:mb-0"
                    required
                    onChange={handleChange}
                    defaultValue={currentUser.email}
                  />
                </div>
              </div>

              <div className="w-full lg:flex block pb-3">
                <div className=" w-[100%] lg:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    id="phoneNumber"
                    type="number"
                    className="border p-1 rounded-[5px] w-full lg:w-[95%] mb-2 lg:mb-0"
                    required
                    onChange={handleChange}
                    defaultValue={currentUser?.phoneNumber}
                  />
                </div>
                <div className=" w-[100%] lg:w-[50%]">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    id="zipCode"
                    type="text"
                    className="border p-1 rounded-[5px] w-full lg:w-[95%] mb-2 lg:mb-0"
                    required
                    onChange={handleChange}
                    defaultValue={currentUser.addresses[0]?.zipCode}
                  />
                </div>
              </div>

              <div className="w-full lg:flex block pb-3">
                <div className=" w-[100%] lg:w-[50%]">
                  <label className="block pb-2">Address 1</label>
                  <input
                    id="address1"
                    type="text"
                    className="border p-1 rounded-[5px] w-full lg:w-[95%] mb-2 lg:mb-0"
                    required
                    onChange={handleChange}
                    defaultValue={currentUser.addresses[0]?.address1}
                  />
                </div>
                <div className=" w-[100%] lg:w-[50%]">
                  <label className="block pb-2">Address 2</label>
                  <input
                    id="address2"
                    type="text"
                    className="border p-1 rounded-[5px] w-full lg:w-[95%] mb-2 lg:mb-0"
                    required
                    onChange={handleChange}
                    defaultValue={currentUser.addresses[0]?.address2}
                  />
                </div>
              </div>
              <button
                disabled={loading}
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-5 cursor-pointer uppercase`}
              >
                {loading ? "loading..." : "update"}
              </button>
            </div>
          </form>
        </>
      )}
      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {/* TrackOrder */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
}

function AllOrders() {
  const orders = [
    {
      _id: "we7e587e809oifhkjdhfdsf",
      orderItems: [
        {
          name: "Iphone 16 pro max",
        },
      ],
      totalPrice: 123,
      orderStatus: "processing",
    },
  ];
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
            <Link to={`/user/order/${params.id}`}>
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
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}

function AllRefundOrders() {
  const refundOrders = [
    {
      _id: "we7e587e809oifhkjdhfdsf",
      orderItems: [
        {
          name: "Iphone 16 pro max",
        },
      ],
      totalPrice: 123,
      orderStatus: "processing",
    },
  ];
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
            <Link to={`/user/order/${params.id}`}>
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

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}

function TrackOrder() {
  const trackOrders = [
    {
      _id: "we7e587e809oifhkjdhfdsf",
      orderItems: [
        {
          name: "Iphone 16 pro max",
        },
      ],
      totalPrice: 123,
      orderStatus: "processing",
    },
  ];
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
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  trackOrders &&
    trackOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}

function ChangePassword() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/auth/update-user-password/${currentUser._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (data.success === false) {
        return toast.error(error.message);
      }
      toast.success("Password Changed successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] lg:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              id="oldPassword"
              className="border p-1 rounded-[5px] !w-[95%] mb-4 lg:mb-0"
              value={formData?.oldPassword}
              required
              onChange={handleChange}
            />
          </div>
          <div className=" w-[100%] lg:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              id="newPassword"
              className="border p-1 rounded-[5px] !w-[95%] mb-4 lg:mb-0"
              value={formData?.newPassword}
              required
              onChange={handleChange}
            />
          </div>
          <div className=" w-[100%] lg:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              className="border p-1 rounded-[5px] !w-[95%] mb-4 lg:mb-0"
              value={formData?.confirmPassword}
              required
              onChange={handleChange}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

function Address() {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-md cursor-pointer">
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex item-center">
          <h5 className="pl-5 font-[600]">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6> 494 Erdman Pasaage, New Zoietown, Paraguay</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6> {213} 840-91203923</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
