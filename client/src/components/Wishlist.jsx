import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { removeWishlist } from "../redux/actions/wishlistAction";
import { addCart } from "../redux/actions/cartAction";
import { toast } from "react-toastify";

export default function Wishlist({ setOpenWishlist }) {
  const { wishlist } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  function removeFromWishlistHandler(data) {
    dispatch(removeWishlist(data));
  }

  function addToCartHandler(data) {
    const cartData = { ...data, qty: 1 };
    dispatch(addCart(cartData));
    toast.success("Item added to cart successfully!");
    setOpenWishlist(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] md:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex justify-center items-center">
            <div className="flex w-full justify-end pt-5 pr-5 top-[1px] right-4 fixed">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist is empth!</h5>
          </div>
        ) : (
          <div>
            <div className="flex w-full justify-end pt-5 pr-5 ">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <div className="flex items-center p-4">
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist && wishlist.length}
              </h5>
            </div>
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex justify-between items-center">
        <RxCross1
          className="cursor-pointer"
          size={30}
          onClick={() => removeFromWishlistHandler(data._id)}
        />
        <img
          src={data?.imageUrls[0]}
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            tile="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};
