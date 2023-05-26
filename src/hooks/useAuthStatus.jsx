// Imports from React
import { useEffect, useState } from "react";

// Imports from firebase auth
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuthStatus() {
  // login status by default false
  const [loggedin, setLoggedin] = useState(false);

  // Checking status by default true
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    // Performing user authentication
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // If user credentials are correct then login true else false
      if (user) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { loggedin, checkingStatus };
}
