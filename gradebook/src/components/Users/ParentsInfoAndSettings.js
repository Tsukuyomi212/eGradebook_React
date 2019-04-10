import React, { Component } from "react";
import Header from "../common/Header";
import { GETPARENTS } from "../../services/api";
import { Link } from "react-router-dom";

class ParentsInfoAndSettings extends Component {
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
    fetch(GETPARENTS, requestOptions)
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
          </div>
          <br />
          {/* <Link>Register new parent</Link> */}
          <p className="user_list_heading">Parents</p>
          <div className="users_list">
            {this.state.users.map(user => (
              <p key={user.id}>
                <span>
                  {user.lastName}, {user.firstName}
                </span>
                <button
                  className="details_button"
                  onClick={() => history.push("/users/parents/" + user.id)}
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

export default ParentsInfoAndSettings;
