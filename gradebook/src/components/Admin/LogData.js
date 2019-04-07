import React, {Component} from 'react';
import Header from './../common/Header';
import Calendar from 'react-calendar';
import {BASE} from './../../services/api';
import { format  } from "date-fns";

class LogData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      dayLog: []
    }
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    if (!currentUser) {
      this.props.history.push("/");
    }
  }


  onChange = date => {
    this.setState({ date })
  }

  showLog = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
    const dateFormatted = format(this.state.date, "DD-MM-YYYY")
    const url = BASE + '/api/logs/' + dateFormatted;
    fetch(url, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                dayLog: data.split('||')
              })
            );
          } else {
            response.text().then(message => alert("message"));
          }
        })
        .catch(error => console.log(error));

  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <button onClick={() => this.props.history.push('/admin/home')}>Back</button>
          <p>Select the date for which you want to see log: </p>
        </div>
        <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
      <div>
        <button onClick={this.showLog}>Show Log</button>
        {this.state.dayLog.map((entry, index) => (
          <p key={entry[index]}>{entry}</p>
        ))}
      </div>
      </div>
    )
  }
}

export default LogData;