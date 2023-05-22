import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {useAuthStatus} from "../hooks/useAuthStatus";
import Spinner from "../Components/Spinner"

function PrivateRoute() {
  const { loggedin, checkingStatus } = useAuthStatus();
    if(checkingStatus){
        return (
            <Spinner/>
        )
    }
  return loggedin ? <Outlet></Outlet> : <Navigate to="/sign-in/" />;
}

export default PrivateRoute;
