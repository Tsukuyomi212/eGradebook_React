import React, { Component } from "react";
import { SCHOOLCLASS, SCHOOLYEARS } from "../../services/api";

class SchoolClassDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: null,
      section: "",
      schoolYearName: "",
      schoolYearStartDate: "",
      schoolYearEndDate: "",
      students: [],
      schoolYears: [],
      schoolYearId: undefined
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

      const classURL = SCHOOLCLASS + "/" + this.props.match.params.id;

      fetch(classURL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                id: data.id,
                grade: data.grade,
                section: data.section,
                schoolYearId: data.schoolYear.id,
                schoolYearName: data.schoolYear.name,
                schoolYearStartDate: data.schoolYear.startDate,
                schoolYearEndDate: data.schoolYear.endDate,
                students: data.students
              })
            );
          } else {
            response.text().then(message => alert("Something went wrong..."));
          }
        })
        .catch(error => console.log(error));

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
  }

  handleSchoolYearChange = e => {
    console.log("e.target.value:", e.target.value);
    this.setState({
      schoolYearId: parseInt(e.target.value, 10)
    });
  };

  handleAddSchoolYear = event => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };

    fetch(
      `http://localhost:52940/api/schoolclass/${this.state.id}/schoolYear/${
        this.state.schoolYearId
      }`,
      requestOptions
    )
      .then(response => {
        if (response.ok) {
          alert("School year updated successfully.");
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
        <div>
          <p>
            <span>School Class: </span>
            {this.state.grade} / {this.state.section}
            <span>
              <button>Edit</button>
            </span>
          </p>
          <p>
            <span>School Year: </span>
            {this.state.schoolYearName}
          </p>
          {this.state.schoolYearName !== "SchoolYear to be added" ? (
            <p>Change school year: </p>
          ) : (
            <p>Add school year: </p>
          )}
          <select
            name="schoolYearId"
            value={this.state.schoolYearId}
            onChange={this.handleSchoolYearChange}
          >
            {/* {this.state.schoolYearName === "SchoolYear to be added" && (
              <option key={-1} value={-1}>
                TBA
              </option>
            )} */}

            {this.state.schoolYears.map(schoolYear => {
              return (
                <option key={schoolYear.id} value={schoolYear.id}>
                  {schoolYear.name}
                </option>
              );
            })}
          </select>
          <button className="submit" onClick={this.handleAddSchoolYear}>
            Ok
          </button>
          <p>
            <span>Students: </span>
          </p>
          {this.state.students.map(student => (
            <p key={student.id}>
              {student.lastName}, {student.firstName}
              <button
                onClick={() =>
                  this.props.history.push("/users/students/" + student.id)
                }
              >
                See details
              </button>
            </p>
          ))}
        </div>
        <button onClick={() => this.props.history.push("/schoolclasses")}>
          Back
        </button>
      </div>
    );
  }
}

export default SchoolClassDetails;
