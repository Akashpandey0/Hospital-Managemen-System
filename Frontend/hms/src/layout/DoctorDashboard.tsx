import React from "react";
import SideBar from "../components/doctor/sidebar/SideBar";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

const DoctorDashboard = () => {
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

export default DoctorDashboard;