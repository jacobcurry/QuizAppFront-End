import React, { useState, useEffect } from "react";
import { decode } from "html-entities";

decode("&quot; &#039;");

const DisplayQuiz = (props) => {
  const [correctAnswer] = useState(props.question.correct_answer);
  const [incorrectAnswers] = useState(props.question.incorrect_answers);
  const [userAnswer, setUserAnswer] = useState(null);

  const randNum = () => {
    return Math.floor(Math.random() * 4);
  };
  const [mulitpleChoiceArray, setMultipleChoiceArray] = useState(
    incorrectAnswers.splice(randNum(), 0, correctAnswer)
  );

  useEffect(() => {}, []);

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
