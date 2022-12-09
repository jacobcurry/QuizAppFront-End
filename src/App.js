import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import NewUserForm from "./components/NewUserForm";
import axios from "axios";
import "./App.css";

const App = () => {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [toggleError, setToggleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleLogout, setToggleLogout] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const axiosInstance = axios.create({
    baseURL: "https://lit-anchorage-15647.herokuapp.com/",
    header: { "Access-Control-Allow_Origin": "*" },
  });

  const handleCreateUser = async (userObj) => {
    const response = await axiosInstance.post("createaccount", userObj, {
      withCredentials: true,
    });
    console.log(response);
    // axios
    //   .post(
    //     "https://lit-anchorage-15647.herokuapp.com/createaccount",
    //     userObj,
    //     { withCredentials: true }
    //   )
    //   .then((response) => {
    //     console.log(response);
    // if (response.data) {
    //   console.log("hi");
    //   console.log(response);
    //   setCurrentUser(response.data);
    //   handleToggleLogout();
    // }
    //});
  };

  const handleLogin = async (userObj) => {
    const response = await axiosInstance.put("login", userObj, {
      withCredentials: true,
    });
    console.log(response);
    // console.log(userObj);
    // axios
    //   .put("https://lit-anchorage-15647.herokuapp.com/login", userObj, {
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.data.user) {
    //       console.log("hi");
    //       console.log(response);
    //       setCurrentUser(response.data.user);
    //       handleToggleLogout();
    //     }
    //   });
  };

  const handleLogout = () => {
    setCurrentUser({});
    handleToggleLogout();
  };

  const handleToggleForm = () => {
    setToggleError(false);
    if (toggleLogin === true) {
      setToggleLogin(false);
    } else {
      setToggleLogin(true);
    }
  };

  const handleToggleLogout = () => {
    if (toggleLogout) {
      setToggleLogout(false);
    } else {
      setToggleLogout(true);
    }
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
    <div className="App">
      <div>
        {toggleLogout ? (
          <button onClick={handleLogout} className="logoutBtn">
            Logout
          </button>
        ) : (
          <div className="appFormDiv">
            {toggleLogin ? (
              <LoginForm
                handleLogin={handleLogin}
                toggleError={toggleError}
                errorMessage={errorMessage}
                handleToggleForm={handleToggleForm}
              />
            ) : (
              <NewUserForm
                handleCreateUser={handleCreateUser}
                toggleError={toggleError}
                errorMessage={errorMessage}
                handleToggleForm={handleToggleForm}
              />
            )}
          </div>
        )}
      </div>
      {currentUser.email ? (
        <div className="loggedInDiv">
          <h1>
            This entire div will only show if a user is currently logged in
          </h1>
          <h2>
            So you could show profile info, or whatever else you want to be
            authentication protected!
          </h2>
          <h3>And you could even stick other React components in here!</h3>
        </div>
      ) : null}
    </div>
  );
};

export default App;