import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMessage, AiFillHeart, AiOutlineHeart,AiOutlineShoppingCart } from "react-icons/ai";

export default function ProductDetailsCard({ setOpen, data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);
  function handleMessageSubmit() {}
  function decrementCount() {
    if (count > 1) {
      setCount(count - 1);
    }
  }
  function incrementCount() {
    setCount(count + 1);
  }
  return (
    <div>
      {data ? (
        <div className="flex items-center justify-center w-screen h-screen bg-[#00000030] fixed top-0 left-0 z-10 ">
          <div className="w-[90%] md:w-[60%] h-[90vh] overflow-y-scroll md:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full md:flex">
              <div className="w-full md:w-[50%]">
                <img src={data.image_Url[0].url} alt="" />
                <div className="flex">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className="pt-3 text-[15px] text-blue-400 pb-3">
                      {data.shop.name}
                    </h3>
                    <h3 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h3>
                  </div>
                </div>
                <div
                  className="w-[150px] my-3 flex items-center justify-center cursor-pointer bg-[#000] mt-4 rounded-[4px] h-11"
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.total_sell}) Sold out
                </h5>
              </div>
              <div className="w-full md:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className="font-[600] font-Roboto text-[#333] text-[20px]">
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
                    {data.discount_price}$
                  </h4>
                  <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className="w-[150px] bg-black my-3 justify-center rounded-md cursor-pointer mt-6 h-11 flex items-center "
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
