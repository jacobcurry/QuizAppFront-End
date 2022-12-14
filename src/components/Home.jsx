import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="home-container">
      {props.currentUser ? (
        <div className="home-div">
          <p className="">
            Welcome to &nbsp;
            <span className="p-title">
              ex<span className="title-p">QUIZ</span>ite
            </span>
            , filter quizzes by amount, category, and difficulty. Start a new
            quiz to see more!
          </p>
          <Link className="btn" to="/quiz">
            Start a Quiz
          </Link>
        </div>
      ) : (
        <div className="home-div">
          <p className="home-page-p">
            Welcome to{" "}
            <span className="p-title">
              ex<span className="title-p">QUIZ</span>ite
            </span>
            , Login or Signup to get the most out of our huge selection of
            quizzes!
          </p>
          <div className="home-login-btns">
            <Link className="btn login-btn" to="/login">
              Login
            </Link>
            <Link className="btn" to="/signup">
              Signup
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
