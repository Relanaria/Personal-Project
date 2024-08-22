import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuardGuest() {

    const {isAuthenticated} = useAuthContext();
    
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}