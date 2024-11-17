import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, setAuthenticatedUser } from "../../Utils/auth";
import { useEffect } from "react";
import useUserStore from "../../store/useUserStore";

const ProtectedRoute:React.FC = ()=>{
    const {setUser} = useUserStore()
    useEffect(()=>{
        if(isAuthenticated()){
            const user = setAuthenticatedUser()
            setUser(user);
        }
    },[])
    return isAuthenticated()?<Outlet/>:<Navigate to={'/sign-in'}/>
}
export default ProtectedRoute;