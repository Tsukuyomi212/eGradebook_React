import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
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
            <Link to='/users'>Back to all users</Link>
            <br></br>
            <Link>Register new parent</Link>
          <p>Parents:</p>
          {this.state.users.map(user => (
            <p key={user.id}>
              <span>{user.lastName}, {user.firstName}</span>
              <button onClick={() => history.push('/users/parents/' + user.id)}>See Details</button>
            </p>
          ))}
        </div>
        <Footer />
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