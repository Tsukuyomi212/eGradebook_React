import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Header from '../common/Header';
import TeacherProfile from './TeacherProfile';
import TeacherCourses from './TeacherCourses';

// import TeacherSchoolClass from './TeacherSchoolClass';

class TeacherHome extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="home_background my_profile">
          <TeacherProfile />
          <br/>
          <TeacherCourses history={this.props.history} />
          {/* <TeacherClasses history={this.props.history} /> */}
         {/* <TeacherSchoolClass /> */}
        </div>
      </div>
    )
  }
}
//
export default TeacherHome;