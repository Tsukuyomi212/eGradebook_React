import React, { Component } from "react";
import { SCHOOLCLASS } from "../../services/api";
import {Link} from 'react-router-dom';
import Header from "../common/Header";
import Footer from "../common/Footer";

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
            this.setState({ schoolClasses: data });
          });
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Header />
        <div>
            <Link>Create new School Class</Link>
          <h2>School Classes</h2>
          {this.state.schoolClasses.map(schoolClass => (
            <p key={schoolClass.id}>
              {schoolClass.grade} / {schoolClass.section} (
              {schoolClass.schoolYear})
              <span>
                  <button>See details</button>
              </span>
            </p>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default SchoolClasses;
