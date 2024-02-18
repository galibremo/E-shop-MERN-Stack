import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import ProductCard from "../components/ProductCard";
import { productData } from "../static/data";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";

export default function BestSellingPage() {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, [allProducts]);
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className="max-h-[90rem] mx-auto">
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}
