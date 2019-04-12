import React, { Component } from "react";
import { TEACHER } from "../../services/api";

class TeacherCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      teacherId: localStorage.getItem("id")
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };

    const { teacherId } = this.state;
    const path = TEACHER + teacherId + "/courses";
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
        <p >
          <span className="teacher_profile_font">Teaches courses:</span>{" "}
          {this.state.courses.map(course => (
            <span key={course.id}>{course.subject.name} </span>
          ))}
        </p>
        <ul>
          {this.state.courses.map(course => (
            <li key={course.id}>
              {course.subject.name} / {course.subject.grade}. grade / Classes
              weekly: {course.subject.classesPerWeek}
              <ul>
                {course.schoolClasses.map(schoolClass => (
                  <li key={schoolClass.id}>
                    {schoolClass.grade} / {schoolClass.section}{" "}
                    <button
                    className="ok_button"
                      onClick={() =>
                        this.props.history.push(
                          `/teacher/${this.state.teacherId}/course/${course.id}/schoolclass/${schoolClass.id}`
                        )
                      }
                    >
                      See
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
//
export default TeacherCourses;
