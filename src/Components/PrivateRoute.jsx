import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {useAuthStatus} from "../hooks/useAuthStatus";

function PrivateRoute() {
  const { loggedin, checkingStatus } = useAuthStatus();
    if(checkingStatus){
        return (
            <h3>Loading...</h3>
        )
    }
  return loggedin ? <Outlet></Outlet> : <Navigate to="/sign-in/" />;
}

export default PrivateRoute;
