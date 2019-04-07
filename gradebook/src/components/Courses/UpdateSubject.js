import React, { Component } from "react";
import { SUBJECTS } from "../../services/api";

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
      const url = SUBJECTS + '/' + this.props.match.params.subjectId;

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

    const URL = SUBJECTS + '/' + this.props.match.params.subjectId;
    fetch(URL, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            alert("Subject successfully updated!")
            this.setState({ errorMessage: ""});
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
    return (
      <div>
        <form>
          <label>Subject name: </label>
          <input
            type="text"
            name="name"
            placeholder="Enter subject name"
            onChange={this.handleInputChange}
            value={this.state.name}
          ></input>
          <br />
          <label>Grade: </label>
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
          <label>Number of classes per week: </label>
          <input
            type="number"
            name="classesPerWeek"
            placeholder="Enter number"
            onChange={this.handleInputChange}
            value={this.state.classesPerWeek}
          ></input>
        </form>
        <input
          type="submit"
          onClick={this.handleSubmit}
        />
        <input
          type="button"
          value="Back to Courses"
          onClick={() => this.props.history.push("/courses")}
        />
        <input
          type="button"
          value="Back to Subjects"
          onClick={() => this.props.history.push("/subjects")}
        />
      </div>
    )
  }
}

export default UpdateSubject;