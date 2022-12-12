import axios from "axios";
import React, { useState } from "react";

const Profile = (props) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    props.updateUser(null);
  };

  const toggleShowDelete = () => {
    setShowDelete(!showDelete);
  };
  const toggleShowProfileInfo = () => {
    setShowProfileInfo(!showProfileInfo);
  };

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

  return (
    <div className="profile-container">
      <div className="grid-container">
        <ul className="nav-ul nav-container">
          <div className="top-nav">
            <li className="nav-li">Quizzes</li>
            <li
              onClick={() => {
                setShowProfileInfo(!showProfileInfo);
              }}
              className="nav-li"
            >
              Profile Info
            </li>
            <li className="nav-li">Update</li>
          </div>

          <li onClick={toggleShowDelete} className="delete-account">
            Delete Account
          </li>
        </ul>

        {showDelete ? (
          <div className="modal-backdrop">
            <div className="delete-modal">
              <p className="delete-account-modal">Are You Sure?</p>
              <p className="delete-account-text">
                Delete user, {props.currentUser.email}?
              </p>
              <button onClick={handleDeleteAccount} className="delete-btn">
                Delete Account
              </button>
            </div>
          </div>
        ) : null}
        {showProfileInfo ? <div className="profile-display"></div> : null}
      </div>
    </div>
  );
};

export default Profile;
