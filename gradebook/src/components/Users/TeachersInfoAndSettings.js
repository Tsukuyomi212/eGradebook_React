import React, { Component } from "react";
import Header from "../common/Header";
//import Footer from "../common/Footer";
import { GETTEACHERS } from "../../services/api";
import { Link } from "react-router-dom";
import "./Styles/UsersList.css";

class TeachersInfoAndSettings extends Component {
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
    fetch(GETTEACHERS, requestOptions)
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
          <div className="links">
            <Link to="/users" style={linkStyle}>
              Back to all users
            </Link>
            <br />
            <Link to="/users/teachers/register" style={linkStyle}>
              Register new teacher
            </Link>
          </div>
          <p className="user_list_heading">Teachers</p>

          <div className="users_list">
            {this.state.users.map(user => (
              <p key={user.id}>
                <span className="userNames">
                  {user.lastName}, {user.firstName}
                </span>
                <button
                  onClick={() => history.push("/users/teachers/" + user.id)}
                  className="details_button"
                >
                  See Details
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

export default TeachersInfoAndSettings;
