import React from "react";
import { Outlet,Navigate } from "react-router-dom";

const AdminProtectedRoute = ( {isAuth} ) => {
    
   return(
    isAuth()? <Outlet/> : <Navigate   to={"/admin"}  /> 
   )
     
}
 
export default AdminProtectedRoute;