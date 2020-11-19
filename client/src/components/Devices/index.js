import React, { useState, useEffect, useRef, PureComponent } from 'react'
import { Container, Row, Col, Form, FormControl, Button, NavDropdown, Nav, DropdownButton, Dropdown, Modal, Tabs, Tab } from 'react-bootstrap'
import CardWrapper from '../Wrappers/CardWrapper'
import DevicesTable from './Devices'
import Interfaces from './Interfaces'
import EACLs from './EACLs'
import CompareConfigs from './CompareConfigs'
import Configs from '../Devices/containers/ConfigsTable'
import axios from 'axios';

function Devices() {
    const [show, setShow] = useState(false);
    const [state, setState] = useState({
        selectedFile: null
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeHandler = event => {
        console.log(event.target.files[0])
        setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    const onClickHandler = () => {
        const data = new FormData()
        data.append('file', state.selectedFile)
        axios.post("/upload", data, { 
           // receive two    parameter endpoint url ,form data
       }).then(res => { // then print response status
        console.log(res.statusText)
     })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Configuration Collections</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" action="#" id="#">
                        <div className="form-group files">
                            <label>Upload Your File(s) </label>
                            <input type="file" className="form-control" multiple="" onChange={onChangeHandler} />
                        </div>
                        <button type="button" className="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>
                    </form>
                    <br />
                    <Configs />
                </Modal.Body>
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

                                <Row>
                                    <Col>
                                        <Interfaces />
                                    </Col>
                                    <Col>
                                        <Interfaces />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <EACLs />
                                    </Col>
                                </Row>

                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Devices
