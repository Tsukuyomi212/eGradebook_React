import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { GETSTUDENTS } from "../../services/api";
import { Link } from "react-router-dom";

class StudentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      parent: {
        firstName: "",
        lastName: ""
      },
      schoolClass: {
        grade: 0,
        section: "",
        schoolYear: ""
      }
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

      const profileURL = GETSTUDENTS + "/" + this.props.match.params.id;

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
                parent: data.parent,
                schoolClass: data.schoolClass
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
    return (
      <div>
        <div className="home_background">
          <Header />
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
              <span>School Class: </span>
              {this.state.schoolClass.grade}/{this.state.schoolClass.section},{" "}
              {this.state.schoolClass.schoolYear}
            </p>
            <p>
              <span>Parent: </span>
              {this.state.parent.firstName} {this.state.parent.lastName}
            </p>
          </div>
          
          <div className="edit_details">
          <Link
              onClick={() =>
                this.props.history.push(
                  "/users/students/" + this.state.id + "/courses"
                )
              }
              style={{
                textDecoration: "none",
                color: "rgb(230, 172, 0)",
                fontSize: "20px"
              }}
            >
              See student's courses
            </Link>
            <br />
            <Link
              onClick={() =>
                this.props.history.push(
                  "/users/students/update/" + this.state.id
                )
              }
              style={{
                textDecoration: "none",
                color: "rgb(230, 172, 0)",
                fontSize: "20px"
              }}
            >
              Edit details
            </Link>
            <br />
            <Link
              to="/users/students"
              style={{
                textDecoration: "none",
                color: "rgb(230, 172, 0)",
                fontSize: "20px"
              }}
            >
              Back
            </Link>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default StudentDetails;
