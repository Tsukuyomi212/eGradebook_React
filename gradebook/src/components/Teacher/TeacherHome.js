import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from '../common/Header';
import TeacherProfile from './TeacherProfile';

class TeacherHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      id: localStorage.getItem("id"),
      courses: []
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <TeacherProfile />
        </div>
      </div>
    )
  }
}

export default TeacherHome;