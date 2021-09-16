import React, { useState } from 'react'; //  useContext, useEffect,
import { Button, Form } from 'react-bootstrap';
import API, { endpoints } from './API';
import cookies from 'react-cookies'
import { Redirect } from 'react-router-dom';
// import { UserContext } from './App';
import { useDispatch } from 'react-redux';

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogged, setLogged] = useState(false)
    const dispatch = useDispatch()
    // const auth = useContext(UserContext) //use context
    
    // const login = async (event) => {
    //     event.preventDefault();
    //     // auth.login(username, password) //use context
    //     setLogged(true)
    // }

    const login = async (event) => {
        event.preventDefault();
        let res = await API.post(endpoints['login'], {
          'client_id': 'IJ4WjH3X3UPu8ydIbAsnOC8W5RbPnfLDxmn90SqO',
          'client_secret': 'fM6Yl7Cs1bxE3VJC2SwUtRLW1DqHsLwMyZjrcjPhg5KPy4CGdrgHlare80z5cAuYOaS9IACFiwn3HRJPkUhd6v7qNRRlazrLT4RN6RtAHc239iIt7eIeV7YMvjaiII2d',
          'username': username,
          'password': password,
          'grant_type': 'password'
        });
    
        cookies.save("access_token", res.data.access_token);
    
        let user = await API.get(endpoints['current-user'], {
          headers: {
            'Authorization': `Bearer ${cookies.load('access_token')}`
          }
        })
        cookies.save("user", user.data)
    
        dispatch({
          "type": "login",
          "payload": user.data
        })
    
        // setUser(user)
        setLogged(true)
      }

    if (isLogged)
        return <Redirect to="/" />
    else 
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