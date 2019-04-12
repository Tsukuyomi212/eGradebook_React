import React, { Component } from "react";
import { SUBJECTS } from "../../services/api";
import Header from "../common/Header";
import { Link } from "react-router-dom";

class CreateSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      grade: undefined,
      classesPerWeek: undefined
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    if (!currentUser) {
      this.props.history.push("/");
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

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
      },
      body: JSON.stringify({
        Name: this.state.name,
        Grade: this.state.grade,
        ClassesPerWeek: this.state.classesPerWeek
      })
    };

    fetch(SUBJECTS, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            alert("Subject successfully created!");
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
          <Link to="/subjects" style={linkStyle}>Back to Subjects</Link>
        </div>
        <h3 className="courses_heading">Create new subject</h3>
        <div className="create-form">
          <form>
            <label className="blue_font">Subject name: </label>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Enter subject name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            <br />
            <label className="blue_font">Grade: </label>
            <select
            className="input"
              name="grade"
              onChange={this.handleInputChange}
              value={this.state.grade}
            >
              <option>Select grade</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            <br />
            <label className="blue_font">Number of classes per week: </label>
            <input
            className="input"
              type="number"
              name="classesPerWeek"
              placeholder="Enter number"
              onChange={this.handleInputChange}
              value={this.state.classesPerWeek}
            />
          </form>
          <br />
          <button onClick={this.handleSubmit} className="button create_space">
            Create
          </button>
          
        </div>
      </div>
    );
  }
}

export default CreateSubject;
