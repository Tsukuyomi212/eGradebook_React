import React, { Component } from "react";
import Footer from "../common/Footer";
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
            <p><Link to='/admin/users' style={{textDecoration: 'none', color: 'rgb(230, 172, 0)'}}>Users Info & Settings</Link></p>
            <p><Link to='/admin/schoolgradesinfo' style={{textDecoration: 'none', color: 'rgb(230, 172, 0)'}}>School Grades Info & Settings</Link></p>
            <p><Link to='/admin/schoolyearinfo' style={{textDecoration: 'none', color: 'rgb(230, 172, 0)'}}>School Year Info & Settings</Link></p>
            <p><Link to='/admin/loggingdata' style={{textDecoration: 'none', color: 'rgb(230, 172, 0)'}}>Logging Data</Link></p>
            </div>
        </div>
          <Footer />
      </div>
    );
  }
}

export default AdminHome;
