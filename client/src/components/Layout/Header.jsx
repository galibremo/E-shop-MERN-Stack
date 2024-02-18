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
import { RxCross1 } from "react-icons/rx";

export default function Header({ activeHeading }) {
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.products);
  const { isSeller } = useSelector((state) => state.seller);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearchChange(e) {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
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
      <div className="hidden lg:flex justify-between items-center max-w-[90rem] mx-auto p-4 h-[80px] ">
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
            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm p-4 text-black w-full z-[9]">
              {searchData &&
                searchData.map((i, index) => {
                  return (
                    <Link key={index} to={`/product/${i._id}`}>
                      <div className="w-full flex py-1">
                        <img
                          src={`${i?.imageUrls[0]}`}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i?.name}</h1>
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
          <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
            <h1 className="text-[#fff] flex items-center">
              {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
              <IoIosArrowForward className="ml-1" />
            </h1>
          </Link>
        </div>
      </div>
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
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
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
                  {cart && cart.length}
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
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm lg:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                1
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
          {open && (
            <div
              className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
            >
              <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                <div className="w-full justify-between flex pr-3">
                  <div>
                    <div
                      className="relative mr-[15px]"
                      onClick={() => setOpenWishlist(true) || setOpen(false)}
                    >
                      <AiOutlineHeart size={30} className="mt-5 ml-3" />
                      <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                        1
                      </span>
                    </div>
                  </div>
                  <RxCross1
                    size={30}
                    className="ml-4 mt-5"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div className="my-8 w-[92%] m-auto h-[40px relative]">
                  <input
                    type="search"
                    placeholder="Search Product..."
                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {searchData && (
                    <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                      {searchData.map((i) => {
                        const d = i.name;

                        const Product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${Product_name}`}>
                            <div className="flex items-center">
                              <img
                                src={i.image_Url[0]?.url}
                                alt=""
                                className="w-[50px] mr-2"
                              />
                              <h5>{i.name}</h5>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
                <Navbar active={activeHeading} />
                <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center cursor-pointer ml-4 rounded-[4px]">
                  <Link to="/shop-create">
                    <h1 className="text-[#fff] flex items-center">
                      Become Seller <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
                <br />
                <br />
                <br />

                <div className="flex w-full justify-center">
                  {isAuthenticated ? (
                    <div>
                      <Link to="/profile">
                        <img
                          src={currentUser?.avatar}
                          alt=""
                          className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                        />
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/sign-in"
                        className="text-[18px] pr-[10px] text-[#000000b7]"
                      >
                        Login /
                      </Link>
                      <Link
                        to="/sign-up"
                        className="text-[18px] text-[#000000b7]"
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
