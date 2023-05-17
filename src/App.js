import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import Offers from './Pages/Offers';
import Header from './Components/Header';


function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/sign-in' element={<Signin />} />
          <Route exact path='/sign-up' element={<Signup />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/offers' element={<Offers />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
