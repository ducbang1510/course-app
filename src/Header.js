import React from 'react';
import API, { endpoints } from './API';
import './mystyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

class Header extends React.Component {
    constructor() {
        super();
        this.state = { 
            cates: [], 
        }
    }

    componentDidMount() {
        API.get(endpoints['categories']).then(res => {
                console.info(res.data)
                this.setState({cates: res.data})
        })
    }

    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">ECourse App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Trang chủ</Nav.Link>
                            <Nav.Link href="/lesson">Bài học</Nav.Link>
                            <Nav.Link href="/register">Đăng kí</Nav.Link>
                            <Nav.Link href="/login">Đăng nhập</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                {this.state.cates.map(c => <NavDropdown.Item href="#">{c.name}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}

export default Header;