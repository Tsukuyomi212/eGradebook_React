import React from "react";
import { Link } from "react-router-dom";
import Header from '../common/Header';
import Footer from '../common/Footer';

const linkStyle = {
  textDecoration: 'none', 
  color: 'rgb(26, 41, 48)'
}

const UserOptions = props => {
  return (
    <div className="home_background">
      <Header />
      <p className="page_heading">Users</p>
      <div className="home_options">
        <Link to="/users/teachers" style={linkStyle}>Teachers</Link>
        <br />
        <br />
        <Link to="/users/students" style={linkStyle}>Students</Link>
        <br />
        <br />
        <Link to="/users/parents" style={linkStyle}>Parents</Link>
        <br />
        <br />
        <Link to="/users/admins" style={linkStyle}>Admins</Link>
      </div>
      <Footer />
    </div>
  );
};

export default UserOptions;
