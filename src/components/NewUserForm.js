import React, { useState } from "react";
import "../App.css";

const App = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const triggerCreateUser = (event) => {
    event.preventDefault();
    let userObj = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    props.handleCreateUser(userObj);
  };

  return (
    <div className="App" class="formContainer">
      <h1 class="formTitle">Create an Account</h1>
      <form onSubmit={triggerCreateUser} class="inputForm">
        <input
          type="text"
          placeholder="firstname"
          class="textInput"
          onChange={(event) => {
            setFirstname(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="lastname"
          class="textInput"
          onChange={(event) => {
            setLastname(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          class="textInput"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          class="textInput"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {props.toggleError ? (
          <h5 class="errorMsg">{props.errorMessage}</h5>
        ) : null}
        <input type="submit" value="Register" class="submitBtn" />
      </form>
    </div>
  );
};

export default App;
