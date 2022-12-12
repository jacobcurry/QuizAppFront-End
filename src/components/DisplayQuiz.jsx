import React, { useState, useEffect } from "react";
import { decode } from "html-entities";
import { GenerateRandomMultipleChoice } from "../hooks/GenerateRandomMultipleChoice";

const DisplayQuiz = (props) => {
  const [correctAnswer] = useState(props.question.correct_answer);
  const [incorrectAnswers] = useState(props.question.incorrect_answers);
  const [userAnswer, setUserAnswer] = useState(null);
  const [multipleChoiceArray, setMultipleChoiceArray] = useState();

  useEffect(() => {
    if (props.question.type === "multiple")
      setMultipleChoiceArray(
        GenerateRandomMultipleChoice(incorrectAnswers, correctAnswer)
      );
  }, []);

  return (
    <div className="quiz-container">
      <div className="each-quiz">
        <div className="each-question">
          <p className="question-num">{props.index + 1}</p>
          <p className="category">Category: {props.question.category}</p>
          <p className="question">{decode(props.question.question)}</p>
          {props.question.type === "boolean" ? (
            <form>
              <label>True</label>
              <input
                onChange={(e) => setUserAnswer("True")}
                name={props.index}
                type="radio"
              />
              <label>False</label>
              <input
                onChange={(e) => setUserAnswer("False")}
                name={props.index}
                type="radio"
              />
            </form>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayQuiz;
