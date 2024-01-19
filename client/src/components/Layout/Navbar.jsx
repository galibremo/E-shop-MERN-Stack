import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

export default function Navbar({ active }) {
  return (
    <div className="block lg:flex mt-0 lg:mt-8">
      {navItems &&
        navItems.map((i, index) => (
          <div
            key={i.id}
            className={`${
              active === index + 1
                ? "text-[#17dd1f]"
                : "text-black lg:text-[#fff]"
            } pb-[30px] font-[500] px-6 cursor-pointer`}
          >
            <Link to={i.url}>{i.title}</Link>
          </div>
        ))}
    </div>
  );
}
