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

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        {/* user private route */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        {/* shop route */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        {/* shop private route */}
        <Route element={<SellerPrivateRoute />}>
          <Route path="/shop/:id" element={<ShopHomePage />} />
          <Route path="/dashboard" element={<ShopDashboardPage />} />
          <Route path="/dashboard-orders" element={<ShopAllOrders />} />
          <Route path="/dashboard-products" element={<ShopAllProducts />} />
          <Route path="/dashboard-create-product" element={<ShopCreateProduct />} />
          <Route path="/dashboard-events" element={<ShopAllEvents />} />
          <Route path="/dashboard-create-event" element={<ShopCreateEvent />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
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
