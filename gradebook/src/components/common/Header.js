import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

class Header extends Component {

    logout = () => {
        localStorage.clear();
        this.props.history.push("/");
    }

    render() {
        const linkStyle = {
            textDecoration: 'none',
            color: 'black'
        }

        return (
            <div className="header">
                <ul className="navbar">
                    
                    <li  id="loggedin">Logged in as: {localStorage.getItem("firstName")} {localStorage.getItem("lastName")}</li>
                    <li><Link to='/admin/home' style={linkStyle}>Home</Link></li>
                    <li><Link onClick={this.logout} style={linkStyle}>Log out</Link></li>
                </ul>
            </div>
        )
    }
}

export default withRouter(Header);

