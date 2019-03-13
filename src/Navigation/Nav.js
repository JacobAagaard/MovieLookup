import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../media/MovieLookup_transparent.png";

class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout, userHasScopes } = this.props.auth;
    return (
      <nav>
        <ul className="unstyled">
          <li>
            <Link to="/" className="unstyled">
              <img src={logo} alt="ML Logo" />
            </Link>
          </li>
          <li>
            <Link to="/about">About ML</Link>
          </li>
          {isAuthenticated() && (
            <li>
              <Link to="/public">Private</Link>
            </li>
          )}
          {isAuthenticated() && (
            <li>
              <Link to="/private">Private</Link>
            </li>
          )}
          {isAuthenticated() && userHasScopes(["read:courses"]) && (
            <li>
              <Link to="/course">Courses</Link>
            </li>
          )}
          <button onClick={isAuthenticated() ? logout : login}>
            {isAuthenticated() ? "Log Out" : "Log In"}
          </button>
        </ul>
      </nav>
    );
  }
}

export default Nav;
