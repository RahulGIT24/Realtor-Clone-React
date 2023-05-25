// Imports from React
import React from "react";

// Importing google svg
import Google from "../Assets/google.ico";

// Importing toast from react-toastify
import { toast } from "react-toastify";

// Imports from firebase auth
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Importing db
import { db } from "../firebase";

// Imports from firestore
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

// Imports from react router dom
import { useNavigate } from "react-router-dom";

function OAuth() {
  // Initializing userNavigate hook to navigate variable
  const navigate = useNavigate();

  // This function enables user to authorize himself through google
  const onClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      const data = {
        name: user.displayName,
        email: user.email,
        timstamp: serverTimestamp(),
      };

      // If the account not already exists
      if (!docSnap.exists()) {
        await setDoc(docRef, data);
        navigate("/");
        toast.success("Authenticated Successfully");
      }
      navigate("/");
    } catch (error) {
      toast.error("Unable to authorize with Google!");
      console.log(error);
    }
  };
  return (
    <button
      className="w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase border rounded shadow-md hover:bg-red-600 transition duration-150 mt-6 hover:shadow-lg active:bg-red-700 flex justify-center items-center"
      onClick={onClick}
      type="button"
    >
      <img src={Google} alt="google" className="w-8 mx-2" />
      Continue with Google
    </button>
  );
}

export default OAuth;
