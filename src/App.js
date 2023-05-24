import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import Offers from './Pages/Offers';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Components/PrivateRoute';
import CreateListing from './Pages/CreateListing';
import Category from './Pages/Category';

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
          <Route exact path='/category' element={<Category />} />
          <Route exact path='/offers' element={<Offers />} />
          <Route exact path='/create-listing' element={<PrivateRoute />}>
            <Route exact path='/create-listing' element={<CreateListing />} />
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
