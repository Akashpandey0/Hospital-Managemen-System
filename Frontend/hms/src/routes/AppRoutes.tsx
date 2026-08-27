import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../layout/AdminDashboard";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/Registerpage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import PatientDashboard from "../layout/PatientDashboard";
import PatientProfilePage from "../pages/patient/PatientProfilePage.tsx";
import DoctorDashboard from "../layout/DoctorDashboard.tsx";
import DoctorProfilePage from "../pages/doctor/DoctorProfilePage.tsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

                <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                    <Route path="/dashboard" element={<div>Dashboard</div>} />
                    <Route path="/doctors" element={<div>Doctors</div>} />
                    <Route path="/patients" element={<div>Patients</div>} />
                    <Route path="/appointments" element={<div>Appointments</div>} />
                    <Route path="/pharmacy" element={<div>Pharmacy</div>} />
                </Route>

                <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}>
                    <Route path="dashboard" element={<div>Dashboard</div>} />
                    <Route path="profile" element={<DoctorProfilePage />} />
                    <Route path="patients" element={<div>Patients</div>} />
                    <Route path="appointments" element={<div>Appointments</div>} />
                    <Route path="pharmacy" element={<div>Pharmacy</div>} />
                </Route>

                <Route path="/patient" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>
                    <Route path="dashboard" element={<div>Dashboard</div>} />
                    <Route path="profile" element={<PatientProfilePage />} />
                    <Route path="appointments" element={<div>Appointments</div>} />
                    
                </Route>
            </Routes>   
        </BrowserRouter>
    )
}

export default AppRoutes;