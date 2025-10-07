import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./context/PrivateRoute"; // import your PrivateRoute

import AdminLogin from "./admin/pages/login";
import MainDashboard from "./admin/pages/dashboard";
import AssetsDashboard from "./admin/pages/asset-list";
import RegisterAsset from "./admin/pages/asset-add";
import TransactionsOffline from "./sample";
import RegisterUser from "./user/pages/register";
import LoginUser from "./user/pages/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/assets/list"
          element={
            <PrivateRoute>
              <AssetsDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/assets/add"
          element={
            <PrivateRoute>
              <RegisterAsset />
            </PrivateRoute>
          }
        />
        <Route
          path="/trans"
          element={
            <PrivateRoute>
              <TransactionsOffline />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
