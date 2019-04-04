import React, { Component } from "react";
import { STUDENT } from "../../services/api";

class StudentCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

      const url = STUDENT + "grades/" + this.state.id;

      fetch(url, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              console.log("data:", data);
              this.setState({
                courses: data.coursesAndMarks,
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
    const categories = ["Course", "Marks"];
    console.log('this.state.marks:', this.state.marks);
    return (
      <div>
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
                    <span key={mark.id}> {mark.value}, </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudentCourses;
