import { Category } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Error from "../assets/Error.png";
import { CheckGoodScore, compareScoreFeedback } from "../hooks/CheckGoodScore";

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
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizInfo, setShowQuizInfo] = useState();
  const [showNavLinks, setShowNavlinks] = useState(false);

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
    setShowQuiz(false);
    setShowUpdatedProfileInfo(false);
    setShowProfileInfo(!showProfileInfo);
  };

  const toggleUpdateProfileInfo = async () => {
    handleShowProfile();
    setShowQuiz(false);
    setShowProfileInfo(false);
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
    const email = JSON.parse(localStorage.getItem("user")).email;
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
    if (!response.ok) {
    }
    if (response.ok) {
      setShowQuizInfo(json);
    }
  };

  const toggleShowQuiz = () => {
    setShowProfileInfo(false);
    setShowUpdatedProfileInfo(false);
    setShowQuiz(!showQuiz);
  };

  const allEqual = (arr) => {
    if (arr.length <= 1) {
      return true;
    } else {
      arr.every((v) => v === arr[0]);
    }
  };

  const displayCategory = (index) => {
    let arr = [];
    arr = showQuizInfo.map((quiz) =>
      quiz.quizData.map((category) => {
        return category.category;
      })
    );
    arr = arr[index];
    return arr;
  };

  useEffect(() => {
    handleShowQuizzes();
  }, []);

  return (
    <div className="profile-container">
      <div className="grid-container">
        {/* {showNavLinks ? ( */}
        <input type="checkbox" name="toggle" id="toggle" />
        <label htmlFor="toggle"></label>
        <div className="container"></div>
        <ul className="message">
          {/* <div
            onClick={() => setShowNavlinks(!showNavLinks)}
            className="menu-button"
          >
            ☰
          </div> */}
          <li
            className={`nav-li ${showQuiz ? "selected" : ""}`}
            onClick={toggleShowQuiz}
          >
            Quizzes
          </li>
          <li
            onClick={toggleShowProfileInfo}
            className={`nav-li ${showProfileInfo ? "selected" : ""}`}
          >
            Profile Info
          </li>
          <li
            className={`nav-li ${showUpdatedProfileInfo ? "selected" : ""}`}
            onClick={toggleUpdateProfileInfo}
          >
            Update
          </li>

          <li onClick={handleLogout} className="nav-li">
            Log Out
          </li>

          <li onClick={toggleShowDelete} className="delete-account-li nav-li">
            Delete Account
          </li>
        </ul>
        {/* ) : (
          <ul className="nav-container">
            <div
              onClick={() => setShowNavlinks(!showNavLinks)}
              className="menu-button"
            >
              ☰
            </div>
          </ul>
        )} */}

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
        {showQuiz ? (
          <div>
            {showQuizInfo.map((quiz, index) => {
              return (
                <div key={index} className="quiz-score">
                  <p className="category">
                    {allEqual(displayCategory(index))
                      ? `Category: ${displayCategory(index)[0]}`
                      : "Category: Random"}
                  </p>
                  <p>{CheckGoodScore(quiz.score)}%</p>
                  <p>{compareScoreFeedback(CheckGoodScore(quiz.score))}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
