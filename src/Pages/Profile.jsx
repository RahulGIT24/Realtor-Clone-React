// Imports from React
import React, { useEffect, useState } from "react";

// Imports from firebase auth
import { getAuth, updateProfile } from "firebase/auth";

// Imports from react router dom
import { Link, useNavigate } from "react-router-dom";

// Importing toast from react-toastify
import { toast } from "react-toastify";

// Importing database
import { db } from "../firebase";

// Imports from firestore
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

// Imports from react icons
import { FcHome } from "react-icons/fc";

// Importing listingitem component
import ListingItem from "../Components/ListingItem";

function Profile() {
  // Initializing userNavigate hook to navigate variable
  const navigate = useNavigate();

  // Performing user authentication
  const auth = getAuth();

  // Settting form data by default it's user current name and email
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  // By default change details are false
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Destructuring name and email from formdata
  const { name, email } = formData;

  // This function is used to sign out the user
  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  // This function set's new value to form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // This function updates form data in database
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

  useEffect(() => {
    // This function fethces user listings
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  // This function deletes lsitings
  const onDelete = async (listingID) => {
    try {
      if (window.confirm("Are you sure you want to delete")) {
        await deleteDoc(doc(db, "listings", listingID));
        const updatedListings = await listings.filter(
          (listing) => listing.id !== listingID
        );
        setListings(updatedListings);
        toast.success("Listing Deleted Successfully....");
      }
    } catch (e) {
      console.log(e);
      toast.error("Can't Delete!!");
    }
  };

  // This function edits user listings
  const onEdit = async (listingID) => {
    try {
      navigate(`/edit-listing/${listingID}`);
    } catch (error) {
      toast.error("Can't Edit");
    }
  };
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-center text-3xl mt-6 font-semibold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
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
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center ">
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
      {!loading && listings.length > 0 && (
        <div className="max-w-6xl px-3 mt-6 mx-auto">
          <h2 className="text-2xl text-center font-semibold mb-6">
            My Listings
          </h2>
          <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {listings.map((listing, index) => {
              return (
                <ListingItem
                  key={index}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Profile;
