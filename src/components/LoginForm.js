import React, { useState } from 'react'
import './App.css';

const App = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const triggerLogin = (event) => {
    event.preventDefault()
    let userObj = {
      username: username,
      password: password
    }
    props.handleLogin(userObj)
  }


  return (
    <div className="formContainer">
      <h1 class='formTitle'>Login</h1>
      <form onSubmit={triggerLogin} class='inputForm'>
        <input type='text' placeholder='username' class='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
        <input type='password' placeholder='password' class='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
        {props.toggleError ?
          <h5 class='errorMsg'>{props.errorMessage}</h5>
          :
          null
        }
        <input type='submit' value='Login' class='submitBtn'/>
      </form>
    </div>
  );
}

export default App;