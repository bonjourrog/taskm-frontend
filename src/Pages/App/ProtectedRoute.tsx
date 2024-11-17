import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../Utils/auth";

const ProtectedRoute:React.FC = ()=>{
    return isAuthenticated()?<Outlet/>:<Navigate to={'/sign-in'}/>
}
export default ProtectedRoute;