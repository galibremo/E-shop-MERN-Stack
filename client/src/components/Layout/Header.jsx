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
import Cart from "../Cart";
import Wishlist from "../Wishlist";

export default function Header({ activeHeading }) {
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
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
            name="searchTerm"
            onChange={handleSearchChange}
          />
          <FaSearch className="text-slate-600 absolute right-2 top-3.5 cursor-pointer" />
          {searchTerm && searchData.length !== 0 ? (
            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm p-4 text-black w-full z-[9]">
              {searchData &&
                searchData.map((i, index) => {
                  const d = i.name;
                  const product_name = d.replace(/\s+/g, "-");
                  return (
                    <Link key={index} to={`/product/${product_name}`}>
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
        } transition hidden lg:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div className="w-[90rem] mx-auto relative  flex items-center justify-between">
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden xl:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Category
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitem */}
          <div>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className="flex">
              <div className="relative cursor-pointer mr-[15px]"
              onClick={()=> setOpenWishlist(true)}
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
                onClick={() => setOpenCart(true)}
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
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={currentUser.avatar}
                      alt=""
                      className="w-[30px] h-[30px] rounded-full object-cover"
                    />
                  </Link>
                ) : (
                  <Link to="/sign-in">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
          </div>
        </div>
      </div>
    </header>
  );
}
