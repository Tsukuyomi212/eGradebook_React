import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from '../common/Header';
import TeacherProfile from './TeacherProfile';
import TeacherClasses from './TeacherClasses';

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
          <TeacherClasses />
        </div>
      </div>
    )
  }
}

export default TeacherHome;