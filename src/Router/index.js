import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import SignUp from "../Pages/SignUp";
import ProtectedRoute from "./protectRoute";

const RouteList = () => {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/signup"
              element={<SignUp />}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    );
  };
  
export default RouteList;