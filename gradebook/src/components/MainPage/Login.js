import React, { Component } from "react";
import { LOGIN } from "../../services/api";
import { createFormBody } from "../../services/helper";
import { withRouter } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      firstName: "",
      lastName: "", 
      id: ""
    };
  }

  handleInput = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  };

  handleSubmit = event => {
    let details = {
      username: this.state.username,
      password: this.state.password,
      grant_type: "password"
    };

    let data = createFormBody(details);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    };

    fetch(LOGIN, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {

            this.setState({
              errorMessage: "",
              firstName: data.name,
              lastName: data.surname,
              id: data.UserId
            });
           
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("id", data.UserId);
            localStorage.setItem("firstName", data.name);
            localStorage.setItem("lastName", data.surname);
            localStorage.setItem("role", data.role);
            if (data.role === "admin") {
              this.props.history.push("/admin/home");
            } else if (data.role === "teacher") {
              this.props.history.push("/teacher/home");
            } else if (data.role === "student") {
              this.props.history.push("/student/home");
            } else if (data.role === "parent") {
              this.props.history.push("/parent/home");
            } else {
              this.props.history.push("/notfound");
            }
          });
        } else {
          response
            .text()
            .then(message => this.setState({ errorMessage: message }));
            alert("Check your username and/or password")
        }
      })
      .catch(error => console.log(error));
    event.preventDefault();
  };

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <input
            className="login_input"
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={this.handleInput}
          />
          <br />
          <input
            className="login_input"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={this.handleInput}
          />
          <br />
          <input type="submit" value="Submit" className="login_submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
