import React, { useState, useEffect } from "react";
import Error from "../assets/Error.png";

const Profile = (props) => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showUpdatedProfileInfo, setShowUpdatedProfileInfo] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showUser, setShowUser] = useState({});
  const [updatedFirstName, setUpdatedFirstName] = useState();
  const [updatedLastName, setUpdatedLastName] = useState();
  const [updatedEmail, setUpdatedEmail] = useState();
  const [showQuiz, setShowQuiz] = useState(false)
  const [showQuizInfo, setShowQuizInfo] = useState()

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
    setShowUser(json);
    setUpdatedEmail(json.email);
    setUpdatedFirstName(json.firstname);
    setUpdatedLastName(json.lastname);
  };

  const toggleShowProfileInfo = () => {
    handleShowProfile();
    setShowUpdatedProfileInfo(false);
    setShowProfileInfo(!showProfileInfo);
  };

  const toggleUpdateProfileInfo = async () => {
    handleShowProfile();
    setShowUpdatedProfileInfo(!showUpdatedProfileInfo);
  };

  const handleUpdatedProfileInfo = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const response = await fetch(
      `https://lit-anchorage-15647.herokuapp.com/${props.currentUser.email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          firstname: updatedFirstName,
          lastname: updatedLastName,
          email: updatedEmail,
        }),
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(json));
      props.setCurrentUser(JSON.parse(localStorage.getItem("user")));
      setIsLoading(false);
    }
  };

  const handleShowQuizzes = async () => {
    const email = JSON.parse(localStorage.getItem('user')).email
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `https://lit-anchorage-15647.herokuapp.com/quiz/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
      
    const json = await response.json();
    if(!response.ok){
    console.log(json.error)
  }if(response.ok){
    setShowQuizInfo(json);
    console.log(json);
  }
    
  }

  const toggleShowQuiz = () => {
    
    setShowQuiz(!showQuiz)
  }

  useEffect(() => {
    handleShowQuizzes()
  },[])

  return (
    <div className="profile-container">
      <div className="grid-container">
        <ul className="nav-ul nav-container">
          <div className="top-nav">
            <li className="nav-li" onClick={toggleShowQuiz}>Quizzes</li>
            <li onClick={toggleShowProfileInfo} className="nav-li">
              Profile Info
            </li>
            <li className="nav-li" onClick={toggleUpdateProfileInfo}>
              Update
            </li>
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
        {showProfileInfo ? (
          <div className="profile-display">
            First Name: {showUser.firstname}
            <br />
            Last Name: {showUser.lastname}
            <br />
            <span>Email:</span> {showUser.email}
            <br />
          </div>
        ) : null}
        {showUpdatedProfileInfo ? (
          <div className="update-profile-display">
            <form
              className="update-profile-form"
              onSubmit={handleUpdatedProfileInfo}
            >
              <label className="">First Name: </label>
              <input
                className="profile-input"
                type="text"
                name="firstname"
                defaultValue={showUser.firstname}
                onChange={(e) => {
                  setUpdatedFirstName(e.target.value);
                }}
              ></input>
              <br />
              <label>Last Name: </label>
              <input
                className="profile-input"
                type="text"
                name="lastname"
                defaultValue={showUser.lastname}
                onChange={(e) => {
                  setUpdatedLastName(e.target.value);
                }}
              ></input>
              <br />
              <label>Email: </label>
              <input
                className="profile-input"
                type="text"
                name="firstname"
                defaultValue={showUser.email}
                onChange={(e) => {
                  setUpdatedEmail(e.target.value);
                }}
              ></input>
              <br />
              <input
                className="btn update-submit"
                type="submit"
                value="Submit"
              ></input>
            </form>
            {error && (
              <div className="error-msg">
                <img className="error-img" src={Error} alt="error" />
                <p> {error}</p>
              </div>
            )}
          </div>
        ) : null}
        {showQuiz ? ( <div className="quiz-score">
           {showQuizInfo.map((quiz, index) => {
            return(
            <div>
              <p>{quiz.score}</p>
            </div>
            )
           })}
          
          </div>
        ) : null}
      </div>

    </div>
  );
};

export default Profile;
