import React, { Component } from "react";
import { SCHOOLCLASS } from "../../services/api";
import { SCHOOLYEARS } from "../../services/api";

class CreateSchoolClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: null,
      section: "",
      schoolYears: [],
      schoolYearId: null
    };
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

    fetch(SCHOOLYEARS, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            const realSchoolYears = data.filter(
              schoolYear => schoolYear.name !== "SchoolYear to be added"
            );
            if (realSchoolYears.length) {
              this.setState({
                schoolYears: realSchoolYears,
                schoolYearId: realSchoolYears[0].id
              });
            }
          });
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  };

  handleSchoolYearChange = e => {
    this.setState({
      schoolYearId: parseInt(e.target.value, 10)
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
        grade: this.state.grade,
        section: this.state.section
      })
    };

    fetch(SCHOOLCLASS, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            console.log("data:", data);
            const { id } = data;
            const requestOptions = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer  " + localStorage.getItem("token")
              }
            };
            fetch(
              `http://localhost:52940/api/schoolclass/${id}/schoolYear/${
                this.state.schoolYearId
              }`,
              requestOptions
            )
              .then(response => {
                if (response.ok) {
                  this.props.history.push("/schoolclasses");
                } else {
                  response
                    .text()
                    .then(message => this.setState({ errorMessage: message }));
                }
              })
              .catch(error => console.log(error));
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
          <label>Grade: </label>
          <input
            type="number"
            name="grade"
            placeholder="Enter grade"
            onChange={this.handleInputChange}
            value={this.state.grade}
          />
          <br />
          <label>Section: </label>
          <input
            type="text"
            name="section"
            placeholder="Enter section"
            onChange={this.handleInputChange}
            value={this.state.section}
          />
          <br />
          <label>School Year: </label>
          <select
            name="schoolYearId"
            value={this.state.schoolYearId}
            onChange={this.handleSchoolYearChange}
          >
            {this.state.schoolYears.map(schoolYear => {
              return (
                <option key={schoolYear.id} value={schoolYear.id}>
                  {schoolYear.name}
                </option>
              );
            })}
          </select>
        </form>
        <button
          type="submit"
          value="Create"
          className="submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          value="Cancel"
          className="cancel"
          onClick={() => this.props.history.push("/schoolclasses")}
        >
          Back
        </button>
      </div>
    );
  }
}

export default CreateSchoolClass;
