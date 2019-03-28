import React, { Component } from "react";
import { LOGIN } from "../../services/api";
import { createFormBody } from '../../services/helper';
import {withRouter} from 'react-router-dom';
import './Login.css';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        errorMessage: ""
      };
    }
  
    handleInput = event => {
      const target = event.target;
      const name = target.name;
  
      this.setState({
        [name]: target.value
      });
    };
  
    handleSubmit = (event) => {
          
  
      let details = {
          'username': this.state.username,
          'password': this.state.password,
          'grant_type': 'password'
      };
      
      let data = createFormBody(details);
  
      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data
      };
      
      fetch(LOGIN, requestOptions)
      .then(response => {
          if (response.ok) {
              response.json().then(data => {
                  this.setState({errorMessage: ''})
                  localStorage.setItem("token", data.access_token);
                  localStorage.setItem("role", data.role);
                  if(data.role === "admin") {
                    this.props.history.push('/admin/home');
                  } else if (data.role === "teacher") {
                    this.props.history.push('/teacher/home');
                  } else if (data.role === "student") {
                    this.props.history.push('/student/home');
                  } else if (data.role === "parent") {
                    this.props.history.push('/parent/home');
                  } else {
                    this.props.history.push('/notfound');
                  }
                   
                  console.log('logged in');
              });
          }else {
              response.text().then(message => this.setState({errorMessage: message}))
          }
      })
      .catch(error => console.log(error))
      event.preventDefault();
  
  };
  
    
  
    render() {
      return (
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <input
              className="login_input"
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={this.handleInput}
            />
            <br />
            <input
              className="login_input"
              type="text"
              name="password"
              placeholder="Enter password"
              onChange={this.handleInput}
            />
            <br />
            <input type="submit" value="Submit" className="login_submit" />
          </form>
        </div>
      );
    }
  }
  
  export default withRouter(Login);