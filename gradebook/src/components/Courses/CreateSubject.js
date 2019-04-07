import React, {Component} from 'react';
import {SUBJECTS} from '../../services/api';

class CreateSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      grade: undefined,
      classesPerWeek: undefined
    }
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
            alert('Subject successfully created!')
            this.props.history.push("/courses");
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
          {/* <input
            type="number"
            name="grade"
            placeholder="Enter grade"
          ></input> */}
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
          value="Cancel"
          onClick={() => this.props.history.push("/courses")}
        />
      </div>
    )
  }
}

export default CreateSubject;