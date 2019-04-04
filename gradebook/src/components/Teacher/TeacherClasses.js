import React, { Component } from "react";
import { TEACHER } from "../../services/api";

class TeacherClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolClasses: [],
      id: localStorage.getItem("id")
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

    const path = TEACHER + this.state.id + '/schoolclasses';
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            const realClassses = data.filter(schoolClass => schoolClass.grade !== 0 && schoolClass.section !==0);
            this.setState({ schoolClasses: realClassses });
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
        <h2>School Classes</h2>
        {this.state.schoolClasses.map(schoolClass => (
          <p key={schoolClass.id}>
            {schoolClass.grade} / {schoolClass.section} (
            {schoolClass.schoolYear})
            <span>
              <button
                onClick={() =>
                  this.props.history.push('/teacher/schoolclass')
                }
              >
                Select
              </button>
            </span>
          </p>
        ))}
      </div>
    );
  }
}

export default TeacherClasses;
