import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <header className="header">
      <Link className="home-link" to="/">
        <h1 className="quiz-title">Quiz</h1>
      </Link>
      <nav className="nav">
        <div className="nav-container">
          {props.currentUser ? (
            <div className="auth-div">
              <p className="email-p">{props.currentUser.email}</p>
              <Link to="/profile" className="btn">
                Profile
              </Link>
            </div>
          ) : (
            <div className="auth-div">
              <Link className="auth-link" to="/login">
                Login
              </Link>
              <Link className="auth-link" to="/signup">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
