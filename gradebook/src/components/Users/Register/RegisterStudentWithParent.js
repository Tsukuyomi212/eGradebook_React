
import React, { Component } from "react";
import { REGISTER } from "../../../services/api";
import { GETPARENTS } from "../../../services/api";
//
class RegisterStudentWithParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      schoolClass: 0,
      username: "",
      password: "",
      confirmPassword: "",
      parentFirstName: "",
      parentLastName: "",
      parentEmail: "",
      parentUsername: "",
      parentPassword: "",
      parentConfirmPassword: "",
      parents: []
    };

  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    if (!currentUser) {
      this.props.history.push("/");
    }

    //for parent select
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
            this.setState({ parents: data })});
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
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
        SchoolClass: this.state.schoolClass,
        Username: this.state.username,
        Password: this.state.password,
        ConfirmPassword: this.state.confirmPassword,
        Parent: {
          FirstName: this.state.parentFirstName,
          LastName: this.state.parentLastName,
          Email: this.state.parentEmail,
          Username: this.state.parentUsername,
          Password: this.state.parentPassword,
          ConfirmPassword: this.state.parentConfirmPassword
        }
      })
    };

    const path = REGISTER + "/studentandparent";

    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
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
        <p>Student: </p>
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
        <br />
     
        <br />
        <p>Parent: </p>
        <form>
          <label>First Name: </label>
          <input
            type="text"
            name="parentFirstName"
            placeholder="Enter first name"
            onChange={this.handleInputChange}
            value={this.state.parentFirstName}
          />
          <br />
          <label>LastName: </label>
          <input
            type="text"
            name="parentLastName"
            placeholder="Enter last name"
            onChange={this.handleInputChange}
            value={this.state.parentLastName}
          />
          <br />
          <label>Username: </label>
          <input
            type="text"
            name="parentUsername"
            placeholder="Enter username"
            onChange={this.handleInputChange}
            value={this.state.parentUsername}
          />
          <br />
          <label>E-mail: </label>
          <input
            type="text"
            name="parentEmail"
            placeholder="Enter e-mail"
            onChange={this.handleInputChange}
            value={this.state.parentEmail}
          />
          <br />
          <label>Password: </label>
          <input
            type="password"
            name="parentPassword"
            placeholder="Enter password"
            onChange={this.handleInputChange}
            value={this.state.parentPassword}
          />
          <br />
          <label>Confirm Password: </label>
          <input
            type="password"
            name="parentConfirmPassword"
            placeholder="Confirm password"
            onChange={this.handleInputChange}
            value={this.state.parentConfirmPassword}
          />
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
          onClick={() => this.props.history.push("/users/students")}
        />
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

export default RegisterStudentWithParent;
