import React, { useState } from "react";
import DisplayQuiz from "./DisplayQuiz";
import DisplayQuizAnswers from "./DisplayQuizAnswers";
import { GetQuizData, GetNumInDB } from "../hooks/GetQuizData";
import { GetAllIndexes } from "../hooks/GetAllIndexes";
import { CheckGoodScore, compareScoreFeedback } from "../hooks/CheckGoodScore";
import Error from "../assets/Error.png";
import X from "../assets/X.png";
import { decode } from "html-entities";

const Quiz = (props) => {
  const [ShowForm, setShowForm] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [correctAnswersArr, setCorrectAnswersArr] = useState([]);
  const [userAnswerArr, setUserAnswerArr] = useState([]);
  const [score, setScore] = useState();
  const [showQuizScore, setShowQuizScore] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [postedQuiz, setPostedQuiz] = useState({});
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [displayQuiz, setDisplayQuiz] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const [response, json] = await GetQuizData(amount, category, difficulty);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      if (json.response_code === 0) {
        setQuizData(json.results);
        setShowForm(false);
        setDisplayQuiz(true);
        setIsLoading(false);
        json.results.map((question, index) => {
          setCorrectAnswersArr((oldArray) => [
            ...oldArray,
            question.correct_answer,
          ]);
          setUserAnswerArr((oldArray) => [...oldArray, null]);
        });
      } else {
        const numInDB = await GetNumInDB(category, difficulty);
        setError(
          `Sorry we only have ${numInDB} questions available for those search parameters`
        );
        setIsLoading(false);
      }
    }
  };

  const postQuiz = async () => {
    setCheckAnswers(false);
    setIsLoading(true);
    setError(false);
    const email = JSON.parse(localStorage.getItem("user")).email;
    const response = await fetch(
      "https://lit-anchorage-15647.herokuapp.com/quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          quizData,
          correctAnswers: correctAnswersArr,
          userAnswers: userAnswerArr,
          score,
        }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log(json.error);
    }
    if (response.ok) {
      setPostedQuiz(json);
      setDisplayQuiz(false);
      setShowQuizScore(true);
    }
  };

  const checkUserAnswers = (e) => {
    e.preventDefault();
    if (userAnswerArr.includes(null)) {
      setMissedQuestions(GetAllIndexes(userAnswerArr, null));
    } else {
      setMissedQuestions([]);
      let correctAnswers = 0;
      for (let i = 0; i < correctAnswersArr.length; i++) {
        if (correctAnswersArr[i] === userAnswerArr[i]) {
          correctAnswers++;
          setScore(`${correctAnswers}/${i + 1}`);
        } else {
          setScore(`${correctAnswers}/${i + 1}`);
        }
      }
      setCheckAnswers(true);
    }
  };

  return (
    <div>
      {ShowForm ? (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="numQuestions">Number of Questions:</label>
          <input
            name="numQuestions"
            type="number"
            min={1}
            max={50}
            defaultValue={10}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="category">Select a Category</label>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            name="category"
            className=""
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>{" "}
          </select>
          <label htmlFor="difficulty"></label>
          <select
            onChange={(e) => {
              setDifficulty(e.target.value);
            }}
            name="difficulty"
            className=""
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            disabled={isLoading ? true : false}
            className="btn"
            type="submit"
          >
            Take Quiz
          </button>
          {isLoading ? <div className="loader"></div> : ""}
          {error && (
            <div className="error-msg">
              <img className="error-img" src={Error} alt="error" />
              <p> {error}</p>
            </div>
          )}
        </form>
      ) : null}
      {displayQuiz ? (
        <form onSubmit={checkUserAnswers}>
          {quizData.map((question, index) => {
            return (
              <DisplayQuiz
                key={index}
                index={index}
                question={question}
                correctAnswersArr={correctAnswersArr}
                setCorrectAnswersArr={setCorrectAnswersArr}
                userAnswerArr={userAnswerArr}
                setUserAnswerArr={setUserAnswerArr}
                missedQuestions={missedQuestions}
              />
            );
          })}
          <button className="btn quiz-submit">Submit Quiz</button>
        </form>
      ) : null}
      {checkAnswers ? (
        <div className="modal-backdrop">
          <div className="delete-modal">
            <div className="send-quiz-div">
              <p className="send-quiz-modal">Are You Sure?</p>
              <img
                className="x"
                onClick={() => setCheckAnswers(false)}
                src={X}
                alt="x"
              />
            </div>
            <p className="delete-account-text">
              Double check your answers or submit if all your answers look good!
            </p>
            <button onClick={postQuiz} className="btn check-answers-btn">
              Submit Quiz
            </button>
          </div>
        </div>
      ) : null}
      {showQuizScore ? (
        <div>
          <p>Your Quiz Results</p>
          <p>{CheckGoodScore(score)}%</p>
          <p>{compareScoreFeedback(CheckGoodScore(score))}</p>
          {quizData.map((question, index) => {
            return (
              <DisplayQuizAnswers
                key={index}
                index={index}
                question={question}
                postedQuiz={postedQuiz}
                userAnswerArr={userAnswerArr}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
