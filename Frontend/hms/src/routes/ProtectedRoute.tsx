import { jwtDecode } from "jwt-decode";
import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    children:JSX.Element
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children}) => {
    const token = useSelector((state:any) => state.jwt);
    const location = useLocation();
    
    if(!token) {
        return <Navigate to="/login"></Navigate>
    }
    
    const user: any = jwtDecode(token);
    const userRole = user?.role?.toLowerCase();
    const currentPath = location.pathname;
    
    // Check if user is accessing the correct role-based route
    if(currentPath.startsWith('/patient') && userRole !== 'patient') {
        return <Navigate to={`/${userRole}/dashboard`}></Navigate>
    }
    
    if(currentPath.startsWith('/admin') && userRole !== 'admin') {
        return <Navigate to={`/${userRole}/dashboard`}></Navigate>
    }
    
    if(currentPath.startsWith('/doctor') && userRole !== 'doctor') {
        return <Navigate to={`/${userRole}/dashboard`}></Navigate>
    }
    
    return children;
}

export default ProtectedRoute;