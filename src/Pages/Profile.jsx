import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const logout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <section>
        <h1 className="text-center text-3xl mt-6 font-semibold">My Profile</h1>
        <div className="flex justify-center items-center mt-5 flex-col">
          <form>
            <input
              type="text"
              value={name}
              disabled
              className="w-full px-4 py-2 text-xl bg-white text-gray-700 border-gray-300 rounded transition ease-in-out"
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              disabled
              className="w-full mt-5 px-4 py-2 text-xl bg-white text-gray-700 border-gray-300 rounded transition ease-in-out"
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mt-6">
              <p>
                Do you want to change your name?
                <span className="text-red-600 cursor-pointer"> Edit</span>
              </p>
              <p className="text-red-600 cursor-pointer" onClick={logout}>Sign Out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
