import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductList from "../pages/products/ProductList";
import ProductForm from "../pages/products/AddProduct";
import CategoryList from "../pages/categories/CategoryList";
import Login from "../pages/auth/Login";
import AddProduct from "../pages/products/AddProduct";

/* Simple auth check */
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export default function AdminRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          isAuthenticated() ? <AdminLayout /> : <Navigate to="/login" />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="categories" element={<CategoryList />} />
      </Route>

      {/*  FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
