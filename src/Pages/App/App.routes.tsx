import { useRoutes } from "react-router-dom";
import Signin from "../Signin";
import Signup from "../Signup";
export const AppRoutes = ()=>{
    let routes = useRoutes([
        {path:'/', element:<p>Home</p>},
        {path:'sign-in', element:<Signin/>},
        {path:'sign-up', element:<Signup/>},
        {path:'/*', element:<p>404 Not Found</p>}
    ])
    return routes
}