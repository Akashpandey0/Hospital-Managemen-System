import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/doctor/sidebar/SideBar";
import Header from "../components/header/Header";

const AdminDashboard = () => {
    return (
        <div className='flex'>
            <div>
                <SideBar  />
                
            </div>
            <div className="w-full">
                <Header />
                <Outlet />
            </div>
            
        </div>
    )
}

export default AdminDashboard;