import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Admin/Layout";
import AddProducts from "./Pages/Admin/Products/AddProducts";
import AllProducts from "./Pages/Admin/Products/AllProducts";
import AdminLogin from "./Pages/Admin/Auth/Login";
import AdminRegister from "./Pages/Admin/Auth/Register";
import Home from "./Pages/Customer/Home";
import ProductReviews from "./Pages/Admin/Products/ProductReviews";
import CategoryList from "./Pages/Admin/Category/CategoryList";
import NewCategory from "./Pages/Admin/Category/NewCategory";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Layout />}>
            <Route index element={<AllProducts />} />
            <Route path="/admin/allproducts" element={<AllProducts />} />
            <Route path="/admin/categorylist" element={<CategoryList />} />
            <Route path="/admin/addcategroy" element={<NewCategory />} />
            <Route path="/admin/addproducts" element={<AddProducts />} />
            <Route path="/admin/reviews" element={<ProductReviews />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
