import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function SellerPrivateRoute() {
  const { isSeller } = useSelector((state) => state.seller);
  return isSeller ? <Outlet /> : <Navigate to="/shop-login" />;
}
