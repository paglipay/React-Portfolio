import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, Accordion, Card, Button, ButtonGroup, Badge, Spinner } from 'react-bootstrap'
import axios from "axios";
import DTree2 from './DTree2'
import LLCard from '../LobbyLogin/components/LLCard'
import { XCircle, Folder2Open } from 'react-bootstrap-icons';
// import API from "../../utils/API";

function DTreeForm() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {

    }, [])

    const goTasks = () => {
        clearTasks()
        setTasks([
            { "id": 0, "output": 0 },
            { "id": 1, "output": 1 },
            { "id": 2, "output": 2 },
            { "id": 3, "output": 3 },
            { "id": 4, "output": 4 },
            { "id": 5, "output": 5 },
            { "id": 7, "output": 7 }
        ])
    }

    const getTasks = (num) => {
        clearTasks()
        setTasks(tasks => [...tasks, { "id": num, "output": num }])
    }

    const clearTasks = () => {
        setTasks([])
    }

    const sendPost = (id, d = { "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo custom_entry STUFF 1234'] , "Code": [''] }) => {
        console.log('sendPost')
        // const d = { "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo custom_entry STUFF 1234'] }
        axios.post("/api/dtree/send/" + id, d)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Container style={{ backgroundColor: '#f4f4f4' }} fluid className="ml-2">
                {/* <Button onClick={() => goTasks()}>Go</Button>
                <Button onClick={() => clearTasks()}>Clear</Button>
                <Button onClick={() => getTasks(0)}>Get</Button>
                <Button onClick={() => sendPost(0)}>Send</Button>
                <Button onClick={() => getTasks(1)}>Get</Button>
                <Button onClick={() => getTasks(2)}>Get</Button>
                <Button onClick={() => getTasks(3)}>Get</Button>
                <Button onClick={() => getTasks(4)}>Get</Button>
                <Button onClick={() => getTasks(5)}>Get</Button>
                <Button onClick={() => getTasks(6)}>Get</Button>
                <Button onClick={() => getTasks(7)}>Get</Button> */}

                <Row>
                    <Col lg="3">
                        <Row className="mt-3">
                            <LLCard title="Jobs">
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li">
                                        Cras justo odio
                                <Button style={{ float: 'right' }} onClick={() => getTasks(0)}>Get</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Dapibus ac facilisis in
                                <Button style={{ float: 'right' }} onClick={() => getTasks(1)}>Get</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" disabled>
                                        Morbi leo risus
                                <Button style={{ float: 'right' }} onClick={() => getTasks(2)}>Get</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Porta ac consectetur ac
                                <Button style={{ float: 'right' }} onClick={() => getTasks(3)}>Get</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <Button onClick={() => goTasks()}>Go</Button>
                                        <Button onClick={() => clearTasks()}>Clear</Button>
                                        <Button onClick={() => getTasks(0)}>Get</Button>
                                        <Button onClick={() => sendPost(0)}>Send</Button>
                                        <Button onClick={() => getTasks(1)}>Get</Button>
                                        <Button onClick={() => getTasks(2)}>Get</Button>
                                        <Button onClick={() => getTasks(3)}>Get</Button>
                                        <Button onClick={() => getTasks(4)}>Get</Button>
                                        <Button onClick={() => getTasks(5)}>Get</Button>
                                        <Button onClick={() => getTasks(6)}>Get</Button>
                                        <Button onClick={() => getTasks(7)}>Get</Button>
                                        <Button onClick={() => sendPost(7)}>Send</Button>
                                        <Button onClick={() => getTasks(8)}>Get</Button>
                                        {/* <Button onClick={() => sendPost(8, {"Code": ['093730']})}>Send</Button> */}
                                        <Button onClick={() => sendPost(8)}>Send</Button>
                                        <Button onClick={() => getTasks(9)}>Start 9</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </LLCard>
                        </Row>
                        {/* <Row>
                            <LLCard>
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Click me!
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Accordion defaultActiveKey="0">
                                                    <Card>
                                                        <Card.Header>
                                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                                Click me!
                                                            </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="0">
                                                            <Card.Body>
                                                                <Accordion defaultActiveKey="0">
                                                                    <Card>
                                                                        <Card.Header>
                                                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                                                Click me!
                                            </Accordion.Toggle>
                                                                        </Card.Header>
                                                                        <Accordion.Collapse eventKey="0">
                                                                            <Card.Body>
                                                                                <Accordion defaultActiveKey="0">
                                                                                    <Card>
                                                                                        <Card.Header>
                                                                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                                                                Click me!
                                                            </Accordion.Toggle>
                                                                                        </Card.Header>
                                                                                        <Accordion.Collapse eventKey="0">
                                                                                            <Card.Body>
                                                                                                <ListGroup as="ul">
                                                                                                    <ListGroup.Item as="li">
                                                                                                        Cras justo odio
                                                                                                        <Badge variant="success" style={{ float: 'right' }}>Success</Badge>
                                                                                                    </ListGroup.Item>
                                                                                                    <ListGroup.Item as="li">
                                                                                                        Dapibus ac facilisis in
                                                                                                        <Badge variant="success" style={{ float: 'right' }}>Success</Badge>
                                                                                                    </ListGroup.Item>
                                                                                                    <ListGroup.Item as="li" disabled>
                                                                                                        Morbi leo risus
                                                                                                        <Badge variant="success" style={{ float: 'right' }}>Success</Badge>
                                                                                                    </ListGroup.Item>
                                                                                                    <ListGroup.Item as="li">
                                                                                                        Porta ac consectetur ac
                                                                                                        <Badge variant="success" style={{ float: 'right' }}>Success</Badge>
                                                                                                    </ListGroup.Item>
                                                                                                </ListGroup>
                                                                                            </Card.Body>
                                                                                        </Accordion.Collapse>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <Card.Header>
                                                                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                                                                Click me!
                                                            </Accordion.Toggle>
                                                                                        </Card.Header>
                                                                                        <Accordion.Collapse eventKey="1">
                                                                                            <Card.Body>Hello! I'm another body</Card.Body>
                                                                                        </Accordion.Collapse>
                                                                                    </Card>
                                                                                </Accordion>
                                                                            </Card.Body>
                                                                        </Accordion.Collapse>
                                                                    </Card>
                                                                    <Card>
                                                                        <Card.Header>
                                                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                                                Click me!
                                            </Accordion.Toggle>
                                                                        </Card.Header>
                                                                        <Accordion.Collapse eventKey="1">
                                                                            <Card.Body>Hello! I'm another body</Card.Body>
                                                                        </Accordion.Collapse>
                                                                    </Card>
                                                                </Accordion>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card>
                                                        <Card.Header>
                                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                                Click me!
                                                            </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="1">
                                                            <Card.Body>Hello! I'm another body</Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                Click me!
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion></LLCard>
                        </Row> */}
                    </Col>
                    <Col lg="9">
                        {/* <Row className="mt-3">
                            <Col><LLCard title={<>Status <Badge variant="success" style={{ float: 'right' }}>Success</Badge></>}>
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li">
                                        Cras justo odio
                                        <Badge variant="success" style={{ float: 'right' }}>Success</Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Dapibus ac facilisis in
                                        <Badge variant="success" style={{ float: 'right' }}>Success</Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" disabled>
                                        Morbi leo risus
                                        <Badge variant="success" style={{ float: 'right' }}>Success</Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Porta ac consectetur ac
                                        <Badge variant="success" style={{ float: 'right' }}>Success</Badge>
                                    </ListGroup.Item>
                                </ListGroup></LLCard></Col>
                            <Col><LLCard title={<>Status <Badge variant="success" style={{ float: 'right' }}>Success</Badge></>}>
                                2
                                <Badge variant="success" style={{ float: 'right' }}>Success</Badge></LLCard></Col>
                            <Col><LLCard title={<>Status <Badge variant="success" style={{ float: 'right' }}>Success</Badge></>}>
                                3
                                <Badge variant="success" style={{ float: 'right' }}>Success</Badge></LLCard></Col>
                        </Row> */}
                        <Row className="mt-3">
                            <Col lg="12">
                                <LLCard title="Status">
                                    {tasks.length > 0 &&
                                        <Accordion defaultActiveKey={tasks.length}>
                                            {tasks && tasks.map((d, i) =>
                                                <Card>
                                                    <Card.Header>
                                                        {/* <ButtonGroup size="sm">
                                                            <Button>Left</Button>
                                                            <Button>Middle</Button>
                                                            <Button>Right</Button>
                                                        </ButtonGroup> */}
                                                        <Accordion.Toggle size="sm" as={Button} variant="link" eventKey={i + 1}>
                                                            Click me!
                                                        </Accordion.Toggle>
                                                        {/* <Spinner animation="border" role="status" size="sm" style={{ float: 'right' }}>
                                                    <span className="sr-only">Loading...</span>
                                                    </Spinner> */}
                                                        {/* <Badge variant="primary" style={{ float: 'right' }}>Primary</Badge>{' '}
                                                    <Badge variant="secondary" style={{ float: 'right' }}>Secondary</Badge>{' '} */}
                                                        <Badge variant="success" style={{ float: 'right' }}>Success</Badge>{' '}
                                                        {/* <Badge variant="danger" style={{ float: 'right' }}>Danger</Badge>{' '}
                                                    <Badge variant="warning" style={{ float: 'right' }}>Warning</Badge> 
                                                    <Badge variant="info" style={{ float: 'right' }}>Info</Badge>{' '}
                                                    <Badge variant="light" style={{ float: 'right' }}>Light</Badge> 
                                                    <Badge variant="dark" style={{ float: 'right' }}>Dark</Badge> */}
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey={i + 1}>
                                                        <Card.Body>
                                                            {/* <LLCard> */}
                                                            <DTree2 key={d.output} id={d.output} />
                                                            {/* </LLCard> */}
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>)}
                                        </Accordion>
                                    }
                                </LLCard>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default DTreeForm
