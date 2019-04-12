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

    const linkStyle = {
      textDecoration: "none",
      color: "rgb(175, 71, 60)",
      fontSize: "25px",
      fontWeight: "bold"
    };
    return (
      <div>
        <Header />
        <div className="home_background">
      <div className="profile_parent">
        <p>
          <span className="student_font">First name:</span> {this.state.firstName}
        </p>
        <p>
          <span className="student_font">Last name:</span> {this.state.lastName}
        </p>
        <p>
          <span className="student_font">Username:</span> {this.state.username}
        </p>
        <p>
          <span className="student_font">E-mail:</span> {this.state.email}
        </p>
        <p className="student_font">Children: </p>
        <ul>
          {this.state.children.map(student => (
            <li key={student.id} className="list"><Link to={`/parent/grades/${student.id}`} style={linkStyle}>{student.firstName} {student.lastName}</Link></li>
          ))}
        </ul>
      </div>
      </div>
      </div>
    )
  }
}

export default ParentHome;