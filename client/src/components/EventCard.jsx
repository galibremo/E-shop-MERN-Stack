import React from "react";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
export default function EventCard({ data }) {
  return (
    <div className="w-full bg-white rounded-lg lg:flex gap-10 mb-12 p-10">
      <div className="w-full lg:w-[50%] m-auto">
        <img src={data?.imageUrls[0]} alt="" />
      </div>
      <br />
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className="text-[25px] font-[600] font-Roboto text-[#333]">
          {data?.name}
        </h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-bold text-[20px] pr-3 text-[#333] font-Roboto">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-[500] text-[18px] text-[#d55b45] line-through">
              {data?.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-[#fff]">
              See Details
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
