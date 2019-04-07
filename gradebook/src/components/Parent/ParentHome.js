import React, {Component} from 'react';
import {PARENT} from '../../services/api';
import Header from '../common/Header';
import {Link} from 'react-router-dom';

class ParentHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      children: [],
      id: localStorage.getItem("id")
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/");
    } else {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };
      const profileURL = PARENT + 'profile/' + this.state.id;

      fetch(profileURL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.userName,
                email: data.email,
                children: data.children
              })
            );
          } else {
            response.text().then(message => alert("message"));
          }
        })
        .catch(error => console.log(error));
    }
  }



  render() {
    return (
      <div>
        <Header />
      <div>
        <p>
          <span>First name:</span> {this.state.firstName}
        </p>
        <p>
          <span>Last name:</span> {this.state.lastName}
        </p>
        <p>
          <span>Username:</span> {this.state.username}
        </p>
        <p>
          <span>E-mail:</span> {this.state.email}
        </p>
        <p>Children: </p>
        <ul>
          {this.state.children.map(student => (
            <li key={student.id}><Link to={`/parent/grades/${student.id}`}>{student.firstName} {student.lastName}</Link></li>
          ))}
        </ul>
      </div>
      </div>
    )
  }
}

export default ParentHome;