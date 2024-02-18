import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "./ProductDetailsCard";
import { useSelector, useDispatch } from "react-redux";
import { addWishlist, removeWishlist } from "../redux/actions/wishlistAction";

export default function ProductCard({ data }) {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  function removeFromWishlistHandler(data) {
    setClick(!click);
    dispatch(removeWishlist(data));
  }

  function addToWishlistHandler(data) {
    setClick(!click);
    dispatch(addWishlist(data));
  }

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link to={`/product/${data._id}`}>
        <img
          src={`${data?.imageUrls && data?.imageUrls[0]}`}
          alt=""
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link to={`/shop/preview/${data?.shop._id}`}>
        <h5 className="pt-3 text-[15px] text-blue-400 pb-3">
          {data.shop.name}
        </h5>
      </Link>
      <Link to={`/product/${data._id}`}>
        <h4 className="pb-3 font-[500]">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>

        <div className="flex">
          <AiFillStar className="mr-2 cursor-pointer" size={20} />
          <AiFillStar className="mr-2 cursor-pointer" size={20} />
          <AiFillStar className="mr-2 cursor-pointer" size={20} />
          <AiFillStar className="mr-2 cursor-pointer" size={20} />
          <AiFillStar className="mr-2 cursor-pointer" size={20} />
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className="font-bold text-[18px] text-[#333] font-Roboto">
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
              $
            </h5>
            <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              {data.originalPrice ? data.originalPrice + " $" : null}$
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {data?.sold_out} sold
          </span>
        </div>
      </Link>
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => removeFromWishlistHandler(data._id)}
            color={click ? "red" : "#333"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => addToWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          onClick={() => setOpen(!open)}
          color="#444"
          title="Add to cart"
        />
        {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
      </div>
    </div>
  );
}
