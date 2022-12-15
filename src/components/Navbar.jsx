import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const checkLocation = () => {
    if (window.location.pathname === "/profile") {
      window.location.reload();
    }
  };

  return (
    <div className="header">
      <Link className="home-link" to="/">
        <h1 className="quiz-title">
          ex<span className="title-color">QUIZ</span>ite
        </h1>
      </Link>
      <nav className="nav-header">
        <div className="header-nav-container">
          {props.currentUser ? (
            <div className="auth-div">
              <p className="hidden email-p">{props.currentUser.email}</p>
              <Link onClick={checkLocation} to="/profile" className="btn">
                Profile
              </Link>
            </div>
          ) : (
            <div className="auth-div ">
              <Link className="auth-link hidden-2" to="/login">
                Login
              </Link>
              <Link className="auth-link hidden-2" to="/signup">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
