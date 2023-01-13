import React, { useContext, useState } from "react";
import "./../styles/Login.css";
import axios from "axios";
// routes
import { useNavigate } from "react-router-dom";
// context
import { AuthContext } from "./../helpers/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const login = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/auth/login", { username, password })
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          sessionStorage.setItem("authenticated", response.data.token);
          setAuthState(true);
          navigate("/");
        }
      });
  };

  return (
    <div className="login">
      <form onSubmit={(event) => login(event)}>
        <input
          type="text"
          placeholder="Enter your username..."
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={(event) => setPassword(event.target.value)}
        />
        <input type="submit" value="LOGIN" />
      </form>
    </div>
  );
};

export default Login;
