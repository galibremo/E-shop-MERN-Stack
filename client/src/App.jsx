import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Activation from "./pages/Activation";
import HomePage from "./pages/HomePage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsPage from "./pages/ProductsPage";
import BestSellingPage from "./pages/BestSellingPage";
import EventsPage from "./pages/EventsPage";
import FAQPage from "./pages/FAQPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import CheckoutPage from "./pages/CheckoutPage";
import ShopCreatePage from "./pages/ShopCreatePage";
import SellerActivation from "./pages/SellerActivation";
import ShopLoginPage from "./pages/ShopLoginPage";
import ShopHomePage from "./pages/ShopHomePage";
import SellerPrivateRoute from "./SellerPrivateRoute";
import ShopDashboardPage from "./pages/ShopDashboardPage";
import ShopAllOrders from "./pages/ShopAllOrders";
import ShopCreateProduct from "./pages/ShopCreateProduct";
import ShopAllProducts from "./pages/ShopAllProducts";
import ShopAllEvents from "./pages/ShopAllEvents";
import ShopCreateEvent from "./pages/ShopCreateEvent";
import ShopAllCoupons from "./pages/ShopAllCoupons";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "./redux/actions/productAction";
import { getAllEvents } from "./redux/actions/eventAction";
import { useDispatch } from "react-redux";
import ShopPreviewPage from "./pages/ShopPreviewPage";
import { loadSeller } from "./redux/actions/userAction";
import PaymentPage from "./pages/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ShopOrderDetailsPage from "./pages/ShopOrderDetailsPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import ShopAllRefunds from "./pages/ShopAllRefunds";
import ShopSettingsPage from "./pages/ShopSettingsPage";
import ShopWithdrawMoney from "./pages/ShopWithdrawMoney";
import ShopInboxPage from "./pages/ShopInboxPage";
import UserInbox from "./pages/UserInbox";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminDashboardUsers from "./pages/AdminDashboardUsers";
import AdminDashboardOrder from "./pages/AdminDashboardOrder";
import AdminDashboardWithdraw from "./pages/AdminDashboardWithdraw";

export default function App() {
  const [stripeApikey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/payment/stripe-api-key");
      if (data.success === false) {
        toast.error(error.message);
      }
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllEvents());
    getStripeApiKey();
  }, [dispatch]);

  return (
    <BrowserRouter>
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/payment" element={<PaymentPage />} />
            </Route>
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/activation/:activation_token" element={<Activation />} />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivation />}
        />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        {/* user private route */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user/order/:id" element={<OrderDetailsPage />} />
          <Route path="/user/track/order/:id" element={<TrackOrderPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        {/* shop route */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        {/* shop private route */}
        <Route element={<SellerPrivateRoute />}>
          <Route path="/shop/:id" element={<ShopHomePage />} />
          <Route path="/order/:id" element={<ShopOrderDetailsPage />} />
          <Route path="/dashboard" element={<ShopDashboardPage />} />
          <Route path="/dashboard-orders" element={<ShopAllOrders />} />
          <Route
            path="/dashboard-withdraw-money"
            element={<ShopWithdrawMoney />}
          />
          <Route path="/dashboard-products" element={<ShopAllProducts />} />
          <Route path="/settings" element={<ShopSettingsPage />} />
          <Route
            path="/dashboard-create-product"
            element={<ShopCreateProduct />}
          />
          <Route path="/dashboard-events" element={<ShopAllEvents />} />
          <Route path="/dashboard-create-event" element={<ShopCreateEvent />} />
          <Route path="/dashboard-coupon" element={<ShopAllCoupons />} />
          <Route path="/dashboard-refunds" element={<ShopAllRefunds />} />
          <Route path="/dashboard-messages" element={<ShopInboxPage />} />
          <Route path="/inbox" element={<UserInbox />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin-users" element={<AdminDashboardUsers />} />
          <Route path="/admin-orders" element={<AdminDashboardOrder />} />
          <Route
            path="/admin-withdraw-request"
            element={<AdminDashboardWithdraw />}
          />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}
