import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  logout = () => {
    localStorage.clear();
  };

  render() {
    const linkStyle = {
      textDecoration: "none",
      color: "rgb(255, 255, 230)",
      position: "absolute",
      right: "6%"
    };
    const linkStyleHome = {
      textDecoration: "none",
      color: "rgb(255, 255, 230)",
      position: "absolute",
      left: "6%"
    };
    const role = localStorage.getItem("role");
    const homepath = `/${role}/home`

    return (
      <div className="header">
        <ul className="navbar">
          <li id="loggedin">
            Welcome, {localStorage.getItem("firstName")}{" "}
            {localStorage.getItem("lastName")}
          </li>
          <li>
            <Link to={homepath} style={linkStyleHome}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/" onClick={this.logout} style={linkStyle}>
              Log out
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Header);
