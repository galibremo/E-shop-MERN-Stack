import React from "react";

export default function CheckoutSteps({ active }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-[50%] flex items-center justify-center">
        <div className="flex items-center">
          <div className="px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer">
            <span className="text-[#fff] text-[16px] font-[600]">
              1.Shipping
            </span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[30px] lg:w-[70px] h-[4px] bg-[#f63b60]"
                : "w-[30px] lg:w-[70px] h-[4px] bg-[#FDE1E6]"
            }`}
          />
        </div>

        <div className="flex items-center">
          <div
            className={`${
              active > 1
                ? "px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer"
                : "px-[20px] h-[38px] rounded-[20px] flex items-center justify-center cursor-pointer bg-[#FDE1E6]"
            }`}
          >
            <span
              className={`${
                active > 1
                  ? "text-[#fff] text-[16px] font-[600]"
                  : "text-[16px] font-[600] text-[#f63b60]"
              }`}
            >
              2.Payment
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div
            className={`${
              active > 3
                ? "w-[30px] lg:w-[70px] h-[4px] bg-[#f63b60]"
                : "w-[30px] lg:w-[70px] h-[4px] bg-[#FDE1E6]"
            }`}
          />
          <div
            className={`${
              active > 2
                ? "px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer"
                : "px-[20px] h-[38px] rounded-[20px] flex items-center justify-center cursor-pointer bg-[#FDE1E6]"
            }`}
          >
            <span
              className={`${
                active > 2
                  ? "text-[#fff] text-[16px] font-[600]"
                  : "text-[16px] font-[600] text-[#f63b60]"
              }`}
            >
              3.Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
