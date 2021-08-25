import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import API, { endpoints } from './API';

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    // useEffect(() => {
    //     console.log("test");
    //     console.log(Math.random());
    // })
    
    const login = async (event) => {
        event.preventDefault();
        let res = await API.post(endpoints['login'], {
            'client_id': 'IJ4WjH3X3UPu8ydIbAsnOC8W5RbPnfLDxmn90SqO',
            'client_secret': 'fM6Yl7Cs1bxE3VJC2SwUtRLW1DqHsLwMyZjrcjPhg5KPy4CGdrgHlare80z5cAuYOaS9IACFiwn3HRJPkUhd6v7qNRRlazrLT4RN6RtAHc239iIt7eIeV7YMvjaiII2d',
            'username': username,
            'password': password,
            'grant_type': 'password'
        });
        console.log(res.data.access_token);
        let accessToken = res.data.access_token;
    }
    
    return (
        <>
            <h1 className="text-center text-danger">Login Form</h1>
            <Form onSubmit={login}>
                <LoginForm
                    id="username"
                    label="Username"
                    fields={username}
                    change={event => setUsername(event.target.value)}
                    type="text"
                    placeholder="Enter Username"
                />
                <LoginForm
                    id="password"
                    label="Password"
                    fields={password}
                    change={event => setPassword(event.target.value)}
                    type="password"
                    placeholder="Enter Password"
                />
                <Button variant="danger" type="submit">
                    Login
                </Button>
            </Form>
        </>
    );
}

class LoginForm extends React.Component {
    render() {
        return (
            <Form.Group controlId={this.props.id}>
                <Form.Label className="h6 text-primary">{this.props.label}</Form.Label>
                <Form.Control
                    value={this.props.fields}
                    onChange={this.props.change}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                />
            </Form.Group>
        )
    }
}