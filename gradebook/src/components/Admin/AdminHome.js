import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../common/Footer.css";
import Header from '../common/Header';
import '../common/Home.css';

class AdminHome extends Component {
  render() {
    return (
      <div className="home_background">
        <div>
            <Header />
            <div className="home_options">
            <p><Link to='/admin/profile' style={{textDecoration: 'none', color: 'rgb(230, 172, 0)'}}>My Profile</Link></p>
            <p><Link to='/users' style={{textDecoration: 'none', color: 'rgb(230, 172, 0)'}}>Users</Link></p>
            <p><Link to='/courses' style={{textDecoration: 'none', color: 'rgb(230, 172, 0)'}}>Courses</Link></p>
            <p><Link to='/schoolclasses' style={{textDecoration: 'none', color: 'rgb(230, 172, 0)'}}>School Classes</Link></p>
            <p><Link to='/logs' style={{textDecoration: 'none', color: 'rgb(230, 172, 0)'}}>Logging Data</Link></p>
            </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
