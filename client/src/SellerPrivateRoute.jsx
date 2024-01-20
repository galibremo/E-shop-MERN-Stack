import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function SellerPrivateRoute() {
  const { isSeller, currentSeller } = useSelector((state) => state.seller);
  return isSeller ? <Outlet /> : <Navigate to="/" />;
}
