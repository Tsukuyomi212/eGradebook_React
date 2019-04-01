import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { ADMINPROFILE } from "../../services/api";

class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      id: localStorage.getItem("id")
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/");
    } else {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };
      const profileURL = ADMINPROFILE + this.state.id;

      fetch(profileURL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                userData: data
              })
            );
          } else {
            response.text().then(message => alert("Something went wrong"));
          }
        })
        .catch(error => console.log(error));
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      userData: { ...this.state.userData, [name]: target.value }
    });
  };

  handleSubmit = event => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        firstName: this.state.userData.firstName,
        lastName: this.state.userData.lastName,
        username: this.state.userData.userName,
        email: this.state.userData.email
      })
    };
    console.log('requestOptions:', requestOptions);
    const path = ADMINPROFILE + this.state.id;
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ errorMessage: "", updateMode: false });
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

  goBack = () => this.props.history.push("/admin/profile");

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>
            <span className="data_font">First name:</span>
            <input
              placeholder={this.state.firstName}
              name="firstName"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            <span className="data_font">Last name:</span>
            <input
              placeholder={this.state.lastName}
              name="lastName"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            <span className="data_font">Username:</span>
            <input
              placeholder={this.state.username}
              name="userName"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            <span className="data_font">E-mail:</span>
            <input
              placeholder={this.state.email}
              name="email"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <button onClick= {(event) => {this.handleSubmit(event); this.goBack(event)}}>
            Save changes
          </button>

          <button
            type="button"
            value="Cancel"
            onClick={this.goBack}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default ProfileUpdate;
