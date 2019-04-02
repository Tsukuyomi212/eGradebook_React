import React, { Component } from "react";
import Header from "../common/Header";
//import Footer from "../common/Footer";
import { GETTEACHERS } from "../../services/api";
import { Link } from "react-router-dom";

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
            this.setState({ users: data })});
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
  }


  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <div>
        <div className="home_options">
            <Link to='/users'>Back to all users</Link>
            <br></br>
            <Link>Register new teacher</Link>
          <p>Teachers:</p>
          {this.state.users.map(user => (
            <p key={user.id}>
              <span>{user.lastName}, {user.firstName}</span>
              <button onClick={() => history.push('/users/teachers/' + user.id)}>See Details</button>
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
