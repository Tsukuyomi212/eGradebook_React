import React, { Component } from "react";
import { SCHOOLCLASS } from "../../services/api";
import { Link } from "react-router-dom";
import Header from "../common/Header";

class SchoolClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolClasses: []
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };
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
        <div>
          <div className="links">
            <Link to="/schoolclasses/create" style={linkStyle}>
              Create new School Class
            </Link>
            <br />
            <Link to="/admin/home" style={linkStyle}>
              Back to home
            </Link>
          </div>
          <h2 className="courses_heading">School Classes</h2>
          <div className="classes_list">
            {this.state.schoolClasses.map(schoolClass => (
              <p key={schoolClass.id}>
                {schoolClass.grade} / {schoolClass.section} (
                {schoolClass.schoolYear})
                <span>
                  <button
                  className="button_create_course create_space"
                    onClick={() =>
                      this.props.history.push(
                        "/schoolclasses/" + schoolClass.id
                      )
                    }
                  >
                    See details
                  </button>
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SchoolClasses;
