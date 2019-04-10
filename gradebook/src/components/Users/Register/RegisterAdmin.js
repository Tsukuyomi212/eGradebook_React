import React, { Component } from "react";
import { REGISTER } from "../../../services/api";
import Header from "./../../common/Header";

class RegisterAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    if (!currentUser) {
      this.props.history.push("/");
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  };

  handleSubmit = event => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        Email: this.state.email,
        Username: this.state.username,
        Password: this.state.password,
        ConfirmPassword: this.state.confirmPassword
      })
    };

    const path = REGISTER + "/admin";

    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            alert("Admin successfully registered!")
            this.props.history.push("/users/admins");
          });
        } else {
          response
            .text()
            .then(message => this.setState({ errorMessage: message }));
        }
      })
      .catch(error => console.log(error));
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Header />
        <p className="registration_heading">Admin registration form </p>
        <form className="registration_form registration_font">
          <label>First Name: </label>
          <input
            className="input_data"
            type="text"
            name="firstName"
            placeholder="Enter first name"
            onChange={this.handleInputChange}
            value={this.state.firstName}
          />
          <br />
          <label>LastName: </label>
          <input
            className="input_data"
            type="text"
            name="lastName"
            placeholder="Enter last name"
            onChange={this.handleInputChange}
            value={this.state.lastName}
          />
          <br />
          <label>Username: </label>
          <input
            className="input_data"
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={this.handleInputChange}
            value={this.state.username}
          />
          <br />
          <label>E-mail: </label>
          <input
            className="input_data"
            type="text"
            name="email"
            placeholder="Enter e-mail"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
          <br />
          <label>Password: </label>
          <input
            className="input_data"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={this.handleInputChange}
            value={this.state.password}
          />
          <br />
          <label>Confirm Password: </label>
          <input
            className="input_data"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={this.handleInputChange}
            value={this.state.confirmPassword}
          />
          <br />
        </form>
        <input
          type="submit"
          value="Create"
          className="button button_submit"
          onClick={this.handleSubmit}
        />
        <input
          type="button"
          value="Cancel"
          className="button button_cancel"
          onClick={() => this.props.history.push("/users/admins")}
        />
      </div>
    );
  }
}

export default RegisterAdmin;
