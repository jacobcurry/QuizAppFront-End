import React, { useEffect, useState } from "react";
import { decode } from "html-entities";
import { GenerateRandomMultipleChoice } from "../hooks/GenerateRandomMultipleChoice";
const DisplayQuizAnswers = (props) => {
  const [correctAnswer] = useState(props.question.correct_answer);
  const [incorrectAnswers] = useState(props.question.incorrect_answers);
  const [multipleChoiceArray, setMultipleChoiceArray] = useState([]);

  useEffect(() => {
    if (props.question.type === "multiple") {
      setMultipleChoiceArray(
        GenerateRandomMultipleChoice(incorrectAnswers, correctAnswer)
      );
    }
    console.log(props.postedQuiz);
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
          <div className="true-false-form">
            <div className="true-false-div">
              <label className="boolean-title">
                <input className="radio" name={props.index} type="radio" />
                True
              </label>
            </div>
            <div className="true-false-div">
              <label className="boolean-title">
                <input className="radio" name={props.index} type="radio" />
                False
              </label>
            </div>
          </div>
        ) : (
          <div className="true-false-form">
            {props.postedQuiz.map.quizData((answer, index) => {
              return (
                <div key={index} className="true-false-div">
                  <label className="boolean-title">
                    <input name={props.index} className="radio" type="radio" />

                    {decode(answer)}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayQuizAnswers;
