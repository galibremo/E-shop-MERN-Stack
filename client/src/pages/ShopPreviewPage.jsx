import React from "react";
import ShopInfo from "../components/ShopInfo";
import ShopProfileData from "../components/ShopProfileData";

export default function ShopPreviewPage() {
  return (
    <div>
      <div className="max-w-[90rem] mx-auto bg-[#f5f5f5]">
        <div className="w-full lg:flex py-10 justify-between">
          <div className="lg:w-[25%] bg-[#fff] rounded-[4px] shadow-sm lg:overflow-y-scroll lg:h-[90vh] lg:sticky top-10 left-0 z-10">
            <ShopInfo isOwner={false} />
          </div>
          <div className="lg:w-[72%] mt-5 lg:mt-['unset'] rounded-[4px]">
            <ShopProfileData isOwner={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
