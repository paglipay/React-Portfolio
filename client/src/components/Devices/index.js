import React, { useState, useEffect, useRef, PureComponent } from 'react'
import { Container, Row, Col, Form, FormControl, Button, NavDropdown, Nav, Navbar, Modal, Tabs, Tab } from 'react-bootstrap'
import CardWrapper from '../Wrappers/CardWrapper'
import DevicesTable from './Devices'
import CompareConfigs from './CompareConfigs'
import Configs from '../Devices/containers/ConfigsTable'

function Devices() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><Configs /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container fluid>
                <style type="text/css">
                    {`
                    body {
                        background-color:#f0f0f0
                    }
                    .modal-90w {
                            width: 90%;
                            max-width: none!important;
                        }
                    `}
                </style>
                <Row>
                    <Col>
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="Cisco Configuration Parser">
                                <Button variant="primary" onClick={() => setShow(true)}>
                                    Load
                                </Button>
                                <DevicesTable inv={[{ 'id': 1, 'upc': 123 }, { 'id': 2, 'upc': <Button>Press123</Button> }]} />
                            </Tab>
                            <Tab eventKey="profile" title="Configuration Compare">
                                <CompareConfigs />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Devices
