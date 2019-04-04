import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Header from '../common/Header';
import TeacherProfile from './TeacherProfile';
import TeacherClasses from './TeacherClasses';

// import TeacherSchoolClass from './TeacherSchoolClass';

class TeacherHome extends Component {

  render() {
    return (
      <div>
        <Header />
        <div>
          <TeacherProfile />
          <TeacherClasses history={this.props.history} />
         {/* <TeacherSchoolClass /> */}
        </div>
      </div>
    )
  }
}

export default TeacherHome;