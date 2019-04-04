import React, { Component } from "react";
import { SUBJECTS, GETTEACHERS } from "../../services/api";

class CreateCourse extends Component {
  constructor (props) {
    super(props);
    this.state = {
      subjects: [],
      teachers: []
    }
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
 

  render() {
    return (
      <div>
        <h3>Create a new course</h3>
        <div>
          <form>
            <label>Select a subject: </label>
            <select>
             {this.state.subjects.map(subject => (
               <option key={subject.id}>{subject.name} / {subject.grade}. grade</option>
             ))}
            </select>
            <p>Or create a new subject: <button>Create subject</button></p>
            <label>Select a teacher: </label>
            <select>
            {this.state.teachers.map(teacher => (
               <option key={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
             ))}
            </select>
            <p>Or register a new teacher: <button>Register teacher</button></p>
          </form>
        </div>
        <button>Submit</button>
      </div>
    )
  }

}

export default CreateCourse;