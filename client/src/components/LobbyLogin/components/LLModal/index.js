import React from 'react'
import { Modal, Button, Tab, Col, Row, Nav, Container, Form, Card } from 'react-bootstrap';
import TouchlessLogin from "../../../TouchlessLogin";
import VideoChat from "../../../ReactVideoChat/App";

function index({ show, uuid_id, setUuid_id, setShow }) {    
    const handleClose = () => setShow(false);
    
    return (
        <>           
            <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Please Sign In</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Video Chat</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third">You have an Appointment!!!</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="fourth">Places to Eat!!!</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <TouchlessLogin uuid_id={uuid_id} setUuid_id={setUuid_id} LLsetShow={setShow}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                    <VideoChat />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        Welcome, you have an appoitment with ... Please take you picture and have the security escort you in
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="fourth">
                                        Ad Space Here!!!
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default index
