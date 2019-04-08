import React, { Component } from "react";
import { STUDENTCOURSES } from "../../services/api";
import { Link } from "react-router-dom";
import { COURSES } from "../../services/api";

class StudentTakesCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      firstName: "",
      lastName: "",
      courses: [],
      allCourses: [],
      aCourseId: undefined,
      aCourse: undefined
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

      const url = STUDENTCOURSES + "student/" + this.props.match.params.id;

      fetch(url, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.setState({
                studentId: data.studentId,
                firstName: data.studentFirstName,
                lastName: data.studentLastName,
                courses: data.coursesAndMarks
              });
            });
          } else {
            response.text().then(message => alert("message"));
          }
        })
        .catch(error => console.log(error));

      fetch(COURSES, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              data.sort();
              this.setState({ allCourses: data });
            });
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
  }

  handleSelectOption = event => {
    const { target } = event;
    const { name } = target;

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
      }
    };

    const path =
    STUDENTCOURSES +
    "student/" +
    this.state.studentId +
    "/course/" +
    this.state.aCourseId;
    console.log('path: ', path);
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          alert("ok");
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
    const categories = ["Course", "Marks"];
    const pathBackToStudentDetails = `/users/students/${this.state.studentId}`;
    return (
      <div>
        <button
          onClick={() => this.props.history.push(pathBackToStudentDetails)}
        >
          Back
        </button>
        <p id="name">
          <span className="pretty_font">Student:</span> {this.state.firstName}{" "}
          {this.state.lastName}
        </p>
        <table className="student_courses">
          <thead>
            <tr>
              {categories.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map(course => (
              <tr key={course.id}>
                <td>{course.courseName}</td>
                <td>
                  {course.marks.map(mark => (
                    <span key={mark.id}> {mark.value} </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <p>Add more courses: </p>
          <select
            onChange={this.handleSelectOption}
            value={this.state.aCourseId}
            name="aCourseId"
          >
            <option>Select a course from list</option>
            {this.state.allCourses.map(aCourse => (
              <option key={aCourse.id} value={aCourse.id}>
                {aCourse.subject.name} / {aCourse.subject.grade}. grade /{" "}
                {aCourse.teacher.firstName} {aCourse.teacher.lastName}
              </option>
            ))}
          </select>
          <button onClick={this.handleSubmit}>Add</button>
        </div>
      </div>
    );
  }
}

export default StudentTakesCourses;
