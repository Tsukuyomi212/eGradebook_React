import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { SCHOOLYEARS } from "../../services/api";

class SchoolYears extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolYears: []
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

    fetch(SCHOOLYEARS, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ schoolYears: data });
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
            <p>School Years: </p>
            {this.state.schoolYears.map(schoolYear => (
                <p key={schoolYear.id}>{schoolYear.name}</p>
            ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default SchoolYears;
