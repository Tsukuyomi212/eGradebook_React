import React, { Component } from "react";
import { GETSTUDENTS } from "../../services/api";
import { GETPARENTS } from "../../services/api";
import { SCHOOLCLASS } from "../../services/api";
import "../common/ProfileUpdate.css";
import Header from "../common/Header";

class StudentUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      id: this.props.match.params.id,
      parents: [],
      parentId: "",
      schoolClasses: [],
      schoolClass: undefined
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
      const profileURL = GETSTUDENTS + "/" + this.state.id;

      fetch(profileURL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                userData: data,
                id: data.id
              })
            );
          } else {
            response.text().then(message => alert("Something is not right"));
          }
        })
        .catch(error => console.log(error));

      fetch(GETPARENTS, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              data.sort(checkOrder);
              this.setState({ parents: data });
            });
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));

      fetch(SCHOOLCLASS, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              const realClassses = data.filter(
                schoolClass =>
                  schoolClass.grade !== 0 && schoolClass.section !== 0
              );
              this.setState({ schoolClasses: realClassses });
            });
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      userData: { ...this.state.userData, [name]: target.value },
      [name]: target.value
    });
  };

  handleSubmit = event => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        firstName: this.state.userData.firstName,
        lastName: this.state.userData.lastName,
        username: this.state.userData.userName,
        email: this.state.userData.email
      })
    };

    const path = GETSTUDENTS + "/" + this.state.id;
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ errorMessage: "", updateMode: false });
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

  handleParentSelect = event => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };

    fetch(
      `http://localhost:52940/api/students/${this.state.id}/parent/${
        this.state.parentId
      }`,
      requestOptions
    )
      .then(response => {
        if (response.ok) {
          alert("Ok");
          //this.props.history.push("/users/students");
        } else {
          response
            .text()
            .then(message => this.setState({ errorMessage: message }));
        }
      })
      .catch(error => console.log(error));
  };

  handleSchoolClassSelect = event => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };

    fetch(
      `http://localhost:52940/api/students/${this.state.id}/schoolClass/${
        this.state.schoolClassId
      }`,
      requestOptions
    )
      .then(response => {
        if (response.ok) {
          alert("Ok");
          //this.props.history.push("/users/students");
        } else {
          response
            .text()
            .then(message => this.setState({ errorMessage: message }));
        }
      })
      .catch(error => console.log(error));
  };

  goBack = () => this.props.history.push("/users/students/" + this.state.id);

  render() {
    return (
      <div className="home_background">
        <Header />
        <p className="page_heading">Update student data</p>
        <form onSubmit={this.handleSubmit} className="update_student_data">
          <p>
            <span className="update_data_font">First name:</span>
            <input
              className="input_data"
              placeholder={this.state.firstName}
              name="firstName"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            <span className="update_data_font">Last name:</span>
            <input
              className="input_data"
              placeholder={this.state.lastName}
              name="lastName"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            <span className="update_data_font">Username:</span>
            <input
              className="input_data"
              placeholder={this.state.username}
              name="userName"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            <span className="update_data_font">E-mail:</span>
            <input
              className="input_data"
              placeholder={this.state.email}
              name="email"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>

          <div>
            <p className="update_data_font">Assign parent to student:
            <select
              onChange={this.handleInputChange}
              value={this.state.parentId}
              name="parentId"
            >
              <option>Select parent</option>
              {this.state.parents.map(parent => (
                <option key={parent.id} value={parent.id}>
                  {parent.lastName}, {parent.firstName}
                </option>
              ))}
            </select> 
            <button onClick={this.handleParentSelect} className="ok_button">OK</button>
            </p>
          </div>

          <div>
            <p className="update_data_font">Assign student to class: 
            <select
              onChange={this.handleInputChange}
              value={this.state.parentId}
              name="schoolClassId"
            >
              <option>Select school class</option>
              {this.state.schoolClasses.map(schoolClass => (
                <option key={schoolClass.id} value={schoolClass.id}>
                  {schoolClass.grade} / {schoolClass.section}
                </option>
              ))}
            </select>
            <button onClick={this.handleSchoolClassSelect} className="ok_button">OK</button>
            </p>
          </div>
          <button
          className="button"
          id="button_save_update"
          onClick={event => {
            this.handleSubmit(event);
            this.goBack(event);
          }}
        >
          Save changes
        </button>

        <button
          type="button"
          value="Cancel"
          onClick={this.goBack}
          className="button"
          id="button_cancel_update"
        >
          Cancel
        </button>
        </form>
        
      </div>
    );
  }
}

function checkOrder(a, b) {
  if (a.lastName > b.lastName) {
    return 1;
  } else if (a.lastName === b.lastName) {
    return a.firstName > b.firstName ? 1 : -1;
  } else {
    return -1;
  }
}

export default StudentUpdate;
