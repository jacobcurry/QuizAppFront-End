
import React, { useState, useEffect } from "react";

const Profile = (props) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showUpdatedProfileInfo, setShowUpdatedProfileInfo] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showUser, setShowUser] = useState([]);
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('')

  const handleLogout = () => {
    localStorage.removeItem("user");
    props.updateUser(null);
  };

  const toggleShowDelete = () => {
    setShowDelete(!showDelete);
  };
  // const toggleShowProfileInfo = () => {
  //   setShowProfileInfo(!showProfileInfo);
   
  // };

  const handleDeleteAccount = async () => {
    setShowDelete(false);
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `https://lit-anchorage-15647.herokuapp.com/${props.currentUser.email}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.removeItem("user");
      props.setCurrentUser(null);
    }
  };

  const handleShowProfile = async () => {
    setShowProfileInfo(false);
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `https://lit-anchorage-15647.herokuapp.com/${props.currentUser.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const json = await response.json();
    // console.log(json);
   setShowUser(json)
   console.log(json);

  }

  const toggleShowProfileInfo = () => {
    handleShowProfile()
    setShowProfileInfo(!showProfileInfo);
   
  };

  const toggleUpdateProfileInfo = () => {
    handleShowProfile()
    console.log(showUser);
    setUpdatedFirstName(showUser.firstname)
    setUpdatedLastName(showUser.lastname)
    setUpdatedEmail(showUser.email)
    setShowUpdatedProfileInfo(!showUpdatedProfileInfo);
   
  };

  const handleUpdatedProfileInfo = async () => {
   

    const response = await fetch(
      `https://lit-anchorage-15647.herokuapp.com/${props.currentUser.email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
       body:{
        firstname: updatedFirstName,
        lastname: updatedLastName,
        email: updatedEmail
      }
      }
    );
    const json = await response.json();
    console.log(json);
    
  }
  

  //   if (!response.ok) {
  //     setIsLoading(false);
  //     setError(json.error);
  //   }
  //   if (response.ok) {
  //     localStorage.getItem("user");
  //     props.setCurrentUser(null);
  //   }
  // }  
  
  // useEffect(() => {
  //   handleShowProfile()
  // },[])

  return (
    <div className="profile-container">
      <div className="grid-container">
        <ul className="nav-ul nav-container">
          <div className="top-nav">
            <li className="nav-li">Quizzes</li>
            <li
              onClick={ 
               toggleShowProfileInfo
              }
              className="nav-li"
            >
              Profile Info
            </li>
            <li className="nav-li" onClick={toggleUpdateProfileInfo}>Update</li>
          </div>
          <div>
            <li onClick={handleLogout} className="nav-li">
              Log Out
            </li>

            <li onClick={toggleShowDelete} className="delete-account">
              Delete Account
            </li>
          </div>
        </ul>

        {showDelete ? (
          <div className="modal-backdrop">
            <div className="delete-modal">
              <p className="delete-account-modal">Are You Sure?</p>
              <p className="delete-account-text">
                Delete user {props.currentUser.email}?
              </p>
              <button onClick={handleDeleteAccount} className="delete-btn">
                Delete Account
              </button>
            </div>
          </div>
        ) : null}
        {showProfileInfo ? <div className="profile-display">First Name: {showUser.firstname}<br/>Last Name: {showUser.lastname}<br/><span>Email:</span> {showUser.email}<br/></div> : null}
        {showUpdatedProfileInfo ?  <div className="update-profile-display">
  <form onSubmit={handleUpdatedProfileInfo}>
    <label>First Name: </label>
    <input type="text" id="fname" name="firstname" defaultValue={showUser.firstname} onChange={(e)=>{
      setUpdatedFirstName(e.target.value)
    }}></input>
          <br/>
    <label>Last Name: </label>
    <input type="text" id="lname" name="lastname" defaultValue={showUser.lastname}></input>
          <br/>
          <label>Email: </label>
    <input type="text" id="fname" name="firstname" defaultValue={showUser.email}></input>
          <br/>
    <input className='btn' type="submit" value="Submit"></input>
  </form>
</div>
: null}
      </div>
    </div>
  );
};

export default Profile;
