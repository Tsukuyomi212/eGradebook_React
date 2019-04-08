import React, { Component } from "react";
import { SUBJECTS, GETTEACHERS, COURSES } from "../../services/api";

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      teachers: [],
      subjectId: undefined,
      teacherId: ""
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    if (!currentUser) {
      this.props.history.push("/");
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };

    fetch(SUBJECTS, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            data.sort();
            this.setState({ subjects: data });
          });
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));

    fetch(GETTEACHERS, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            data.sort();
            this.setState({ teachers: data });
          });
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
  }

  handleSelectOption = event => {
    const { target } = event;
    console.log("target: ", target);
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
    const { teacherId, subjectId } = this.state;
    const url = COURSES + "/teacher/" + teacherId + "/subject/" + subjectId;
    fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            alert("Course successfully created!");
          });
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
    console.log(this.state);
    return (
      <div>
        <h3>Create a new course</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Subject: </label>
            <select
              onChange={this.handleSelectOption}
              value={this.state.subject}
              name="subjectId"
            >
              <option>Select a subject</option>
              {this.state.subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} / {subject.grade}. grade
                </option>
              ))}
            </select>
            <p>
              Or create a new subject:{" "}
              <button
                onClick={() => this.props.history.push("/subjects/create")}
              >
                Create subject
              </button>
            </p>
            <label>Teacher: </label>
            <select
              onChange={this.handleSelectOption}
              value={this.state.teacher}
              name="teacherId"
            >
              <option>Select a teacher</option>
              {this.state.teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
            <p>
              Or register a new teacher:{" "}
              <button
                onClick={() =>
                  this.props.history.push("/users/teachers/register")
                }
              >
                Register teacher
              </button>
            </p>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCourse;
