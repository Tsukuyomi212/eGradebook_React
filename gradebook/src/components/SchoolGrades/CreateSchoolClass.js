import React, {Component} from 'react';
import {SCHOOLCLASS} from '../../services/api';

class CreateSchoolClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grade: 0,
            section: ''
        }
    }

    componentDidMount() {
        const currentUser = localStorage.getItem("token");
        if(!currentUser) {
            this.props.history.push("/login");
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        
        this.setState({
            [name]: target.value
        });
    } 
    
    handleSubmit = (event) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: JSON.stringify({
                grade: this.state.grade,
                section: this.state.section
            })
        };
        
        fetch( SCHOOLCLASS, requestOptions)
        .then(response => 
            {
                if(response.ok) {
                    response.json().then(data => {
                        this.props.history.push("/");
                    });
                }else {
                    response.text().then(message => this.setState({errorMessage: message}))
                }
            })
        .catch(error => console.log(error))
        event.preventDefault();

    };

    render() {
        return (
            <div>
                <form>
                    <label>Grade: </label>
                    <input></input>
                    <br />
                    <label>Section</label>
                    <input></input>
                    <br />
                    
                </form>
            </div>
        )
    }
}

export default CreateSchoolClass;