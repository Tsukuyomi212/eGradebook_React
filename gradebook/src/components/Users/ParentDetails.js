import React, { Component } from "react";
import Header from "../common/Header";
import { GETPARENTS } from "../../services/api";
import { Link } from "react-router-dom";

class ParentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      children: []
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

      const profileURL = GETPARENTS + "/" + this.props.match.params.id;

      fetch(profileURL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.userName,
                email: data.email,
                children: data.children
              })
            );
          } else {
            response.text().then(message => alert("message"));
          }
        })
        .catch(error => console.log(error));
    }
  }



  render() {
    const linkStyle = {
      textDecoration: "none",
      color: "rgb(175, 71, 60)",
      fontSize: "20px",
      fontWeight: "bold"
    };

    return (
      <div>
        <div className="home_background">
          <Header />
          <p className="page_heading">Parent profile</p>
          <div className="profile_data">
            <p>
              <span className="data_font">First name: </span>{" "}
              {this.state.firstName}
            </p>
            <p>
              <span className="data_font">Last name: </span>{" "}
              {this.state.lastName}
            </p>
            <p>
              <span className="data_font">Username: </span>{" "}
              {this.state.username}
            </p>
            <p>
              <span className="data_font">E-mail: </span> {this.state.email}
            </p>
            <p>
              <span className="data_font">Children: </span>
            </p>
            <ul>
              {this.state.children.map(child => (
                <li key={child.id} className="courses_list">
                  {child.firstName} {child.lastName}
                </li>
              ))}
            </ul>
          </div>
          <div className="edit_details">
            <Link
              onClick={() =>
                this.props.history.push(
                  "/users/parents/update/" + this.state.id
                )
              }
              style={linkStyle}
            >
              Edit details
            </Link>
            <br />
            <Link
              to="/users/parents"
              style={linkStyle}
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ParentDetails;
