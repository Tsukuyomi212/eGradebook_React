import React, { Component } from "react";
import { GETPARENTS } from "../../services/api";
import Header from "../common/Header";

class ParentUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      id: this.props.match.params.id
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
      const profileURL = GETPARENTS + "/" + this.state.id;

      fetch(profileURL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                userData: data,
                id: data.id
              })
            );
          } else {
            response.text().then(message => alert("Something is not right"));
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
    console.log("requestOptions:", requestOptions);
    const path = GETPARENTS + "/" + this.state.id;
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

  goBack = () => this.props.history.push("/users/parents/" + this.state.id);

  render() {
    return (
      <div>
        <Header />
        <p className="page_heading">Update parent data</p>
        <div className="home_background">
          <form onSubmit={this.handleSubmit} className="registration_form">
            <p>
              <span className="update_data_font">First name:</span>
              <input
                placeholder={this.state.firstName}
                className="input_data"
                name="firstName"
                type="text"
                onChange={this.handleInputChange}
              />
            </p>
            <p>
              <span className="update_data_font">Last name:</span>
              <input
                placeholder={this.state.lastName}
                className="input_data"
                name="lastName"
                type="text"
                onChange={this.handleInputChange}
              />
            </p>
            <p>
              <span className="update_data_font">Username:</span>
              <input
                placeholder={this.state.username}
                className="input_data"
                name="userName"
                type="text"
                onChange={this.handleInputChange}
              />
            </p>
            <p>
              <span className="update_data_font">E-mail:</span>
              <input
                placeholder={this.state.email}
                className="input_data"
                name="email"
                type="text"
                onChange={this.handleInputChange}
              />
            </p>
            <button
              className="button"
              id="button_save_update"
              onClick={event => {
                this.handleSubmit(event);
                this.goBack(event);
              }}
            >
              Save changes
            </button>

            <button
              className="button"
              id="button_cancel_update"
              value="Cancel"
              onClick={this.goBack}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ParentUpdate;
