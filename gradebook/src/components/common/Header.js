import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

class Header extends Component {

    logout = () => {
        localStorage.clear();
        this.props.history.push("/");
    }

   
       

    

    render() {


        return (
            <div className="header">
                <ul className="navbar">
                    <li className="blue_text" id="loggedin">Logged in as: {localStorage.getItem("firstName")} {localStorage.getItem("lastName")}</li>
                    <li><Link onClick={this.logout} style={{textDecoration: 'none', color: 'rgb(19, 38, 58)'}}>Log out</Link></li>
                </ul>
            </div>
        )
    }
}

export default withRouter(Header);

