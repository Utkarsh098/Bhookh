import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import NotFoundPage from "../pages/general/NotFoundPage";
import Home from "../pages/general/Home";
import CreateFood from "../pages/food-partner/CreateFood";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
