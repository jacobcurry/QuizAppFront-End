import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="home-container">
      <p className="">Choose from many different options to create a quiz!</p>
      {props.currentUser ? (
        <div>
          <Link className="btn" to="/quiz">
            Start a Quiz
          </Link>
        </div>
      ) : (
        <div>
          <Link className="btn" to="/login">
            Login
          </Link>
          <Link className="btn" to="/signup">
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
