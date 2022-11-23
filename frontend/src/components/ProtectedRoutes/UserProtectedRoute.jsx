import React from "react";
import { Outlet,Navigate } from "react-router-dom";

const UserProtectedRoute = ( {isAuth} ) => {
    
   return(
    isAuth()? <Outlet/> : <Navigate   to={"/login"}  /> 
   )
     
}
 
export default UserProtectedRoute;