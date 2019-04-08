import React, {Component} from 'react';
import { COURSES } from "../../services/api";

class ManageStudentsCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
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
    return (
      <div>
        <div>
          <h3>Courses: </h3>
          {this.state.courses.map(course => (
            <p key={course.id}>
              {course.subject.name} / {course.subject.grade}. grade / Classes
              weekly: {course.subject.classesPerWeek} / Teacher:{" "}
              {course.teacher.firstName} {course.teacher.lastName}
            </p>
          ))}
        </div>
  
        <button onClick={() => this.props.history.push(`/users/students/${this.props.match.params.id}/courses`)}>
          Back
        </button>
      </div>
    );
  }
}

export default ManageStudentsCourses;