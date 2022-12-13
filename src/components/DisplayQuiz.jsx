import React, { useState, useEffect } from "react";
import { decode } from "html-entities";
import { GenerateRandomMultipleChoice } from "../hooks/GenerateRandomMultipleChoice";

const DisplayQuiz = (props) => {
  const [correctAnswer] = useState(props.question.correct_answer);
  const [incorrectAnswers] = useState(props.question.incorrect_answers);
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
          <div className="true-false-form">
            <div className="true-false-div">
              <label className="boolean-title">
                <input
                  className="radio"
                  onChange={(e) =>
                    props.setUserAnswerArr((oldArray) => [...oldArray, "True"])
                  }
                  name={props.index}
                  type="radio"
                />
                True
              </label>
            </div>
            <div className="true-false-div">
              <label className="boolean-title">
                <input
                  className="radio"
                  onChange={(e) =>
                    props.setUserAnswerArr((oldArray) => [...oldArray, "False"])
                  }
                  name={props.index}
                  type="radio"
                />
                False
              </label>
            </div>
          </div>
        ) : (
          <div className="true-false-form">
            {multipleChoiceArray.map((answer, index) => {
              return (
                <div key={index} className="true-false-div">
                  <label className="boolean-title">
                    <input
                      name={props.index}
                      className="radio"
                      type="radio"
                      onChange={(e) => {
                        props.setUserAnswerArr((oldArray) => [
                          ...oldArray,
                          decode(answer),
                        ]);
                        props.setCorrectAnswersArr((oldArray) => [
                          ...oldArray,
                          decode(correctAnswer),
                        ]);
                      }}
                    />
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

export default DisplayQuiz;
