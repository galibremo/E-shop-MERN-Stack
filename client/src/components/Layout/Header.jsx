import { FaSearch } from "react-icons/fa";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { productData, categoriesData } from "../../static/data";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./Dropdown";
import Navbar from "./Navbar";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

export default function Header({ activeHeading }) {
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const navigate = useNavigate();

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchData(filteredProducts);
  }
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <header>
      <div className="flex justify-between items-center max-w-[90rem] mx-auto p-4 h-[80px]">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">E-</span>
            <span className="text-slate-700">Shop</span>
          </h1>
        </Link>

        {/* search */}
        <div className="relative w-[50%]">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-black w-full border-2 p-2  rounded-md"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="text-slate-600 absolute right-2 top-3.5 cursor-pointer" />
          {searchTerm && searchData.length !== 0 ? (
            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm p-4 text-black w-full">
              {searchData &&
                searchData.map((i, index) => {
                  const d = i.name;
                  const product_name = d.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${product_name}`}>
                      <div className="w-full flex py-1">
                        <img
                          src={`${i.image_Url[0].url}`}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>
        {/* search */}

        {/* seller */}
        <div className="bg-black rounded-md p-2">
          <Link to="/seller">
            <h1 className="text-[#fff] flex items-center">
              Become Seller
              <IoIosArrowForward className="ml-1" />
            </h1>
          </Link>
        </div>
      </div>
      {/* seller */}

      {/* 2nd header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden lg:block bg-slate-500 h-[80px]`}
      >
        <div className="max-w-[90rem] mx-auto h-[100%] p-4">
          <div className="h-[100%] relative flex justify-between items-center">
            <BiMenuAltLeft size={30} className="absolute" />
            <button className="h-[100%] bg-white font-sans text-lg font-[500] select-none rounded-t-lg w-[270px] text-left pl-10">
              All Category
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute left-[240px] cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            />
            {dropDown ? (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            ) : null}
            {/* navitem */}
            <div>
              <Navbar active={activeHeading} />
            </div>

            <div className="flex">
              <div className="flex">
                <div
                  className="relative cursor-pointer mr-[15px]"
                >
                  <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                  </span>
                </div>
              </div>

              <div className="flex">
                <div
                  className="relative cursor-pointer mr-[15px]"
                >
                  <AiOutlineShoppingCart
                    size={30}
                    color="rgb(255 255 255 / 83%)"
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                  </span>
                </div>
              </div>
              <div className="flex">
              <div className="relative cursor-pointer mr-[15px]">                
                  <Link to="/sign-in">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      {/* 2nd header */}
    </header>
  );
}
