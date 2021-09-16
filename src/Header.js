import React, {useContext, useEffect, useState} from 'react'; // , useContext
import API, { endpoints } from './API';
import cookies from 'react-cookies'
import './mystyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
// import { UserContext } from './App';
import { useStore } from 'react-redux';
import { SearchContext } from './App';

// export const SearchContext = React.createContext()

export default function Header() {
    const [categories, setCategories] = useState([])

    // const [count, setCount] = useState(0)
    const [searchKey, setSearchKey] = useState("");
    // const [searchRes, setSearchRes] = useState([])

    const auth1 = useContext(SearchContext)

    const searchCourse= (event) => {    // , search= `?search=${searchKey}`
        event.preventDefault();
        auth1.search(`?search=${searchKey}`)
        // API.get(`${endpoints['courses']}${search}`).then(res => {
        //     setSearchRes(res.data.results)
        //     setCount(res.data.count)
        // })
    }

    // Use Redux
    const store = useStore()
    const auth = store.getState()
    // const auth = useContext(UserContext) // use context


    useEffect(() =>{
        API.get(endpoints['categories']).then(res => {
            setCategories(res.data)
        })
    }, [])
    
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
                        {/* <NavDropdown title={count} id="basic-nav-dropdown">
                            {searchRes.map(c => <NavDropdown.Item href="#">{c.subject}</NavDropdown.Item>)}
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="form-container">
                <form onSubmit={(event) => searchCourse(event)}>
                <div className="form-group">
                    <input
                    type="search"
                    placeholder="Search...."
                    value={searchKey}
                    onChange={event => setSearchKey(event.target.value)}
                    />
                    <Button type="submit" className="search-btn">Search
                    </Button>
                </div>
                </form>
            </div>
            {/* <SearchContext.Provider value={{searchRes}}></SearchContext.Provider> */}
        </>
    )
}
