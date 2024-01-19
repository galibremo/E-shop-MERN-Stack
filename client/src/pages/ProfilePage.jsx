import React, { useState } from "react";
import Header from "../components/Layout/Header";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileContent from "../components/ProfileContent";

export default function ProfilePage() {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className="max-w-[90rem] mx-auto flex bg-[#f5f5f5] py-10">
        <div className="w-[50px] lg:w-[335px] sticky">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
          <ProfileContent active={active} />
      </div>
    </div>
  );
}
