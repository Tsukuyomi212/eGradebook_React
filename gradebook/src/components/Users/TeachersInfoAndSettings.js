import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
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
          response.json().then(data => this.setState({ users: data }));
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
            <Link to='/admin/users'>Back to all users</Link>
            <Link>Register new teacher</Link>
          <p>Teachers:</p>
          {this.state.users.map(user => (
            <p key={user.id}>
              <span>{user.lastName}, {user.firstName}</span>
              <button onClick={() => history.push('/admin/users/teachers/' + user.id)}>See Details</button>
            </p>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default TeachersInfoAndSettings;
