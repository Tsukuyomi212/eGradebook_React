import React, { Component } from "react";
import {PARENT} from '../../services/api';
import Header from '../common/Header';
import { Link } from "react-router-dom";

class ChildGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      courses: [],
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

      const { studentId } = this.props.match.params;
      const url = PARENT + "grades/" + studentId;
      

      fetch(url, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.setState({
                courses: data.coursesAndMarks,
                firstName: data.studentFirstName,
                lastName: data.studentLastName
              });
            });
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
      color: "rgb(220, 174, 29)",
      fontSize: "25px",
      fontWeight: "bold"
    };
    const categories = ["Course", "Marks"];
    return (
      <div>
        <Header />
        <div className="courses_links">
        <Link to="/parent/home" style={linkStyle}>Back</Link>
        </div>
        
        <p id="name">
          <span className="student_font">Student:</span> {this.state.firstName}{" "}
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
                    <span key={mark.id}> {mark.value}, </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ChildGrades;