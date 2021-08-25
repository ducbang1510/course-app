import React from 'react';
import API, {endpoints} from './API';
import { Link } from 'react-router-dom'
import { Col, Card, Row, Pagination } from 'react-bootstrap'

class Lesson extends React.Component {
    constructor() {
        super();
        this.state = {
            lessons: [],
            count: 0,
        };
    }

    loadLesson = (page="?page1") => {
        API.get(`${endpoints['lessons']}${page}`).then(res => {
            this.setState({
                'lessons': res.data.results,
                'count': res.data.count
            })
        })
    }

    componentDidMount() {
        this.loadLesson()
    }

    componentDidUpdate() {
        this.loadLesson(this.props.location.search)
    }

    render() {
        let items = []
        for(let i = 0; i < Math.ceil(this.state.count/3); i++)
            items.push(
                <Pagination.Item><Link to={"/?page=" + (i + 1)}>{i + 1}</Link></Pagination.Item>
            )

        return (
            <>
                <h1 class="text-center text-danger">LESSONS</h1>
                <Pagination>
                    {items}
                </Pagination>
                <Row>
                    {this.state.lessons.map(l => <ALesson lesson={l} />)}
                </Row>
            </>
        )
    }
}

class ALesson extends React.Component {
    render() {
        return (
            <Col md={4}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.lesson.image} />
                    <Card.Body>
                        <Card.Title>{this.props.lesson.subject}</Card.Title>
                        <Card.Text dangerouslySetInnerHTML={{__html: `${this.props.lesson.content}`}}>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

export default Lesson;