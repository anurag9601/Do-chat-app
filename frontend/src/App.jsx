import React, { useContext, useEffect } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signin from "./pages/Signin/Signin";
import { Routes, Route, Navigate } from "react-router-dom";
import { contextApi } from "./context/Context";

const App = () => {
  const { authUser } = useContext(contextApi);

  // console.log(authUser)
  return (
    <div className="app-container">
      <div className="main-app-container">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signin />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
