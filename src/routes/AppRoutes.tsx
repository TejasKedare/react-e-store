import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import ProfileLayout from "../pages/profile/ProfileLayout";
import ProfileAccount from "../pages/profile/ProfileAccount";
import ProfileAddresses from "../pages/profile/ProfileAddresses";
import ProfileOrders from "../pages/profile/ProfileOrders";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/profile" element={<ProfileLayout />}>
  <Route index element={<ProfileAccount />} />
  <Route path="account" element={<ProfileAccount />} />
  <Route path="addresses" element={<ProfileAddresses />} />
  <Route path="orders" element={<ProfileOrders />} />
</Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
