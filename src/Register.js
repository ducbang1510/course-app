import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import API, { endpoints } from './API';
import { Form, Button } from 'react-bootstrap'

class Register extends React.Component {
    constructor() {
        super();
        this.user = {
            'first_name': '',
            'last_name': '',
            'email': '',
            'username': '',
            'password': '',
            'confirm_password': '',
        }
        this.avatar = React.createRef()

        this.state = {
            'user': this.user
        }
    }

    change = (field, event) => {
        this.user[field] = event.target.value
        this.setState({
            'user': this.user
        })
    }

    register = (event) => {
        if (this.state.user.password === this.state.user.confirm_password) {
            const formData = new FormData()
            for (let k in this.state.user)
                if (k !== 'confirm_password')
                    formData.append(k, this.state.user[k])

            formData.append('avatar', this.avatar.current.files[0])
            API.post(endpoints['users'], formData, {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.info(res)
            }).catch(err => console.error(err))
        }

        event.preventDefault()
    }

    render() {
        return (
            <>
                <h1 class="text-center text-danger">ĐĂNG KÍ</h1>
                <Form onSubmit={this.register}>
                    <RegisterForm id="email" label="Email" type="email" field={this.state.user.email} change={this.change.bind(this, 'email')} />
                    <RegisterForm id="firstname" label="First Name" type="text" field={this.state.user.first_name} change={this.change.bind(this, 'first_name')} />
                    <RegisterForm id="lastname" label="Last Name" type="text" field={this.state.user.last_name} change={this.change.bind(this, 'last_name')} />
                    <RegisterForm id="username" label="Username" type="text" field={this.state.user.username} change={this.change.bind(this, 'username')} />
                    <RegisterForm id="password" label="Password" type="password" field={this.state.user.password} change={this.change.bind(this, 'password')} />
                    <RegisterForm id="confirmPass" label="Confirm Password" type="password" field={this.state.user.confirm_password} change={this.change.bind(this, 'confirm_password')} />
                    <Form.Group className="mb-3" controlId="avatar">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" ref={this.avatar} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Đăng kí
                    </Button>
                </Form>
            </>
        )
    }
}

class RegisterForm extends React.Component {
    render() {
        return (
            <Form.Group className="mb-3" controlId={this.props.id}>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control type={this.props.type} value={this.props.field} onChange={this.props.change} />
            </Form.Group>
        )
    }
}

export default Register