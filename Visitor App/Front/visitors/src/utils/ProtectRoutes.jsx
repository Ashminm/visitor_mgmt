import React from 'react'
import toast from 'react-hot-toast';
import { Outlet,Navigate,useLocation } from 'react-router-dom'

function ProtectRoutes() {
    const user = sessionStorage.getItem("token")
    const location = useLocation();
    if (!user) {
        toast.warning("Please log in to access this page!"); 
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;

}

export default ProtectRoutes
