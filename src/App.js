import React, { useState } from 'react'
import LoginForm from './LoginForm'
import NewUserForm from './NewUserForm'
import axios from 'axios'
import './App.css';


const App = () => {
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleLogout, setToggleLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const handleCreateUser = (userObj) => {
    axios.post('http://localhost:3001/createaccount', userObj).then((response) => {
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        setErrorMessage(response.data)
        setToggleError(true)
      }
    })
  }

  const handleLogin = (userObj) => {
      console.log(userObj);
    axios.put('http://localhost:3001/login', userObj).then((response) => {
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        console.log(response);
        setToggleError(true)
        setErrorMessage(response.data)
      }
    })
  }

  const handleLogout = () => {
    setCurrentUser({})
    handleToggleLogout()
  }

  const handleToggleForm = () => {
    setToggleError(false)
    if(toggleLogin === true) {
      setToggleLogin(false)
    } else {
      setToggleLogin(true)
    }
  }

  const handleToggleLogout = () => {
    if(toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }

  return (
    <div className="App">
      <div>
        {toggleLogout ?
          <button onClick={handleLogout} class='logoutBtn'>Logout</button> :
          <div class='appFormDiv'>
            {toggleLogin ?
            <LoginForm handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage}/>
            :
            <NewUserForm handleCreateUser={handleCreateUser} toggleError={toggleError} errorMessage={errorMessage}/>
            }
            <button onClick={handleToggleForm} class='accountBtn'>{toggleLogin ? 'Need an account?' : 'Already have an account?'}</button>
          </div>
        }


      </div>
      {currentUser.username ?
        <div class='loggedInDiv'>
          <h1>This entire div will only show if a user is currently logged in</h1>
          <h2>So you could show profile info, or whatever else you want to be authentication protected!</h2>
          <h3>And you could even stick other React components in here!</h3>
        </div>
        :
        null
      }
    </div>
  );
}

export default App;