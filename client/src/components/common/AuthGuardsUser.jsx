import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuardsUser() {
    const {isAuthenticated} = useAuthContext();


    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    
    return <Outlet />
}