import React, { Component } from "react";
import { SUBJECTS } from "../../services/api";
import Header from "../common/Header";
import { Link } from "react-router-dom";

class UpdateSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectData: null
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
      const url = SUBJECTS + "/" + this.props.match.params.subjectId;

      fetch(url, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                subjectData: data
              })
            );
          } else {
            response.text().then(message => alert("Something is not right"));
          }
        })
        .catch(error => console.log(error));
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      subjectData: { ...this.state.subjectData, [name]: target.value }
    });
  };

  handleSubmit = event => {
    const { markValue } = this.state;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        Name: this.state.subjectData.name,
        Grade: this.state.subjectData.grade,
        ClassesPerWeek: this.state.subjectData.classesPerWeek
      })
    };

    const URL = SUBJECTS + "/" + this.props.match.params.subjectId;
    fetch(URL, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            alert("Subject successfully updated!");
            this.setState({ errorMessage: "" });
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
        <h3 className="courses_heading">Update subject</h3>
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
              name="grade"
              onChange={this.handleInputChange}
              value={this.state.grade}
            >
              <option>Select grade</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
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
            Update
          </button>
        </div>
      </div>
    );
  }
}

export default UpdateSubject;
