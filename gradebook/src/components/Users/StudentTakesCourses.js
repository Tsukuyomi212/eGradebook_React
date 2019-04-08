import React, {Component} from 'react';
import {STUDENTCOURSES} from '../../services/api';
import {Link} from 'react-router-dom';

class StudentTakesCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: '',
      firstName: '',
      lastName: '',
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

      const url = STUDENTCOURSES + 'student/' + this.props.match.params.id;

      fetch(url, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              console.log("data:", data);
              this.setState({
                studentId: data.studentId,
                firstName: data.studentFirstName,
                lastName: data.studentLastName,
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
    const pathToManage= `/users/students/${this.state.studentId}/courses/manage`
    return (
      <div>
        <Link to={pathToManage}>Manage student's courses</Link>
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
    );
  }
}

export default StudentTakesCourses;