import React, { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import GetLocation from "./components/GetLocation/GetLocation";
import PoliceMain from "./components/Police/PoliceMain";
import { StoreContext } from "./context/StoreContext";
import Homemain from "./components/Home/Homemain";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { token } = useContext(StoreContext);

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <div className="app-boundary">
        <Navbar setShowLogin={setShowLogin} />
        <hr />
        <Routes>
          <Route path='/' element={<Homemain />} />
          <Route path='/capture' element={<FaceRecognition />} />
          <Route path='/latest-locations' element={<GetLocation />} />
          <Route
            path='/dashboard/*'
            element={token ? <PoliceMain /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
