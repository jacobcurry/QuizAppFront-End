import React, { useState } from "react";
import "../App.css";

const App = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const triggerLogin = (event) => {
    event.preventDefault();
    let userObj = {
      email: email,
      password: password,
    };
    props.handleLogin(userObj);
  };

  return (
    <div className="formContainer">
      <h1 className="formTitle">Login</h1>
      <form onSubmit={triggerLogin} className="inputForm">
        <input
          type="text"
          placeholder="email"
          className="textInput"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          className="textInput"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {props.toggleError ? (
          <h5 className="errorMsg">{props.errorMessage}</h5>
        ) : null}
        <input type="submit" value="Login" className="submitBtn" />
      </form>
    </div>
  );
};

export default App;
