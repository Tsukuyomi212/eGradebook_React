import React, { Component } from "react";
import { GETSTUDENTS } from "../../services/api";
import { GETPARENTS } from "../../services/api";
import { SCHOOLCLASS } from "../../services/api";

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
  }

  goBack = () => this.props.history.push("/users/students/" + this.state.id);

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>
            <span className="data_font">First name:</span>
            <input
              placeholder={this.state.firstName}
              name="firstName"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            <span className="data_font">Last name:</span>
            <input
              placeholder={this.state.lastName}
              name="lastName"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            <span className="data_font">Username:</span>
            <input
              placeholder={this.state.username}
              name="userName"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <p>
            <span className="data_font">E-mail:</span>
            <input
              placeholder={this.state.email}
              name="email"
              type="text"
              onChange={this.handleInputChange}
            />
          </p>
          <button
            onClick={event => {
              this.handleSubmit(event);
              this.goBack(event);
            }}
          >
            Save changes
          </button>

          <button type="button" value="Cancel" onClick={this.goBack}>
            Cancel
          </button>
        </form>

        <div>
          <p>Assign parent to student: </p>
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
          <button onClick={this.handleParentSelect}>Ok</button>
        </div>

        <div>
          <p>Assign student to class: </p>
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
          <button onClick={this.handleSchoolClassSelect}>Ok</button>
        </div>
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
