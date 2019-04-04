import React, { Component } from "react";
import { TEACHER } from "../../services/api";

class TeacherSchoolClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: "",
      section: "",
      schoolYearName: "",
      students: []
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
    const { teacherId, schoolClassId } = this.props.match.params;
    const path = TEACHER + teacherId + "/schoolclasses/" + schoolClassId;
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({
              grade: data.grade,
              section: data.section,
              schoolYearName: data.schoolYear.name,
              students: data.students
            });
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
        <h4>
          {this.state.grade} / {this.state.section} ({this.state.schoolYearName})
        </h4>
        {/* <h5>Subject: </h5> */}
        <ol>
          {this.state.students.map(student => (
            <li key={student.id}>{student.lastName}, {student.firstName}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default TeacherSchoolClass;
