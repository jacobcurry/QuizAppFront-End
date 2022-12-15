import { Category } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { decode } from "html-entities";
import Error from "../assets/Error.png";
import X from "../assets/X.png";
import { CheckGoodScore, compareScoreFeedback } from "../hooks/CheckGoodScore";
import { convertTimezone, convertDate } from "../hooks/ConvertTimeZone";
import { GenerateRandomMultipleChoice } from "../hooks/GenerateRandomMultipleChoice";
import DisplayQuizAnswers from "./DisplayQuizAnswers";

const Profile = (props) => {
  const [showProfileInfo, setShowProfileInfo] = useState(true);
  const [showUpdatedProfileInfo, setShowUpdatedProfileInfo] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showUser, setShowUser] = useState({});
  const [updatedFirstName, setUpdatedFirstName] = useState();
  const [updatedLastName, setUpdatedLastName] = useState();
  const [updatedEmail, setUpdatedEmail] = useState();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizInfo, setShowQuizInfo] = useState([]);
  const [showQuizIndex, setShowQuizIndex] = useState();
  const [showEachQuiz, setShowEachQuiz] = useState(false);
  const [userAnswerArr, setUserAnswerArr] = useState([]);

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
    setIsLoading(true);
    setError(null);

    const email = JSON.parse(localStorage.getItem("user")).email;

    const response = await fetch(
      `https://lit-anchorage-15647.herokuapp.com/${email}`,
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
    setShowEachQuiz(false);
    setShowProfileInfo(!showProfileInfo);
  };

  const toggleUpdateProfileInfo = async () => {
    handleShowProfile();
    setShowQuiz(false);
    setShowProfileInfo(false);
    setShowEachQuiz(false);
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
      handleUpdateEmailQuizzes(props.currentUser.email, updatedEmail);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(json));
      props.setCurrentUser(JSON.parse(localStorage.getItem("user")));
      setIsLoading(false);
      handleShowProfile();
      setShowUpdatedProfileInfo(false);
      setShowProfileInfo(true);
    }
  };
  const handleUpdateEmailQuizzes = async (emailParam, email) => {
    const response = await fetch(
      `https://lit-anchorage-15647.herokuapp.com/quiz/${emailParam}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log(json);
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

  const handleDeleteQuiz = async (id) => {
    const response = await fetch(
      `https://lit-anchorage-15647.herokuapp.com/quiz/${id}`,
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
    }
    if (response.ok) {
      handleShowQuizzes();
    }
  };

  const toggleShowQuiz = () => {
    setShowProfileInfo(false);
    setShowUpdatedProfileInfo(false);
    setShowEachQuiz(false);
    setShowQuiz(!showQuiz);
  };

  const toggleShowEachQuiz = (index) => {
    setShowQuizIndex(index);
    setShowQuiz(false);
    setShowEachQuiz(true);
  };

  const toggleBackToQuizzes = () => {
    setShowEachQuiz(false);
    setShowQuiz(true);
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

  const allEqual = (arr) => {
    if (arr.length <= 1) {
      return true;
    } else {
      return arr.every((v) => v === arr[0]);
    }
  };

  const getAverageScore = () => {
    let totalScore = 0;
    showQuizInfo.map((quiz, index) => {
      totalScore += CheckGoodScore(quiz.score);
    });
    let averageScore = parseInt(totalScore / showQuizInfo.length);
    return averageScore;
  };

  useEffect(() => {
    handleShowProfile();
    handleShowQuizzes();
  }, []);

  return (
    <div className="profile-container">
      <div className="grid-container">
        <input type="checkbox" name="toggle" id="toggle" />
        <label htmlFor="toggle"></label>
        <div className="container"></div>
        <ul className="message">
          <li
            onClick={toggleShowProfileInfo}
            className={`nav-li ${showProfileInfo ? "selected" : ""}`}
          >
            Profile Info
          </li>
          <li
            className={`nav-li ${showQuiz ? "selected" : ""}`}
            onClick={toggleShowQuiz}
          >
            Quizzes
          </li>
          <li
            className={`nav-li ${showUpdatedProfileInfo ? "selected" : ""}`}
            onClick={toggleUpdateProfileInfo}
          >
            Update Profile
          </li>

          <li onClick={handleLogout} className="nav-li">
            Log Out
          </li>

          <li onClick={toggleShowDelete} className="delete-account-li nav-li">
            Delete Account
          </li>
        </ul>

        {showDelete ? (
          <div className="modal-backdrop">
            <div className="delete-modal">
              <div className="delete-account-modal">
                Are You Sure?
                <img
                  onClick={() => setShowDelete(!showDelete)}
                  className="x x-img"
                  src={X}
                  alt="x"
                />
              </div>
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
            <p className="profile-info-title">Profile Information</p>
            <hr />
            <p className="profile-info-p">
              <span className="profile-span">First Name:</span>{" "}
              {showUser.firstname}
            </p>
            <p className="profile-info-p">
              <span className="profile-span">Last Name: </span>{" "}
              {showUser.lastname}
            </p>
            <p className="profile-info-p">
              <span className="profile-span">Email:</span> {showUser.email}
            </p>
            <p className="profile-info-p">
              <span className="profile-span">Quizzes Taken:</span>
              {showQuizInfo.length}
            </p>

            <p className="profile-info-p">
              <span className="profile-span">Average Score:</span>
              {getAverageScore() > 0 ? getAverageScore() : 0}%
            </p>
          </div>
        ) : null}
        {showUpdatedProfileInfo ? (
          <div className="update-profile-display">
            <form
              className="update-profile-form"
              onSubmit={handleUpdatedProfileInfo}
            >
              <label className="update-label">First Name: </label>
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
              <label className="update-label">Last Name: </label>
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
              <label className="update-label">Email: </label>
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
              {error && (
                <div className="error-msg">
                  <img className="error-img" src={Error} alt="error" />
                  <p> {error}</p>
                </div>
              )}
            </form>
          </div>
        ) : null}
        {showQuiz ? (
          showQuizInfo.length > 0 ? (
            <div>
              /
              <Link className="btn  another-quiz-profile-btn" to="/quiz">
                Take Another Quiz
              </Link>
              <div className="quiz-container">
                {showQuizInfo.map((quiz, index) => {
                  return (
                    <div key={index} className="quiz-score">
                      <p className="category">
                        {allEqual(displayCategory(index))
                          ? `Category: ${displayCategory(index)[0]}`
                          : "Category: Random"}
                      </p>
                      <p>Score: {CheckGoodScore(quiz.score)}%</p>

                      <p>
                        {convertTimezone(quiz.createdAt)},&nbsp;
                        {convertDate(quiz.createdAt)}
                      </p>
                      <div className="show-quiz-btns">
                        <button
                          onClick={() => toggleShowEachQuiz(index)}
                          className="btn show-quiz-btn"
                        >
                          See Quiz
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(quiz._id)}
                          className="btn delete-quiz show-quiz-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="no-quiz-div">
              <p className="no-quiz-p">
                Looks like you haven't taken a quiz yet...
              </p>
              <Link className="btn" to="/quiz">
                Take Quiz
              </Link>
            </div>
          )
        ) : null}
        {showEachQuiz ? (
          <div>
            <div className="feedback-div">
              <p className="quiz-results-p">Your Quiz Results</p>
              <hr />
              <p className="score-p">
                {CheckGoodScore(showQuizInfo[showQuizIndex].score)}% Correct
              </p>
              <p className="score-feedback-p">
                {compareScoreFeedback(
                  CheckGoodScore(showQuizInfo[showQuizIndex].score)
                )}
              </p>
            </div>
            <div className="quiz-data-display">
              {showQuizInfo[showQuizIndex].quizData.map((question, index) => {
                return (
                  <DisplayQuizAnswers
                    key={index}
                    index={index}
                    question={question}
                    postedQuiz={showQuizInfo}
                    userAnswerArr={showQuizInfo[showQuizIndex].userAnswers}
                  />
                );
              })}
              <div className="another-quiz-div">
                <button
                  onClick={toggleBackToQuizzes}
                  className="btn another-quiz-btn"
                >
                  Back To Quizzes
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
