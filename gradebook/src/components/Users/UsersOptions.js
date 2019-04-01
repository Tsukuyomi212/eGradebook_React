import React from "react";
import { Link } from "react-router-dom";
import Header from '../common/Header';
import Footer from '../common/Footer';

const UserOptions = props => {
  return (
    <div>
      <Header />
      <div>
        <Link to="/admin/users/teachers">Teachers</Link>
        <br />
        <Link to="/admin/users/students">Students</Link>
        <br />
        <Link to="/admin/users/parents">Parents</Link>
      </div>
      <Footer />
    </div>
  );
};

export default UserOptions;
