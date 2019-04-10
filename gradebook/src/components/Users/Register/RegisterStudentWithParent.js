
import React, { Component } from "react";
import { REGISTER } from "../../../services/api";
import "../Styles/RegistrationForm.css";
import Header from "../../common/Header";
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
            alert("Student and parent successfully registered!")
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
        <p className="registration_heading">Student and parent registration form </p>
        <form className="registration_form registration_font">
          <p>Student:</p>
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
            type="text"
            className="input_data"
            name="lastName"
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
        <p>Parent: </p>
        
          <label>First Name: </label>
          <input
            type="text"
            className="input_data"
            name="parentFirstName"
            placeholder="Enter first name"
            onChange={this.handleInputChange}
            value={this.state.parentFirstName}
          />
          <br />
          <label>LastName: </label>
          <input
            type="text"
            className="input_data"
            name="parentLastName"
            placeholder="Enter last name"
            onChange={this.handleInputChange}
            value={this.state.parentLastName}
          />
          <br />
          <label>Username: </label>
          <input
            type="text"
            className="input_data"
            name="parentUsername"
            placeholder="Enter username"
            onChange={this.handleInputChange}
            value={this.state.parentUsername}
          />
          <br />
          <label>E-mail: </label>
          <input
            type="text"
            className="input_data"
            name="parentEmail"
            placeholder="Enter e-mail"
            onChange={this.handleInputChange}
            value={this.state.parentEmail}
          />
          <br />
          <label>Password: </label>
          <input
            type="password"
            className="input_data"
            name="parentPassword"
            placeholder="Enter password"
            onChange={this.handleInputChange}
            value={this.state.parentPassword}
          />
          <br />
          <label>Confirm Password: </label>
          <input
            type="password"
            className="input_data"
            name="parentConfirmPassword"
            placeholder="Confirm password"
            onChange={this.handleInputChange}
            value={this.state.parentConfirmPassword}
          />
        </form>
        <button
          className="button button_submit"
          type="submit"
          value="Create"
          onClick={this.handleSubmit}
        >
          Register Student and parent
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
    );
  }
}


export default RegisterStudentWithParent;
