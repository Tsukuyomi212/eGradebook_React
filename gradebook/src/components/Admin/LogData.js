import React, { Component } from "react";
import Header from "./../common/Header";
import Calendar from "react-calendar";
import { BASE } from "./../../services/api";
import { format } from "date-fns";
import { Link } from "react-router-dom";

class LogData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      dayLog: []
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    if (!currentUser) {
      this.props.history.push("/");
    }
  }

  onChange = date => {
    this.setState({ date });
  };

  showLog = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    const dateFormatted = format(this.state.date, "DD-MM-YYYY");
    const url = BASE + "/api/logs/" + dateFormatted;
    fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data =>
            this.setState({
              dayLog: data.split("||")
            })
          );
        } else {
          response.text().then(message => alert("message"));
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const linkStyle = {
      textDecoration: "none",
      color: "rgb(220, 174, 29)",
      fontSize: "25px",
      fontWeight: "bold"
    };
    return (
      <div>
        <Header />
        <div className="courses_links">
          <Link to="/admin/home" style={linkStyle}>Back</Link>
        </div>
        <p className="blue_font">Select the date for which you want to see log: </p>
        <div className="calendar">
          <Calendar onChange={this.onChange} value={this.state.date} />
        </div>
        <div>
          <button onClick={this.showLog} className="button centerbutton">Show Log</button>
          <div className="students_list">
          {this.state.dayLog.map(entry => (
            <p key={entry.id}>{entry}</p>
          ))}
          </div>
        </div>
      </div>
    );
  }
}

export default LogData;
