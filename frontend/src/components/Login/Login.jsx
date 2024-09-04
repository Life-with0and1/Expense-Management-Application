import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const url = "http://localhost:3000/api";

  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const change = (s) => {
    setData({
      name: "",
      email: "",
      password: "",
    });
    setState(s);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let response;
      const urlEndpoint = state === "Login" ? "/login" : "/register";
      const newURL = `${url}${urlEndpoint}`;

      response = await axios.post(newURL, data);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <h1>{state}</h1>
        {state === "Sign Up" ? (
          <input
            onChange={onChange}
            value={data.name}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        ) : (
          <></>
        )}

        <input
          onChange={onChange}
          name="email"
          value={data.email}
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={onChange}
          value={data.password}
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <button>{state}</button>
        {state === "Sign Up" ? (
          <div className="bottom">
            <input type="checkbox" required />
            <p>Terms & conditions accepted.</p>
          </div>
        ) : (
          <></>
        )}
        {state === "Login" ? (
          <h4>
            Create an account?
            <span onClick={() => change("Sign Up")}> Sign Up</span>
          </h4>
        ) : (
          <h4>
            Already have an account?{" "}
            <span onClick={() => change("Login")}> Login</span>
          </h4>
        )}
      </form>
    </div>
  );
}

export default Login;
