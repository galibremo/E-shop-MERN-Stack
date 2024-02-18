import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../redux/actions/productAction";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { deleteProductShop } from "../redux/actions/productAction";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function AllProducts() {
  const { products } = useSelector((state) => state.products);
  const { currentSeller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(currentSeller._id));
  }, []);

  const handleDelete = (id, imageUrls) => {
    dispatch(deleteProductShop(id, imageUrls));
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "Preview",
      flex: 0.8,
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => handleDelete(params.id, params.row.imageUrls)}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
        imageUrls: item.imageUrls,
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
}
