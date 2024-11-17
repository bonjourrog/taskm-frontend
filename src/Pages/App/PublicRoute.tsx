import { Navigate, Outlet } from "react-router-dom"
import { isAuthenticated } from "../../Utils/auth"

const PublicRoute:React.FC = ()=>{
    return !isAuthenticated()?<Outlet/>:<Navigate to={"/"}/>
}
export default PublicRoute;