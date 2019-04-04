import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
//import Footer from "../common/Footer";
import Header from "../common/Header";
import { ADMINS } from "../../services/api";
import "../common/ProfilePage.css";

class AdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      id: localStorage.getItem("id"),
      updateMode: false
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
      const profileURL = ADMINS + this.state.id;
      console.log('profileURL:', profileURL);

      fetch(profileURL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.userName,
                email: data.email
              })
            );
          } else {
            response.text().then(message => alert("message"));
          }
        })
        .catch(error => console.log(error));
    }
  }

  toggleUpdateMode = () => {
    this.setState({
      updateMode: true
    });
  };

  // handleInputChange = event => {
  //   const target = event.target;
  //   const name = target.name;

  //   this.setState({
  //     [name]: target.value
  //   });
  // };

  // handleSubmit = event => {
  //   const requestOptions = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer  " + localStorage.getItem("token")
  //     },
  //     body: JSON.stringify({
  //       firstName: this.state.firstName,
  //       lastName: this.state.lastName,
  //       username: this.state.username,
  //       email: this.state.email
  //     })
  //   };
  //   const path = ADMINPROFILE + this.state.id;
  //   fetch(path, requestOptions)
  //     .then(response => {
  //       if (response.ok) {
  //         response.json().then(data => {
  //           this.setState({ errorMessage: "", updateMode: false });
  //         });
  //       } else {
  //         response
  //           .text()
  //           .then(message => this.setState({ errorMessage: message }));
  //       }
  //     })
  //     .catch(error => console.log(error));
  //   event.preventDefault();
  // };

  render() {

      return (
        <div className="home_background" >
          <Header />
          <div className="profile_data">
            <p>
              <span className="data_font">First name:</span> {this.state.firstName}
            </p>
            <p>
              <span className="data_font">Last name:</span> {this.state.lastName}
            </p>
            <p>
              <span className="data_font">Username:</span> {this.state.username}
            </p>
            <p>
              <span className="data_font">E-mail:</span> {this.state.email}
            </p>
          </div>
          <div className="edit_details">
            <Link
              to='/admin/profile/update'
              onClick={this.toggleUpdateMode}
              style={{ textDecoration: "none", color: "rgb(230, 172, 0)", fontSize:"20px" }}
            >
              Edit details
            </Link>
            <br></br>
            <br></br>
            <Link
              to='/admin/home'
              style={{ textDecoration: "none", color: "rgb(230, 172, 0)", fontSize:"20px" }}
            >
              Back
            </Link>
          </div>
        </div>
      );
  
  }
}

export default withRouter(AdminProfile);
