import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { GETTEACHERS } from "../../services/api";
import { Link } from "react-router-dom";


class TeacherDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '', 
            username: '',
            email: '',
            courses: []
        }
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

            const profileURL = GETTEACHERS + '/' + this.props.match.params.id;

            fetch(profileURL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                  id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.userName,
                email: data.email,
                courses: data.teacherTeachesCourses
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
                <div className="home_background" >
          <Header />
          <div className="profile_data">
            <p>
              <span className="data_font">First name: </span> {this.state.firstName}
            </p>
            <p>
              <span className="data_font">Last name: </span> {this.state.lastName}
            </p>
            <p>
              <span className="data_font">Username: </span> {this.state.username}
            </p>
            <p>
              <span className="data_font">E-mail: </span> {this.state.email}
            </p>
            <p><span>Courses: </span></p>
            <ul>
                {this.state.courses.map(course => (
                    <li key={course.id}>{course.courseName}</li>
                ))}
            </ul>
          </div>
          <div className="edit_details">
            <Link
              onClick={() => this.props.history.push('/users/teachers/update/' + this.state.id)}
              style={{ textDecoration: "none", color: "rgb(230, 172, 0)", fontSize:"20px" }}
            >
              Edit details
            </Link>
            <br></br>
            <Link
              to='/users/teachers'
              style={{ textDecoration: "none", color: "rgb(230, 172, 0)", fontSize:"20px" }}
            >
              Back
            </Link>
          </div>
          <Footer />
        </div>
            </div>
        )
    }
}

export default TeacherDetails;
//ID: {this.props.match.params.id}