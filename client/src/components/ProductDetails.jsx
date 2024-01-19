import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

export default function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className="max-w-[90rem] mx-auto lg:w-[80%]">
          <div className="w-full py-5">
            <div className="block w-full lg:flex">
              <div className="w-full lg:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[200px] overflow-hidden mr-3 mt-3"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[200px] overflow-hidden mr-3 mt-3"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[50%]">
                <h1 className="text-[25px] font-[600] font-Roboto text-[#333] pt-5">
                  {data.name}
                </h1>
                <p className="">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
                    {data.discount_price}$
                  </h4>
                  <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                    {data.price ? data.price : null}
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
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div className="w-[150px] my-3 flex items-center justify-center cursor-pointer bg-[#6443d1] mt-4 !rounded h-11">
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={data.shop.shop_avatar.url}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className="text-[15px] text-blue-400 pb-1 pt-1">
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Raatings
                    </h5>
                  </div>
                  <div className="w-[150px] my-3 flex items-center justify-center cursor-pointer bg-[#6443d1] mt-4 !rounded !h-11">
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
}

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 lg:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className="bottom-[-27%] h-[3px] bg-[crimson]"></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className="bottom-[-27%] h-[3px] bg-[crimson]"></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className="bottom-[-27%] h-[3px] bg-[crimson]"></div>
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
            dicta illo nostrum laudantium adipisci saepe expedita est,
            laboriosam soluta exercitationem velit? Odit et, libero consequatur
            quaerat ratione asperiores natus autem.
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
            dicta illo nostrum laudantium adipisci saepe expedita est,
            laboriosam soluta exercitationem velit? Odit et, libero consequatur
            quaerat ratione asperiores natus autem.
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
            dicta illo nostrum laudantium adipisci saepe expedita est,
            laboriosam soluta exercitationem velit? Odit et, libero consequatur
            quaerat ratione asperiores natus autem.
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full flex items-center justify-center min-h-[40vh]">
          <p>No Reviews Yet</p>
        </div>
      ) : null}
      {active === 3 ? (
        <div className="w-full block lg:flex p-5">
          <div className="w-full lg:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="pl-3">
                <h3 className="pt-3 text-[15px] text-blue-400 pb-3">
                  {data.shop.name}
                </h3>
                <h5 className="pb-2 text-[15px]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              similique magnam et doloribus unde odio vero dignissimos nobis
              laudantium nesciunt accusantium enim possimus, incidunt laborum
              beatae eum alias dolorum exercitationem.
            </p>
          </div>
          <div className="w-full lg:w-[50%] mt-5 lg:mt-0 lg:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined On: <span className="font-[500]">14 march, 2023</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">1,233</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">233</span>
              </h5>
              <Link to="/">
                <div
                  className="w-[150px] bg-black my-3 flex items-center justify-center cursor-pointer !rounded-[4px] !h-[39.5px] mt-3"
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
