import React, { Component } from "react";
import { COURSES } from "../../services/api";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import "./CoursesStyle.css";

class Courses extends Component {
  constructor() {
    super();
    this.state = { courses: [] };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };
    fetch(COURSES, requestOptions)
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
    const linkStyle = {
      textDecoration: "none",
      color: "rgb(220, 174, 29)",
      fontSize: "25px",
      fontWeight: "bold"
    };
    const categories = ["Id", "Course name", "Grade", "Classes per week", "Teacher"];
    return (
      <div>
        <Header />
        <div className="courses_links">
          <Link to="/admin/home" style={linkStyle}>Back to main menu</Link>
          <br/>
          <Link to="/subjects" style={linkStyle}>See all subjects</Link>
          <br/>
          <Link to="/courses/create" style={linkStyle}>Create new course</Link>
        </div>
        <div className="home_background">
          <h3 className="courses_heading">Courses: </h3>
          <div className="courses_list">
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
                    <td>{course.id}</td>
                    <td>{course.subject.name}</td>
                    <td>{course.subject.grade}</td>
                    <td>{course.subject.classesPerWeek}</td>
                    <td>{course.teacher.firstName} {course.teacher.lastName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
