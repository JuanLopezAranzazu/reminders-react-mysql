import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import CreateReminder from "./pages/CreateReminder";
import UpdateReminder from "./pages/UpdateReminder";
// helpers
import { AuthContext } from "./helpers/AuthContext";

const App = () => {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authenticated");
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  const logout = () => {
    sessionStorage.removeItem("authenticated");
    setAuthState(false);
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="navbar">
          <div className="links">
            {!authState ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/create-reminder">Create reminder</Link>
                <button onClick={() => logout()}>Logout</button>
              </>
            )}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-reminder" element={<CreateReminder />} />
          <Route path="/update-reminder/:id" element={<UpdateReminder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
