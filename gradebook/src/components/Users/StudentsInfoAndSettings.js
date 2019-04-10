import React, { Component } from "react";
import Header from "../common/Header";
//import Footer from "../common/Footer";
import { GETSTUDENTS } from "../../services/api";
import { Link } from "react-router-dom";
import "./Styles/UsersList.css";

class StudentsInfoAndSettings extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };
    fetch(GETSTUDENTS, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            data.sort(checkOrder);
            this.setState({ users: data });
          });
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const { history } = this.props;
    const linkStyle = {
      textDecoration: "none",
      color: "rgb(220, 174, 29)",
      fontSize: "25px",
      fontWeight: "bold"
    };
    return (
      <div>
        <Header />
        <div>
          <p className="user_list_heading">Students</p>
          <div className="links">
            <Link style={linkStyle} to="/users">
              Back to all users
            </Link>
            <br />
            <Link style={linkStyle} to="/users/students/registerwithparent">
              Student and parent registration
            </Link>
            <br />
            <Link style={linkStyle} to="/users/students/register">
              Student registration
            </Link>
          </div>
          <div className="users_list">
            {this.state.users.map(user => (
              <p key={user.id}>
                <span>
                  {user.lastName}, {user.firstName}
                </span>
                <button
                  className="details_button"
                  onClick={() => history.push("/users/students/" + user.id)}
                >
                  Student details
                </button>
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function checkOrder(a, b) {
  if (a.lastName > b.lastName) {
    return 1;
  } else if (a.lastName === b.lastName) {
    return a.firstName > b.firstName ? 1 : -1;
  } else {
    return -1;
  }
}

export default StudentsInfoAndSettings;
