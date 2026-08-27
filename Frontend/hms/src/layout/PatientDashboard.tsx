import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/patient/sidebar/SideBar";
import Header from "../components/header/Header";

const PatientDashboard = () => {
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

export default PatientDashboard;