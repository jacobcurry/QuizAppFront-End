import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NewUserForm from "./components/NewUserForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";

import "./App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const updateUser = (user) => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    console.log(currentUser);
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar updateUser={updateUser} currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route
            path="/quiz"
            element={
              localStorage.getItem("user") ? <Quiz /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={
              localStorage.getItem("user") ? (
                <Profile
                  updateUser={updateUser}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/" />
              ) : (
                <LoginForm updateUser={updateUser} />
              )
            }
          />

          <Route
            path="/signup"
            element={
              currentUser ? (
                <Navigate to="/" />
              ) : (
                <NewUserForm updateUser={updateUser} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
