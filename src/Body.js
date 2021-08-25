import React from 'react';
import API, { endpoints } from './API';
import { Link } from 'react-router-dom'
import { Row, Col, Card, Pagination } from 'react-bootstrap'

class Body extends React.Component {
    constructor() {
        super()
        this.state = {
            'courses': [],
            'count': 0
        }
    }

    loadCourse= (page="?page1") => {
        API.get(`${endpoints['courses']}${page}`).then(res => {
            console.info(res.data)
            this.setState({
                'courses': res.data.results,
                'count': res.data.count
            })
        })
    }

    componentDidMount() {
        this.loadCourse()
    }

    componentDidUpdate() {
        this.loadCourse(this.props.location.search)
    }

    render() {
        let items = []
        for(let i = 0; i < Math.ceil(this.state.count/3); i++)
            items.push(
                <Pagination.Item><Link to={"/?page=" + (i + 1)}>{i + 1}</Link></Pagination.Item>
            )

        return (
            <>
                <h1 class="text-center text-danger">Các khóa học trực tuyến</h1>
                <Pagination>
                    {items}
                </Pagination>
                <Row>
                    {this.state.courses.map(c => <ACourse course={c} />)}
                </Row>
            </>
        )
    }
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

export default Body