import React, { useEffect, useState } from "react";
import { decode } from "html-entities";
import { GenerateRandomMultipleChoice } from "../hooks/GenerateRandomMultipleChoice";
const DisplayQuizAnswers = (props) => {
  const [correctAnswer] = useState(props.question.correct_answer);
  const [incorrectAnswers] = useState(props.question.incorrect_answers);
  const [multipleChoiceArray, setMultipleChoiceArray] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.question.type === "multiple") {
      setMultipleChoiceArray(
        GenerateRandomMultipleChoice(incorrectAnswers, correctAnswer)
      );
    }
  }, []);

  return (
    <div className="each-quiz">
      <div className="each-question-answer">
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
              <div
                className={`showAnswerMultiple true-false-div ${
                  "True" === correctAnswer ? "correct-answer" : ""
                } ${
                  "True" === props.userAnswerArr[props.index]
                    ? "your-answer"
                    : ""
                }`}
              >
                True
                {"True" === props.userAnswerArr[props.index] ? (
                  <div className="arrow-correct">&#8592; Your Answer</div>
                ) : null}
              </div>
            </div>
            <div className="true-false-div">
              <p
                className={`showAnswerMultiple true-false-div ${
                  "False" === correctAnswer ? "correct-answer" : ""
                } ${
                  "False" === props.userAnswerArr[props.index]
                    ? "your-answer"
                    : ""
                }`}
              >
                False
                {"False" === props.userAnswerArr[props.index] ? (
                  <div className="arrow-correct">&#8592; Your Answer</div>
                ) : null}
              </p>
            </div>
          </div>
        ) : (
          <div className="true-false-form">
            {multipleChoiceArray.map((answer, index) => {
              return (
                <div
                  key={index}
                  className={`showAnswerMultiple true-false-div ${
                    answer === correctAnswer ? "correct-answer" : ""
                  } ${
                    answer === props.userAnswerArr[props.index]
                      ? "your-answer"
                      : ""
                  }`}
                >
                  <p className="answer-p">{decode(answer)}</p>
                  {answer === props.userAnswerArr[props.index] ? (
                    <div className="arrow-correct">&#8592; Your Answer</div>
                  ) : null}
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
