import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import AdminPage from "./pages/admin/AdminPage";
import MainLayout from "./layout/MainLayout";
import AboutUsPage from "./pages/about-us/AboutUsPage";
import ShopPage from "./pages/shop/ShopPage";
import ProductDetailPage from "./pages/productDetail/ProductDetailPage";
import FaqsPage from "./pages/faqs/FaqsPage";
import LoginPage from "./pages/login/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:productId" element={<ProductDetailPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/login" element={<LoginPage />} />
          

          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
