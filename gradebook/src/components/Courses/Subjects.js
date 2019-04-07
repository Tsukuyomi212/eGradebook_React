import React, { Component } from "react";
import { SUBJECTS } from "../../services/api";

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: []
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
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.props.history.push('/subjects/create')}>Create new subject</button>
          <h3>Subjects: </h3>
          <ul>
            {this.state.subjects.map(subject => (
              <li key={subject.id}>
                {subject.name} (Grade: {subject.grade}, Classes per week:{" "}
                {subject.classesPerWeek}) 
                <button onClick={() => this.props.history.push(`/subjects/update/${subject.id}`)}>Update</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Subjects;
