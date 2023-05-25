// Imports from React
import React from "react";

// Imports from react router dom
import { Outlet, Navigate } from "react-router-dom";

// Importing custom hook
import { useAuthStatus } from "../hooks/useAuthStatus";

// Importing Spinner component
import Spinner from "../Components/Spinner";

function PrivateRoute() {
  // Getting it from custom hook
  const { loggedin, checkingStatus } = useAuthStatus();
  // If checkingStatus is true returns a spinner
  if (checkingStatus) {
    return <Spinner />;
  }
  // If loggedin is true then render Outlet otherwise navigate to sign in
  return loggedin ? <Outlet></Outlet> : <Navigate to="/sign-in/" />;
}

export default PrivateRoute;
