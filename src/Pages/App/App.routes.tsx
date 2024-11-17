import { useRoutes } from "react-router-dom";
import Signin from "../Signin";
import Signup from "../Signup";
import Home from "../Home";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
export const AppRoutes = ()=>{
    let routes = useRoutes([
        {path:'/', element:<ProtectedRoute/>, children:[
            {path:"", element:<Home/>}
        ]},
        {path:'sign-in', element:<PublicRoute/>, children:[{path:'',element:<Signin/>}]},
        {path:'sign-up', element:<PublicRoute/>, children:[{path:'',element:<Signup/>}]},
        {path:'/*', element:<p>404 Not Found</p>}
    ])
    return routes
}