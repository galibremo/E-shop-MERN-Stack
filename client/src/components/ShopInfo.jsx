import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSeller } from "../redux/actions/userAction";
import { toast } from "react-toastify";

export default function ShopInfo({ isOwner }) {
  const dispatch = useDispatch();
  const { currentSeller } = useSelector((state) => state.seller);
  function logoutHandler() {
    try {
      dispatch(signOutSeller());
      toast.success("Logout Successful!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex item-center justify-center">
          <img
            src={`${currentSeller?.avatar}`}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{currentSeller.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid quam
          nemo inventore explicabo ipsam exercitationem sunt quaerat, magni
          distinctio similique, tempore ab nihil eius accusantium voluptatem
          natus, voluptatibus vitae! Fugiat?
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{currentSeller.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{currentSeller.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">10</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">4/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">
          {currentSeller?.createdAt?.slice(0, 10)}
        </h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div className="bg-black my-3 flex items-center justify-center cursor-pointer w-full h-[42px] rounded-[5px]">
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            className="bg-black my-3 flex items-center justify-center cursor-pointer w-full h-[42px] rounded-[5px]"
            onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
}
