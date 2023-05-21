import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

export function useAuthStatus() {
  const [loggedin, setLoggedin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedin(true);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { loggedin, checkingStatus };
}
