import React, { Component } from "react";
import { SUBJECTS } from "../../services/api";
import Header from "../common/Header";
import { Link } from "react-router-dom";

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

  deleteSubject = id => {
    const path = SUBJECTS + '/' + id
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          this.setState({
            subjects: this.state.marks.filter(subject => subject.id !== id)
          });
          alert("Subject deleted!");
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const linkStyle = {
      textDecoration: "none",
      color: "rgb(220, 174, 29)",
      fontSize: "25px",
      fontWeight: "bold"
    };
    return (
      <div>
        <Header />
        <div className="courses_links">
          <Link to="/courses" style={linkStyle}>Back to Courses</Link>
          <br/>
          <Link to="/subjects/create" style={linkStyle}>Create new subject</Link>
        </div>
        <div>
          <h3 className="courses_heading">Subjects: </h3>
          <ul>
            {this.state.subjects.map(subject => (
              <li key={subject.id} className="subject_list">
                {subject.name} (Grade: {subject.grade}, Classes per week:{" "}
                {subject.classesPerWeek})
                <button
                  className="ok_button"
                  onClick={() =>
                    this.props.history.push(`/subjects/update/${subject.id}`)
                  }
                >
                  Update
                </button>
                <button 
                className="ok_button"
                onClick={() => this.deleteSubject(subject.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Subjects;
