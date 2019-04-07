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
      color: "black"
    };
    const role = localStorage.getItem("role");
    const homepath = `/${role}/home`

    return (
      <div className="header">
        <ul className="navbar">
          <li id="loggedin">
            Logged in as: {localStorage.getItem("firstName")}{" "}
            {localStorage.getItem("lastName")}
          </li>
          <li>
            <Link to={homepath} style={linkStyle}>
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
