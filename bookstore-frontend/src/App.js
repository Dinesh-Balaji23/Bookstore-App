import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import UserLogin from "./Components/UserLogin";
import SellerLogin from "./Components/SellerLogin";
import AdminLogin from "./Components/AdminLogin";
import UserSignup from "./Components/UserSignup";
import AdminSignup from "./Components/AdminSignup";
import SellerSignup from "./Components/SellerSignup";
import UserHome from "./Components/UserHome";
import AddBook from "./Components/AddBook";
import BookStore from "./Components/BookStore";
import View from "./Components/View";
import OrderItem from "./Components/OrderItem";
import Orders from "./Components/Orders";
import SellerHome from "./Components/SellerHome";
import MyProducts from "./Components/MyProducts";
import SellerOrders from "./Components/SellerOrders";
import AdminHome from "./Components/AdminHome";
import Users from "./Components/Users";
import Sellers from "./Components/Sellers";
import Wishlist from "./Components/Wishlists";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/loginadmin" element={<AdminLogin />} />
        <Route path="/loginseller" element={<SellerLogin />} />
        <Route path="/signup" element={<UserSignup />}  />
        <Route path="/signupadmin" element={<AdminSignup />} />
        <Route path="/signupseller" element={<SellerSignup />} />
        <Route path="/home/:username" element={<UserHome />} />
        <Route path="/addbooks/:username" element={<AddBook />}/>
        <Route path="/store/:username" element={<BookStore />}/>
        <Route path="/wishlist/:username" element={<Wishlist />} />
        <Route path="/view/:id/:username" element={<View />}/>
        <Route path="/orderitem/:id/:username" element={<OrderItem />}/>
        <Route path="/orders/:username" element={<Orders />} />
        <Route path="/sellerhome/:username" element={<SellerHome />} />
        <Route path="/myproducts/:username" element={<MyProducts />} />
        <Route path="/sellerorders/:username" element={<SellerOrders />} />
        <Route path="/adminhome/:username" element={<AdminHome />} />
        <Route path="/users/:username" element={<Users />} />
        <Route path="/sellers/:username" element={<Sellers />} />
      </Routes>
    </Router>
  );
};

export default App;