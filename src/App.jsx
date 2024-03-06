// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SideBar from './components/SideBar'; // Import the SideBar component
// import AdminDashboard from './pages/AdminDashboard';
// import AdminProducts from './components/AdminProducts';
// import AdminRetailers from './components/AdminRetailers';
// import AdminFarmers from './components/AdminFarmers';
// import AdminNewProduct from './components/AdminNewProduct';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';
// import AdminLoginPage from './pages/AdminLoginPage';
// import Home from './pages/Home';

// const App = () => (
//   <BrowserRouter>
//     <div className="bg-primary w-full overflow-hidden">
//       <Routes>
//         {/* Public routes (without SideBar) */}
//         <Route path="/" element={<Home />} />
//         <Route path="/signinpage" element={<SignInPage />} />
//         <Route path="/signuppage" element={<SignUpPage />} />
//         <Route path="/adminloginpage" element={<AdminLoginPage />} />
//       <Routes/>
//         {/* Admin routes (with SideBar) */}
//     <div className='App'>
//       <div>
//         <SideBar/>
//       </div>
//       </div>
//         <Routes>
//           <Route path="/admindashboard" element={<AdminDashboard />} />
//           <Route path="/products" element={<AdminProducts />} />
//           <Route path="/retailerdata" element={<AdminRetailers />} />
//           <Route path="/farmerdata" element={<AdminFarmers />} />
//           <Route path="/addproduct" element={<AdminNewProduct />} />
//         </Routes>
//       </Routes>
//     </div>
//   </BrowserRouter>
// );

// const AdminLayout = ({ children }) => (
//   <div className='App'>
//     <SideBar />
//     <div>{children}</div>
//   </div>
// );

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminLayout';
import AdminProducts from './components/AdminProducts';
import AdminRetailers from './components/AdminRetailers';
import AdminFarmers from './components/AdminFarmers';
import AdminNewProduct from './components/AdminNewProduct';
import AdminProfile from './components/AdminProfile';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AdminLoginPage from './pages/AdminLoginPage';
import Home from './pages/Home';
import AdminLayout from './pages/AdminLayout';
import FarmerDashboard from './pages/FarmerDashboard';
import FarmerProducts from './components/FarmerProducts';
import RetailerDashboard from './pages/RetailerDashboard';
import RetailerProducts from './components/RetailerProducts';
import RetailerWishlist from './components/RetailerWishlist';

const App = () => (
  <BrowserRouter>
    <div className="bg-primary w-full overflow-hidden">
      {/* Public routes (without SideBar) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signinpage" element={<SignInPage />} />
        <Route path="/signuppage" element={<SignUpPage />} />
        <Route path="/adminloginpage" element={<AdminLoginPage />} />

      {/* <div className='App'>
        <div>
          <SideBar />
        </div>
        <div> */}
            {/* Admin routes (with SideBar) */}
            <Route path="/adminlayout/*" element={<AdminLayout/>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="retailerdata" element={<AdminRetailers />} />
              <Route path="farmerdata" element={<AdminFarmers />} />
              <Route path="addproduct" element={<AdminNewProduct />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            <Route path="/farmerdashboard/*" element={<FarmerDashboard/>}>
              <Route path="products" element={<FarmerProducts />}/>
              <Route path="addproduct" element={<AdminNewProduct/>}/>
              <Route path="profile" element={<AdminProfile/>}/>
            </Route>

            <Route path="/retailerdashboard/*" element={<RetailerDashboard/>}>
              <Route path="allproducts" element={<RetailerProducts/>}/>
              <Route path="wishlist" element={<RetailerWishlist/>}/>
              <Route path="profile" element={<AdminProfile/>}/>
            </Route>
          </Routes>
        {/* </div>
      </div> */}
    </div>
  </BrowserRouter>

);

// const AdminLayout = ({ children }) => (
//   // <div className='App'>
//   <div>
//     <SideBar />
//     <div>{children}</div>
//   </div>
// );

export default App;
