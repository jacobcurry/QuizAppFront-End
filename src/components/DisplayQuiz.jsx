import React, { useState, useEffect } from "react";
import { decode } from "html-entities";
import { GenerateRandomMultipleChoice } from "../hooks/GenerateRandomMultipleChoice";

const DisplayQuiz = (props) => {
  const [correctAnswer] = useState(props.question.correct_answer);
  const [incorrectAnswers] = useState(props.question.incorrect_answers);
  const [userAnswer, setUserAnswer] = useState(null);
  const [multipleChoiceArray, setMultipleChoiceArray] = useState([]);

  useEffect(() => {
    if (props.question.type === "multiple") {
      setMultipleChoiceArray(
        GenerateRandomMultipleChoice(incorrectAnswers, correctAnswer)
      );
    }
  }, []);

  return (
    <div className="each-quiz">
      <div className="each-question">
        <div className="question-num">
          <p className="question-num-p">{props.index + 1}.</p>
          <p className="category-name">
            <span className="category">Category: </span>
            {props.question.category}
          </p>
        </div>
        <hr />
        <p className="question">{decode(props.question.question)}</p>
        {props.question.type === "boolean" ? (
          <form className="true-false-form">
            <div className="true-false-div">
              <label className="boolean-title">True</label>
              <input
                className="radio"
                onChange={(e) => setUserAnswer("True")}
                name={props.index}
                type="radio"
              />
            </div>
            <div className="true-false-div">
              <label className="boolean-title">False</label>
              <input
                className="radio"
                onChange={(e) => setUserAnswer("False")}
                name={props.index}
                type="radio"
              />
            </div>
          </form>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default DisplayQuiz;
