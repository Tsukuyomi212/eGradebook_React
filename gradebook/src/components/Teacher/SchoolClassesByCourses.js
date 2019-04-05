import React, { Component } from "react";
import { TEACHER } from "../../services/api";

class SchoolClassesByCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolClasses: [],
      id: localStorage.getItem("id")
    }
  }

  render() {
    return (
      <div>

      </div>
    ) 
  }
}

export default SchoolClassesByCourses;