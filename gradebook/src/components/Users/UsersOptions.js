import React from "react";
import { Link } from "react-router-dom";
import Header from '../common/Header';
//import Footer from '../common/Footer';

const linkStyle = {
  textDecoration: 'none', 
  color: 'rgb(230, 172, 0)'
}

const UserOptions = props => {
  return (
    <div className="home_background">
      <Header />
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
    </div>
  );
};

export default UserOptions;
