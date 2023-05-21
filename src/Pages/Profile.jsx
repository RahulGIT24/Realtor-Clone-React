import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [changeDetail, setChangeDetail] = useState(false);

  const { name, email } = formData;

  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Updating displayname in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });

        toast.success("Profile Details Updated");
      }
    } catch (error) {
      toast.error("Unable to update profile update");
    }
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
              disabled={!changeDetail}
              onChange={onChange}
              id="name"
              className={`w-full px-4 py-2 text-xl bg-white text-gray-700 border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 text-xl mt-5 bg-white text-gray-700 border-gray-300 rounded transition ease-in-out"
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mt-6">
              <p>
                Do you want to change your name?
                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevstate) => !prevstate);
                  }}
                >
                  {changeDetail ? " Apply Change" : " Edit"}
                </span>
              </p>
              <p className="text-red-600 cursor-pointer" onClick={logout}>
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
