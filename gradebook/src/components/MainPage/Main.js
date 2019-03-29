import React, { Component } from "react";
import Login from "./Login";
import "./Main.css";

class Main extends Component {
  render() {
    return (
      <div className="main_background">
        <div className="main">
          <div className="main-page-heading">
            <h3 id="elementary_school">Elementary School</h3>
            <h2 id="school_name">"School Name"</h2>
            <h1 id="gradebook">eGradebook</h1>
          </div>
          <Login />
        </div>
      </div>
    );
  }
}

export default Main;
