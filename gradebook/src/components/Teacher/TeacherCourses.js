import React, { Component } from "react";
import { TEACHER } from "../../services/api";

class TeacherCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      id: localStorage.getItem("id")
    }
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };

    const path = TEACHER + this.state.id + '/courses';
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            data.sort();
            this.setState({ courses: data });
          });
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h4>Courses: </h4>
        <ul>
          {this.state.courses.map(course => (
            <li key={course.id}>
              {course.subject.name} / {course.subject.grade}. grade / Classes
              weekly: {course.subject.classesPerWeek}
            </li>
          ))}
          </ul>
      </div>
    )
  }
}

export default TeacherCourses;