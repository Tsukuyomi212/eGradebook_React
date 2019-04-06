import React, { Component } from "react";
import { TEACHER } from "../../services/api";

class AddMark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markValue: undefined
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    if (!currentUser) {
      this.props.history.push("/");
    }
  }

  handleSelectOption = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  };

  handleSubmit = event => {
    const { markValue } = this.state;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        Value: markValue
      })
    };

    const path =
      TEACHER +
      this.props.teacherId +
      "/student/" +
      this.props.studentId +
      "/course/" +
      this.props.courseId;

    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            console.log('data: ', data);
            this.setState({ errorMessage: "" });
            this.props.onAddMark(data.marks);
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
          <select
            name="markValue"
            value={this.state.markValue}
            onChange={this.handleSelectOption}
          >
            <option>Select mark</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <button
            type="submit"
            value="Create"
            className="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddMark;
