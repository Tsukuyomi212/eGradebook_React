import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../common/Footer.css";
import Header from '../common/Header';
import '../common/Home.css';
import Footer from '../common/Footer';

class AdminHome extends Component {

  
  render() {
    const linkStyle = {
      textDecoration: 'none',
      color: 'rgb(26, 41, 48)'
    };

    return (
      <div className="home_background">
        <div>
            <Header />
            <div className="home_options">
            <p><Link to='/admin/profile' style={linkStyle}>My Profile</Link></p>
            <p><Link to='/users' style={linkStyle}>Users</Link></p>
            <p><Link to='/courses' style={linkStyle}>Courses</Link></p>
            <p><Link to='/schoolclasses' style={linkStyle}>School Classes</Link></p>
            <p><Link to='/logs' style={linkStyle}>Logging Data</Link></p>
            </div>
            <Footer />
        </div>
      </div>
    );
  }
}

export default AdminHome;
