import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addCart } from "../redux/actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { addWishlist, removeWishlist } from "../redux/actions/wishlistAction";

export default function ProductDetailsCard({ setOpen, data }) {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  function handleMessageSubmit() {}
  function decrementCount() {
    if (count > 1) {
      setCount(count - 1);
    }
  }
  function incrementCount() {
    setCount(count + 1);
  }

  function addToCartHandler(id) {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }

  function removeFromWishlistHandler(data) {
    setClick(!click);
    dispatch(removeWishlist(data));
  }

  function addToWishlistHandler(data) {
    setClick(!click);
    dispatch(addWishlist(data));
  }

  return (
    <div>
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] lg:w-[60%] h-[90vh] overflow-y-scroll lg:h-[75vh] bg-white rounded-lg shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full lg:flex">
              <div className="w-full lg:w-[50%]">
                <img src={data?.imageUrls[0]} alt="" />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={data?.imageUrls[0]}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className="pt-3 text-[15px] text-blue-400 pb-3">
                        {data?.shop?.name}
                      </h3>
                      <h3 className="pb-3 text-[15px]">
                        ({data?.ratings}) Ratings
                      </h3>
                    </div>
                  </Link>
                </div>
                <div
                  className="w-[150px] my-3 flex items-center justify-center cursor-pointer bg-[#000] mt-4 rounded-[4px] h-11"
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">(50) Sold out</h5>
              </div>
              <div className="w-full lg:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className="font-[600] font-Roboto text-[#333] text-[20px]">
                  {data.name}
                </h1>
                <p>{data?.description}</p>

                <div className="flex pt-3">
                  <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
                    {data.discountPrice}$
                  </h4>
                  <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                    {data.originalPrice ? data.originalPrice + "$" : null}
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
                        onClick={() => removeFromWishlistHandler(data._id)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className="w-[150px] bg-black my-3 justify-center rounded-lg cursor-pointer mt-6 h-11 flex items-center "
                  onClick={() => addToCartHandler(data._id)}
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
