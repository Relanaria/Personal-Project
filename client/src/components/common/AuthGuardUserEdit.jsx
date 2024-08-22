import { useMangaContext } from "../../contexts/CurrentMangaContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet, useParams } from "react-router-dom";

export default function AuthGuardUserEdit() {
    
    const {isAuthenticated, userId} = useAuthContext();
    const {mangaDetails, setMangaDetails} = useMangaContext();

    if(!isAuthenticated){
        return <Navigate to="/login" />;
    };
  
    if(userId !== mangaDetails?._ownerId){
        return <Navigate to="/"/>;
    };
    return <Outlet/>;

}


