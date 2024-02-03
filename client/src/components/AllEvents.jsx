import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEventsShop } from "../redux/actions/eventAction";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { deleteEventShop } from "../redux/actions/eventAction";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../firebase";

export default function AllEvents() {
  const { events, loading } = useSelector((state) => state.events);
  const { currentSeller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEventsShop(currentSeller._id));
  }, [dispatch]);

  const handleDelete = async (id, imageUrls) => {
    try {
      await dispatch(deleteEventShop(id));
      const storage = getStorage();
      for (const imageUrl of imageUrls) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
      toast.success("Event and images deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error(`Failed to delete event: ${error.message}`);
    }
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
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
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

  events &&
    events.forEach((item) => {
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
