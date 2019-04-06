import React, { Component } from "react";
import { TEACHER } from "../../services/api";

class UpdateMark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markValue: "Select mark"
    };
  }

  // componentDidMount() {
  //   if (localStorage.getItem("token") === null) {
  //     this.props.history.push("/");
  //   } else {
  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("token")
  //       }
  //     };
  //     const URL = TEACHER + this.props.teacherId + '/mark/' + this.props.markId;

  //     fetch(URL, requestOptions)
  //       .then(response => {
  //         if (response.ok) {
  //           response.json().then(data =>
  //             this.setState({
  //               markValue: data.markValue
  //             })
  //           );
  //         } else {
  //           response.text().then(message => alert("Something is not right"));
  //         }
  //       })
  //       .catch(error => console.log(error));
  //   }
  // }

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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        Value: markValue
      })
    };

    const URL = TEACHER + this.props.teacherId + "/mark/" + this.props.markId;
    fetch(URL, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ errorMessage: "", markValue: "Select mark" });
            this.props.onUpdateMark(data);
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
        <button className="submit" onClick={this.handleSubmit}>
          Submit
        </button>
        <button onClick={this.props.onCancel}>Cancel</button>
      </div>
    );
  }
}

export default UpdateMark;
