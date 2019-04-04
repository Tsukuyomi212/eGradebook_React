import React, { Component } from "react";
import { TEACHER } from "../../services/api";

class TeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      id: localStorage.getItem("id"),
      courses: []
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
      const profileURL = TEACHER + 'profile/' + this.state.id;

      fetch(profileURL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.userName,
                email: data.email,
                courses: data.teacherTeachesCourses
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
        <p>
          <span>First name:</span> {this.state.firstName}
        </p>
        <p>
          <span>Last name:</span> {this.state.lastName}
        </p>
        <p>
          <span>Username:</span> {this.state.username}
        </p>
        <p>
          <span>E-mail:</span> {this.state.email}
        </p>
        <p>Courses:</p>
        <ul>
          {this.state.courses.map(course => (
            <li key={course.id}>{course.courseName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TeacherProfile;
