import React from "react";
import CountDown from "./CountDown";
export default function EventCard() {
  return (
    <div className="w-full bg-white rounded-lg lg:flex mb-12">
      <div className="w-full lg:w-[50%]">
        <img
          src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818"
          alt=""
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className="text-[25px] font-[600] font-Roboto text-[#333]">
          Iphone 14 pro max 8/256
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id facilis,
          quos adipisci tempora libero ipsa accusantium nesciunt molestias
          doloremque cum mollitia iure officiis sequi? Doloribus minima voluptas
          atque debitis delectus. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Aut dignissimos optio nesciunt repellendus repellat
          vitae soluta nisi illo officia ipsum ipsa magnam, sunt, adipisci odit
          nostrum neque mollitia, ut voluptate!
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-bold text-[20px] pr-3 text-[#333] font-Roboto">
              999$
            </h5>
            <h5 className="font-[500] text-[18px] text-[#d55b45] line-through">
              1099$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown />
        {/* <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div> */}
      </div>
    </div>
  );
}
