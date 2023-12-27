import { useEffect, useState } from "react";
import { productData } from "../static/data";
import ProductCard from "./ProductCard";

export default function BestDeals() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const sortedDatad =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFive = sortedDatad.slice(0, 5);
    setData(firstFive);
  }, []);
  return (
    <div className="max-w-[90rem] p-4 mx-auto">
      <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
        <h1>Best Deals</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
      </div>
    </div>
  );
}
