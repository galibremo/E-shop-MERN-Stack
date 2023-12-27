import React from "react";
import { useNavigate } from "react-router-dom";

export default function DropDown({categoriesData, setDropDown}) {
  const navigate = useNavigate();
  function handleSubmit(i) {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  }
  return (
    <div className="pb-3 w-[270px] bg-[#fff] absolute top-[47px] rounded-b-md shadow-sm z-30">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className="flex items-center pt-1"
            onClick={() => handleSubmit(i)}
          >
            <img src={i.image_Url} className="w-[25px] h-[25px] ml-8 select-none" alt="" />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
}
