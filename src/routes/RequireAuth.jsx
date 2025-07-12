import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
    const tokenFromSession = localStorage.getItem("token");
    const tokenFromRedux = useSelector((state) => state.auth.token);
    const isAuthenticated = tokenFromRedux || tokenFromSession;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireAuth;
