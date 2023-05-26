// Imports from React
import React from "react";

// Imports from react router dom
import { useLocation, useNavigate } from "react-router-dom";

// Importing our custom hook
import { useAuthStatus } from "../hooks/useAuthStatus";

// Imports from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function Header() {
  // Initializing userLocation hook to location variable
  const location = useLocation();

  // Initializing userNavigate hook to navigate variable
  const navigate = useNavigate();

  // This function checks whether the path is equal to location
  const pathRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  // If user is logged in it will be true
  const { loggedin } = useAuthStatus();

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="realtor-logo"
            className="h-5 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`py-3 text-sm font-semibold cursor-pointer text-gray-600 border-b-4 border-b-transparent ${
                pathRoute("/") && "text-black border-b-red-700"
              }`}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm font-semibold cursor-pointer text-gray-600 border-b-4 border-b-transparent ${
                pathRoute("/offers") && "text-black border-b-red-700"
              }`}
              onClick={() => {
                navigate("/offers");
              }}
            >
              Offers
            </li>
            {loggedin ? (
              <li
                className={`py-3 text-sm font-semibold cursor-pointer text-gray-600 border-b-4 border-b-transparent ${
                  pathRoute("/profile") && "text-black border-b-red-700"
                }`}
                onClick={() => {
                  navigate("/profile");
                }}
              >
                {" "}
                Profile <FontAwesomeIcon icon={faUser} />
              </li>
            ) : (
              <li
                className={`py-3 text-sm font-semibold cursor-pointer text-gray-600 border-b-4 border-b-transparent ${
                  pathRoute("/sign-in") && "text-black border-b-red-700"
                }`}
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                {" "}
                Sign In
              </li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
