
import React, { useState, useEffect } from "react";

const Profile = (props) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showUser, setShowUser] = useState([]);
  const [updatedFirstName, setUpdatedFirstName] = useState();
  const [updatedLastName, setUpdatedLastName] = useState();
  const [updatedEmail, setUpdatedEmail] = useState()

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
  }

  const toggleShowProfileInfo = () => {
    handleShowProfile()
    setShowProfileInfo(!showProfileInfo);
   
   
  };

  const handleUpdatedProfileInfo = async () => {
    setUpdatedFirstName();
    setUpdatedLastName();
    setUpdatedEmail();

    const response = await fetch(
      `https://lit-anchorage-15647.herokuapp.com/${props.currentUser.email}`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        firstname: updatedFirstName,
        lastname: updatedLastName,
        email: updatedEmail
      }
    );
    const json = await response.json();
    console.log(json);
    setUpdatedFirstName(json)
    setUpdatedLastName(json)
    setUpdatedEmail(json)
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
  // },[count])

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
            <li className="nav-li" onClick={handleUpdatedProfileInfo}>Update</li>
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
      </div>
    </div>
  );
};

export default Profile;
