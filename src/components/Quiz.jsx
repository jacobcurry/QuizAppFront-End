import React, { useState } from "react";
import DisplayQuiz from "./DisplayQuiz";
import { GetQuizData, GetNumInDB } from "../hooks/GetQuizData";
import Error from "../assets/Error.png";
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
        setIsLoading(false);
      } else {
        const numInDB = await GetNumInDB(category, difficulty);
        setError(
          `Sorry we only have ${numInDB} questions available for those search parameters`
        );
        setIsLoading(false);
      }
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
      ) : (
        <form>
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
              />
            );
          })}
          <button className="btn quiz-submit">Submit Quiz</button>
        </form>
      )}
    </div>
  );
};

export default Quiz;
