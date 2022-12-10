import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [toggleShowForm, setToggleShowForm] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");

  const axiosInstance = axios.create({
    baseURL: `https://opentdb.com`,
    header: { "Access-Control-Allow_Origin": "*" },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (category === "any" && difficulty === "any") {
      const response = await axiosInstance.get(`api.php?amount=${amount}`);
      console.log(response);
    } else if (difficulty !== "any" && category === "any") {
      const response = await axiosInstance.get(
        `api.php?amount=${amount}&difficulty=${difficulty}`
      );
      console.log(response);
    } else if (category !== "any" && difficulty === "any") {
      const response = await axiosInstance.get(
        `api.php?amount=${amount}&category=${category}`
      );
      console.log(response);
    } else {
      const response = await axiosInstance.get(
        `api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
      );
      console.log(response);
    }
  };

  return (
    <div className="">
      <div className="">
        <p className="">Choose from many different options to create a quiz!</p>
        <button
          onClick={() => setToggleShowForm(!toggleShowForm)}
          className="btn"
        >
          {toggleShowForm ? "Hide Form" : "Get Started"}
        </button>
      </div>
      {toggleShowForm ? (
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
          <button className="btn" type="submit">
            Take Quiz
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default Home;
