import React, { useContext, useState } from "react";
import "./../styles/Register.css";
import axios from "axios";
// routes
import { useNavigate } from "react-router-dom";
// context
import { AuthContext } from "./../helpers/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const register = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/auth/register", {
        email,
        username,
        password,
      })
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
    <div className="register">
      <form onSubmit={(event) => register(event)}>
        <input
          type="text"
          placeholder="Enter your email..."
          onChange={(event) => setEmail(event.target.value)}
        />
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
        <input type="submit" value="REGISTER" />
      </form>
    </div>
  );
};

export default Register;
