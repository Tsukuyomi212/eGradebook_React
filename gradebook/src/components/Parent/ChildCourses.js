import React, { Component } from "react";
import {PARENT} from '../../services/api';
import Header from '../common/Header';

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
    const categories = ["Course", "Marks"];
    return (
      <div>
        <button onClick={() => this.props.history.push('/parent/home')}>Back</button>
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
      </div>
    )
  }
}

export default ChildGrades;