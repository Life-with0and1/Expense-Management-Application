import React, { useState } from "react";
import Login from "./components/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import RefreshHandler from "./components/RefreshHandler";

function App() {
  const [isAuth, setAuth] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuth ? element : <Navigate to={"/authentication"} />;
  };

  return (
    <div>
      <RefreshHandler setAuth={setAuth} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/authentication" />} />
        <Route path="/authentication" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
