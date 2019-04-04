import React, { Component } from "react";
import Header from '../common/Header';
import StudentProfile from './StudentProfile';
import StudentCourses from './StudentCourses';

class StudentHome extends Component {

  render() {
    return (
      <div>
        <Header />
        <div>
          <StudentProfile />
          <StudentCourses />
        </div>
      </div>
    )
  }
}

export default StudentHome;