import React, { Component } from "react";
import Header from "../common/Header";
//import Footer from "../common/Footer";
import { GETSTUDENTS } from "../../services/api";
import { Link } from "react-router-dom";
import './UsersList.css';

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
      textDecoration: 'none',
      color: 'rgb(230, 172, 0)'
    }
    return (
      <div>
        <Header />
        <div>
        <h4>Students</h4>
          <Link style={linkStyle} to="/users">Back to all users</Link>
          <br></br>
          <Link style={linkStyle} to="/users/students/register">Register a new student</Link>

          <div className="users_list">
          {this.state.users.map(user => (
            <p key={user.id}>
              <span>
                {user.lastName}, {user.firstName}
              </span>
              <button
               id="details_button"
                onClick={() => history.push("/users/students/" + user.id)} 
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

export default StudentsInfoAndSettings;
