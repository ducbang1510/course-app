import React, {useContext, useEffect, useState} from 'react';
import API, { endpoints } from './API';
import { Link, useLocation } from 'react-router-dom'
import { Row, Col, Card, Pagination } from 'react-bootstrap'
import { SearchContext } from './App';
// import { SearchContext } from './Header'

export default function Body() {
    const [courses, setCourses] = useState([])
    const [count, setCount] = useState(0)

    const auth1 = useContext(SearchContext)
    let searchData = auth1.searchData

    // const searchData = React.useContext(SearchContext)
    // console.info(searchData)
    

    const loadCourse= (page="?page=1") => {
        API.get(`${endpoints['courses']}${page}`).then(res => {
            setCourses(res.data.results)
            setCount(res.data.count)
        })
    }

    useEffect(() => {
        loadCourse()
    }, [])

    let location = useLocation()
    useEffect(() => {
        loadCourse(location.search)
    }, [location])

    
    let items = []
    for(let i = 0; i < Math.ceil(count/6); i++)
        items.push(
            <Pagination.Item><Link to={"/?page=" + (i + 1)}>{i + 1}</Link></Pagination.Item>
        )

    let r = <></>

    if (searchData != null) {
        r = <>
            <Row>
                {searchData.map(c => <ACourse course={c} />)}
            </Row>
        </>
    } else {
        r = <>
            <Row>
                {courses.map(c => <ACourse course={c} />)}
            </Row>
        </>
    }

    return (
        <>
            <h1 class="text-center text-danger">Các khóa học trực tuyến</h1>
            <Pagination>
                {items}
            </Pagination>
            {r}
        </>
    )
    
}

class ACourse extends React.Component {
    render() {
        // const s = `/static/${this.props.course.image}`
        return (
            <Col md={4}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.course.image} />
                    <Card.Body>
                        <Card.Title>{this.props.course.subject}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

// export default Body