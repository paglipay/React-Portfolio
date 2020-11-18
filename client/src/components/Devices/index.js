import React, { useState, useEffect, useRef, PureComponent } from 'react'
import { Container, Row, Col, Form, FormControl, Button, NavDropdown, Nav, DropdownButton, Dropdown, Modal, Tabs, Tab } from 'react-bootstrap'
import CardWrapper from '../Wrappers/CardWrapper'
import DevicesTable from './Devices'
import Interfaces from './Interfaces'
import CompareConfigs from './CompareConfigs'
import Configs from '../Devices/containers/ConfigsTable'

function Devices() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Configuration Collections</Modal.Title>
                </Modal.Header>
                <Modal.Body><Configs /></Modal.Body>
                <Modal.Footer>
                    <DropdownButton
                        // as={InputGroup.Append}
                        variant="outline-secondary"
                        title="Dropdown"
                        id="input-group-dropdown-2"
                    >
                        <Dropdown.Item href="#">Action</Dropdown.Item>
                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Separated link</Dropdown.Item>
                    </DropdownButton>
                    <Button variant="primary">Save Collection As</Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
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
                        <Button variant="primary" onClick={() => setShow(true)}>
                            Load
                        </Button>
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" key="tabs">
                            <Tab key="home" eventKey="home" title="Cisco Configuration Parser">
                                <DevicesTable inv={[{ 'id': 1, 'upc': 123 }, { 'id': 2, 'upc': <Button>Press123</Button> }]} />
                            </Tab>
                            <Tab key="profile" eventKey="profile" title="Configuration Compare">
                                <CompareConfigs />
                            </Tab>
                            <Tab key="interfaces" eventKey="interfaces" title="Interfaces">
                                <Interfaces />
                            </Tab>
                            <Tab key="interfaceACL" eventKey="interfaceACL" title="Interface Access Control">
                                <Interfaces />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Devices
