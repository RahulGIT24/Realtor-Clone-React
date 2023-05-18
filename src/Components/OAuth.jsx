import React from "react";
import Google from "../Assets/google.ico";

function OAuth() {
  return (
    <button className="w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase border rounded shadow-md hover:bg-red-600 transition duration-150 mt-6 hover:shadow-lg active:bg-red-700 flex justify-center items-center">
      <img src={Google} alt="google" className="w-8 mx-2" />
      Continue with Google
    </button>
  );
}

export default OAuth;
