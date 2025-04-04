import React from 'react';
import toast from 'react-hot-toast';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function ProtectRoutes() {
    const user = sessionStorage.getItem("token");
    const location = useLocation();

    if (!user) {
        if (!window.hasShownToast) {
            toast.error("Please log in to access this page!");
            window.hasShownToast = true;
        }
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    window.hasShownToast = false;
    return <Outlet />;
}

export default ProtectRoutes;
