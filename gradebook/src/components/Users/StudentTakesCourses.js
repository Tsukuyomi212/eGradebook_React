import React, { Component } from "react";
import { STUDENTCOURSES } from "../../services/api";
import { Link } from "react-router-dom";
import { COURSES } from "../../services/api";
import Header from "../common/Header";
import "./Styles/StudentCourses.css";

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
    console.log("path: ", path);
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
    const linkStyle = {
      textDecoration: "none",
      color: "rgb(220, 174, 29)",
      fontSize: "25px",
      fontWeight: "bold"
    };
    const categories = ["Course", "Marks"];
    const pathBackToStudentDetails = `/users/students/${this.state.studentId}`;
    return (
      <div>
        <Header />
        <div className="home_background">
          <div className="links">
            <Link to={pathBackToStudentDetails} style={linkStyle}>
              Back to student profile
            </Link>
          </div>
          <p id="name">
            <span className="yellow_font">Student:</span>{" "}
            <span id="student_name">
              {this.state.firstName} {this.state.lastName}
            </span>
          </p>
          <div className="table_courses">
            <table>
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
                        <span key={mark.id}> {mark.value}, </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="select_courses">
            <p className="yellow_font">Add more courses: </p>
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
            <button onClick={this.handleSubmit} className="select_button">
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentTakesCourses;
