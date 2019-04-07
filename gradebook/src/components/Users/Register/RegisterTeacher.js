import React, { Component } from "react";
import { REGISTER } from "../../../services/api";

class RegisterTeacher extends Component {
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

    const path = REGISTER + "/teacher";

    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.props.history.push("/users/teachers");
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
        <p>Teacher: </p>
        <form>
          <label>First Name: </label>
          <input
            type="text"
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
            placeholder="Enter last name"
            onChange={this.handleInputChange}
            value={this.state.lastName}
          />
          <br />
          <label>Username: </label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={this.handleInputChange}
            value={this.state.username}
          />
          <br />
          <label>E-mail: </label>
          <input
            type="text"
            name="email"
            placeholder="Enter e-mail"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
          <br />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={this.handleInputChange}
            value={this.state.password}
          />
          <br />
          <label>Confirm Password: </label>
          <input
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
          className="submit"
          onClick={this.handleSubmit}
        />
        <input
          type="button"
          value="Cancel"
          className="cancel"
          onClick={() => this.props.history.push("/users/teachers")}
        />
      </div>
    )
  }

}

export default RegisterTeacher;