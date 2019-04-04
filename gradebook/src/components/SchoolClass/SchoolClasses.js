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
            const realClassses = data.filter(schoolClass => schoolClass.grade !== 0 && schoolClass.section !==0);
            this.setState({ schoolClasses: realClassses });
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
            <Link to="/schoolclasses/create">Create new School Class</Link>
          <h2>School Classes</h2>
          {this.state.schoolClasses.map(schoolClass => (
            <p key={schoolClass.id}>
              {schoolClass.grade} / {schoolClass.section} (
              {schoolClass.schoolYear})
              <span>
                  <button onClick={() => this.props.history.push("/schoolclasses/" + schoolClass.id)}>See details</button>
              </span>
            </p>
          ))}
        </div>
        <button onClick={() => this.props.history.push('/admin/home')}>Back</button>
        <Footer />
      </div>
    );
  }
}

export default SchoolClasses;
