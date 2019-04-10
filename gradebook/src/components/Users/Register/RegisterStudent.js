import React, { Component } from "react";
import { REGISTER } from "../../../services/api";
import Header from "../../common/Header";
import "../Styles/RegistrationForm.css";

class RegisterStudent extends Component {
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
        ConfirmPassword: this.state.confirmPassword,
      })
    };

    const path = REGISTER + "/student";

    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            alert("Student successfully registered!")
            this.props.history.push("/users/students");
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
        <p className="registration_heading">Student registration form </p>
        <form className="registration_form registration_font">
          <label>First Name: </label>
          <input
            type="text"
            className="input_data"
            name="firstName"
            placeholder="Enter first name"
            onChange={this.handleInputChange}
            value={this.state.firstName}
          />
          <br />
          <label>LastName: </label>
          <input
            type="text"
            name="lastName"
            className="input_data"
            placeholder="Enter last name"
            onChange={this.handleInputChange}
            value={this.state.lastName}
          />
          <br />
          <label>Username: </label>
          <input
            type="text"
            className="input_data"
            name="username"
            placeholder="Enter username"
            onChange={this.handleInputChange}
            value={this.state.username}
          />
          <br />
          <label>E-mail: </label>
          <input
            type="text"
            className="input_data"
            name="email"
            placeholder="Enter e-mail"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
          <br />
          <label>Password: </label>
          <input
            type="password"
            className="input_data"
            name="password"
            placeholder="Enter password"
            onChange={this.handleInputChange}
            value={this.state.password}
          />
          <br />
          <label>Confirm Password: </label>
          <input
            type="password"
            className="input_data"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={this.handleInputChange}
            value={this.state.confirmPassword}
          />
          <br />
        </form>
        <button
          className="button button_submit"
          type="submit"
          value="Create"
          onClick={this.handleSubmit}
        >
          Register student
        </button>
        <button
          className="button button_cancel"
          type="button"
          value="Cancel"
          onClick={() => this.props.history.push("/users/students")}
        >
          Cancel
        </button>
      </div>
    )
  }

}

export default RegisterStudent;