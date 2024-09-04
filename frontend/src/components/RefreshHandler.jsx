import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setAuth }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/authentication"
      ) {
        navigate("/home", { replace: false });
      }
    }
  }, [location, navigate, setAuth]);

  return null;
}

export default RefreshHandler;
