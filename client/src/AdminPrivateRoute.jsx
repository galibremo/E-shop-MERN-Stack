import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminPrivateRoute() {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  return isAuthenticated && currentUser.role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
