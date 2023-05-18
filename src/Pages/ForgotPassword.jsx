import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <section>
        <h1 className="text-center text-3xl font-semibold mt-6">
          Recover your Account
        </h1>
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
          <form action="">
            <input
              type="email"
              className="w-full text-xl px-4 py-2 bg-white text-gray-700 border-gray-300 rounded-lg transition ease-in-out"
              placeholder="Email Address"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
            <div className="flex justify-between mt-6">
              <p>
                Don't have an account?{" "}
                <b className="text-red-700">
                  <Link to={"/sign-up"}>Register</Link>
                </b>
              </p>
              <p className="text-blue-600">
                <Link to={"/sign-in"}>Sign In instead</Link>
              </p>
            </div>
          </form>
          <button
            className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase border rounded shadow-md hover:bg-blue-700 transition duration-150 mt-6 hover:shadow-lg active:bg-blue-800"
            type="submit "
          >
            Recover Account
          </button>
        </div>
      </div>
    </>
  );
}

export default Signin;
