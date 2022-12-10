import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import NewUserForm from "./components/NewUserForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";

import "./App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  axios.defaults.headers.common["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  const axiosInstance = axios.create({
    baseURL: "https://lit-anchorage-15647.herokuapp.com/",
    header: { "Access-Control-Allow_Origin": "*" },
  });

  const handleCreateUser = async (userObj) => {
    // const response = await axiosInstance.post("createaccount", userObj, {
    //   withCredentials: true,
    // });
    // console.log(response);
    axios
      .post(
        "https://lit-anchorage-15647.herokuapp.com/createaccount",
        userObj,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        if (response.data) {
          console.log("hi");
          console.log(response);
          setCurrentUser(response.data);
        }
      });
  };

  const handleLogin = async (userObj) => {
    //   const response = await axiosInstance.put("login", userObj, {
    //     withCredentials: true,
    //   });
    //   console.log(response);
    // console.log(userObj);
    axios
      .put("https://lit-anchorage-15647.herokuapp.com/login", userObj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.data.user) {
          console.log("hi");
          console.log(response);
          setCurrentUser(response.data.user);
        }
      });
  };

  useEffect(() => {
    axios
      .get("https://lit-anchorage-15647.herokuapp.com/", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />

          <Route
            path="/login"
            element={<LoginForm handleLogin={handleLogin} />}
          />

          <Route
            path="/signup"
            element={<NewUserForm handleCreateUser={handleCreateUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
