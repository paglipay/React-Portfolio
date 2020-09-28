import React, { useContext } from 'react'
import { Modal, Button, Tab, Col, Row, Nav, Container, Form, Card } from 'react-bootstrap';
import TouchlessLogin from "../../../TouchlessLogin";
import VideoChat from "../../../ReactVideoChat/App";
import Users from "../../../Users/UsersContainer";
import UserContext from "../../../../utils/userContext";

function LLTabContainer({ uuid_id, setUuid_id }) {
    
  const { handleBtnClick } = useContext(UserContext);

    return (
        <div>
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
                                <TouchlessLogin uuid_id={uuid_id} setUuid_id={setUuid_id} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <VideoChat />

                                <button
                                    className="btn btn-warning mr-4"
                                    onClick={handleBtnClick}
                                >
                                    Call
                                </button>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Users/>
                        </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                Ad Space Here!!!
                        </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}

export default LLTabContainer
