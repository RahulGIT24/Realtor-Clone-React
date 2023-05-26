// Imports from React
import React, { useState } from "react";

// Imports from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

// Imports from react router dom
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Importing OAuth Component
import OAuth from "../Components/OAuth";

// Imports from firebase auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Importing Database
import { db } from "../firebase";

// Importing from firestore of firebase
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

// Importing toast from react-toastify
import { toast } from "react-toastify";

function Signup() {
  // Initializing userNavigate hook to navigate variable
  const navigate = useNavigate();

  // Initializing from data as an object, by default it's empty
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // This state is used to see password in password input
  const [setpassword, showPassword] = useState(false);

  // Destructuring email, password and name from formData
  const { email, password, name } = formData;

  // This function setFormData
  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // This function is used when user wants to see the password he entered
  const handleClick = () => {
    if (setpassword === false) {
      showPassword(true);
    } else {
      showPassword(false);
    }
  };

  // This function is saving data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Performing user authentication
      const auth = getAuth();

      // Creating user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Updating profile by adding name
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;

      const formDataCopy = { ...formData };

      // Removing password from formData
      delete formData.password;
      // Adding timestamp to formData
      formData.timestamp = serverTimestamp();

      // Setting the document in firebase using setDoc
      await setDoc(doc(db, "users", user.uid), formData);

      // Navigating to home page
      navigate("/");
      toast.success("Successfully Signed Up");
    } catch (err) {
      toast.error("Something went wrong with the registeration");
    }
  };

  return (
    <>
      <section>
        <h1 className="text-center text-3xl font-semibold mt-6">Sign Up</h1>
      </section>
      <div className="flex flex-wrap justify-center items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            alt="login-signup"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full text-xl px-4 py-2 mb-4 bg-white text-gray-700 border-gray-300 rounded-lg transition ease-in-out"
              placeholder="Full Name"
              id="name"
              value={name}
              onChange={onChange}
              required
            />
            <input
              type="email"
              className="w-full text-xl px-4 py-2 bg-white text-gray-700 border-gray-300 rounded-lg transition ease-in-out"
              placeholder="Email Address"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
            <div className="relative">
              <input
                type={setpassword ? "text" : "password"}
                className="w-full mt-3 text-xl px-4 py-2 bg-white text-gray-700 mb-6 border-gray-300 rounded-lg transition ease-in-out"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
                required
              />
              {setpassword ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="absolute right-3 top-6 cursor-pointer text-xl "
                  onClick={handleClick}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className=" absolute right-3 top-6 cursor-pointer text-xl"
                  onClick={handleClick}
                />
              )}
            </div>
            <div className="flex justify-between">
              <p>
                Already have an account?{" "}
                <b className="text-red-700">
                  <Link to={"/sign-in"}>Sign In</Link>
                </b>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase border rounded shadow-md hover:bg-blue-700 transition duration-150 mt-6 hover:shadow-lg active:bg-blue-800"
              type="submit "
            >
              Sign Up
            </button>
          </form>
          <div className="my-4 flex  items-center before:border-t  before:flex-1  before:border-gray-500 after:border-t  after:flex-1  after:border-gray-500">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth />
        </div>
      </div>
    </>
  );
}

export default Signup;
