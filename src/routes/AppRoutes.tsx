import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const Shop = lazy(() => import("../pages/Shop"));
const Checkout = lazy(() => import("../pages/Checkout"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));

const ProfileLayout = lazy(() => import("../pages/profile/ProfileLayout"));
const ProfileAccount = lazy(() => import("../pages/profile/ProfileAccount"));
const ProfileAddresses = lazy(() => import("../pages/profile/ProfileAddresses"));
const ProfileOrders = lazy(() => import("../pages/profile/ProfileOrders"));

const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfileAccount />} />
          <Route path="account" element={<ProfileAccount />} />
          <Route path="addresses" element={<ProfileAddresses />} />
          <Route path="orders" element={<ProfileOrders />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
