import React, { Component } from "react";
import { REGISTER } from "../../../services/api";

class RegisterStudentAndParent extends Component {
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
      parent: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
      }
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
          FirstName: this.state.parent.firstName,
          LastName: this.state.parent.lastName,
          Email: this.state.parent.email,
          Username: this.state.parent.username,
          Password: this.state.parent.password,
          ConfirmPassword: this.state.parent.confirmPassword
        }
      })
    };

    const path = REGISTER + '/studentandparent';

    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ errorMessage: "" });
            this.props.history.push("/admin/students");
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
                  <input type="text" name="firstName" placeholder="Enter first name" onChange={this.handleInputChange}></input>
                  <br />
                  <label>LastName: </label>
                  <input type="text" name="lastName" placeholder="Enter last name" onChange={this.handleInputChange}></input>
                  <br />
                  <label>Username: </label>
                  <input type="text" name="username" placeholder="Enter username" onChange={this.handleInputChange}></input>
                  <br />
                  <label>E-mail: </label>
                  <input type="text" name="email" placeholder="Enter e-mail" onChange={this.handleInputChange}></input>
                  <br />
                  <label>Password: </label>
                  <input type="password" name="password" placeholder="Enter password" onChange={this.handleInputChange}></input>
                  <br />
                  <label>Confirm Password: </label>
                  <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={this.handleInputChange}></input>
                  <br />
              </form>
              <br />
              <p>Parent: </p>
              <form>
                  <label>First Name: </label>
                  <input type="text" name="parent.firstName" placeholder="Enter first name" onChange={this.handleInputChange}></input>
                  <br />
                  <label>LastName: </label>
                  <input type="text" name="parent.lastName" placeholder="Enter last name" onChange={this.handleInputChange}></input>
                  <br />
                  <label>Username: </label>
                  <input type="text" name="parent.username" placeholder="Enter username" onChange={this.handleInputChange}></input>
                  <br />
                  <label>E-mail: </label>
                  <input type="text" name="parent.email" placeholder="Enter e-mail" onChange={this.handleInputChange}></input>
                  <br />
                  <label>Password: </label>
                  <input type="password" name="parent.password" placeholder="Enter password" onChange={this.handleInputChange}></input>
                  <br />
                  <label>Confirm Password: </label>
                  <input type="password" name="parent.confirmPassword" placeholder="Confirm password" onChange={this.handleInputChange}></input>
              </form>
              <input type="submit" value="Create" className="submit" onClick={this.handleSubmit}/>
                <input type="button" value="Cancel" className="cancel" onClick={()=>this.props.history.push("/admin/students")} />
          </div>
      )
  }
}

export default RegisterStudentAndParent;
