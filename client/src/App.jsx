import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminLayout";
import AdminProducts from "./components/AdminProducts";
import AdminRetailers from "./components/AdminRetailers";
import AdminFarmers from "./components/AdminFarmers";
import AdminNewProduct from "./components/AdminNewProduct";
import FarmerNewProduct from "./components/FarmerNewProduct";
import AdminProfile from "./components/AdminProfile";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import Home from "./pages/Home";
import AdminLayout from "./pages/AdminLayout";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerProducts from "./components/FarmerProducts";
import RetailerDashboard from "./pages/RetailerDashboard";
import RetailerProducts from "./components/RetailerProducts";
import RetailerWishlist from "./components/RetailerWishlist";
import FarmerProfile from "./components/FarmerProfile";
import RetailerProfile from "./components/RetailerProfile";
import FarmerProductDetails from "./components/FarmerProductDetails";
import AdminProductDetails from "./components/AdminProductDetails";
import AdminFarmerDetails from "./components/AdminFarmerDetails";
import AdminRetailerDetails from "./components/AdminRetailerDetails";
import AdminAddedProductDetails from "./components/AdminAddedProductDetails";
import RetailerProductDetails from "./components/RetailerProductDetails";

const App = () => (
  <BrowserRouter>
    <div className="bg-primary w-full overflow-hidden">
      {/* Public routes (without SideBar) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signinpage" element={<SignInPage />} />
        <Route path="/signuppage" element={<SignUpPage />} />
        <Route path="/adminloginpage" element={<AdminLoginPage />} />

        {/* Admin routes (with SideBar) */}
        <Route path="/adminlayout/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="retailerdata" element={<AdminRetailers />} />
          <Route path="farmerdata" element={<AdminFarmers />} />
          <Route path="addadminproduct" element={<AdminNewProduct />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="product/:productId" element={<AdminProductDetails />} />
          <Route path="farmerprofile/:farmerId" element={<FarmerProfile />} />
          <Route
            path="retailerprofile/:retailerId"
            element={<RetailerProfile />}
          />
          <Route
            path="addedproducts/:productId"
            element={<AdminAddedProductDetails />}
          />
        </Route>

        <Route path="/farmerdashboard/*" element={<FarmerDashboard />}>
          <Route path="products" element={<FarmerProducts />} />
          <Route path="addfarmerproduct" element={<FarmerNewProduct />} />
          <Route path="profile" element={<FarmerProfile />} />
          <Route
            path="farmerproductdetails/:productId"
            element={<FarmerProductDetails />}
          />
        </Route>

        <Route path="/retailerdashboard/*" element={<RetailerDashboard />}>
          <Route path="allproducts" element={<RetailerProducts />} />
          <Route path="wishlist" element={<RetailerWishlist />} />
          <Route path="profile" element={<RetailerProfile />} />
          <Route
            path="retailerproductdetails/:productId"
            element={<RetailerProductDetails />}
          />
        </Route>
      </Routes>
      {/* </div>
      </div> */}
    </div>
  </BrowserRouter>
);

export default App;
