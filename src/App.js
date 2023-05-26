// CSS
import './App.css';

// Imports from react router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Imported Pages
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import Offers from './Pages/Offers';
import CreateListing from './Pages/CreateListing';
import EditListing from './Pages/EditListing';

// Imported Components
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';

// Importin ToastContainer from react-toastify
import { ToastContainer } from 'react-toastify';

// Importing toast's CSS
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/profile' element={<PrivateRoute />}>
            <Route exact path='/profile' element={<Profile />} />
          </Route>
          <Route exact path='/sign-in' element={<Signin />} />
          <Route exact path='/sign-up' element={<Signup />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/offers' element={<Offers />} />
          <Route exact path='/create-listing' element={<PrivateRoute />}>
            <Route exact path='/create-listing' element={<CreateListing />} />
          </Route>
          <Route exact path="/edit-listing" element={<PrivateRoute />}>
            <Route exact path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
