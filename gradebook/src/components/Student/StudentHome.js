import React, { Component } from "react";
import Header from '../common/Header';
import StudentProfile from './StudentProfile';
import StudentCourses from './StudentCourses';

class StudentHome extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="center">
        <div className="profile_student">
          <StudentProfile />
          </div>
          <div id="student-table">
          <StudentCourses />
          </div>
        </div>
      </div>
    )
  }
}

export default StudentHome;