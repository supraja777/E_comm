import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import UserOptions from "./components/layout/Header/UserOptions";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResestPassword from "./components/User/ResestPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList"
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={LoginSignUp} />

        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />

        <Route exact path="/search" Component={Search} />

        {/* Old way of using Protected */}
        {/* <ProtectedRoute exact path="/account" component={Profile} /> */}

        {/* Using ProtectedRoute--- Using Outlet  */}
        <Route exact path="/account" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
        </Route>

        <Route exact path="/me/update" element={<ProtectedRoute />}>
          <Route exact path="/me/update" element={<UpdateProfile />} />
        </Route>

        <Route path="/password/update" element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>

        <Route path="/order/confirm" element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>

        <Route path="/shipping" element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>

        <Route path="/shipping" element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>

        <Route path="/process/payment" element={<ProtectedRoute />}>
          <Route path="/process/payment" element={<Payment />} />
        </Route>

        <Route path="/success" element={<ProtectedRoute />}>
          <Route path="/success" element={<OrderSuccess />} />
        </Route>

        <Route path="/orders" element={<ProtectedRoute />}>
          <Route path="/orders" element={<MyOrders />} />
        </Route>

        <Route path="/order/:id" element={<ProtectedRoute />}>
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        <Route path="/admin/product"  isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/product" element={<NewProduct />} />
        </Route>

        <Route path="/admin/product/:id"  isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>

        
        <Route path="/admin/orders"  isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/orders" element={<OrderList />} />
        </Route>

        <Route path="/admin/order/:id"  isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
        </Route>

        <Route path="/admin/dashboard"  isAdmin={true} element={<ProtectedRoute />}>
          <Route
           
            path="/admin/dashboard"
            element={<Dashboard />}
          />
        </Route>

        <Route path="/admin/products" element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            path="/admin/products"
            element={<ProductList />}
          />
        </Route>

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResestPassword />}
        />

        <Route exact path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
