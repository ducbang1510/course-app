import React, {useEffect, useState} from 'react'; // , useContext
import API, { endpoints } from './API';
import cookies from 'react-cookies'
import './mystyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
// import { UserContext } from './App';
import { useStore } from 'react-redux';

export default function Header() {
    const [categories, setCategories] = useState([])

    // Use Redux
    const store = useStore()
    const auth = store.getState()
    // const auth = useContext(UserContext) // use context


    useEffect(() =>{
        API.get(endpoints['categories']).then(res => {
            setCategories(res.data)
        })
    })

    
    // let user = auth.user // use context
    let user = auth // user redux
    if (cookies.load("user") != null) {
        user = cookies.load("user")
    }

    let r = <>
        <Nav.Link href="/register">Đăng kí</Nav.Link>
        <Nav.Link href="/login">Đăng nhập</Nav.Link>
    </>

    if (user != null) {
        r = <>
            <Nav.Link href="/">Welcome {user.username}</Nav.Link>
            <Nav.Link href="/logout">Đăng xuất</Nav.Link>
        </>
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">ECourse App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Trang chủ</Nav.Link>
                        <Nav.Link href="/lesson">Bài học</Nav.Link>
                        {r}
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            {categories.map(c => <NavDropdown.Item href="#">{c.name}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
