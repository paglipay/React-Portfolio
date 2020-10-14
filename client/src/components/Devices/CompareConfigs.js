import React, { useState, useEffect, useRef, PureComponent } from 'react'
import { Container, Row, Col, Form, FormControl, Button, NavDropdown, Nav, Navbar, Modal, Tabs, Tab } from 'react-bootstrap'
import CardWrapper from '../Wrappers/CardWrapper'
import ReactDiffViewer from 'react-diff-viewer';
import { v4 as uuidv4 } from 'uuid';


function CompareConfigs() {
    const [textArea, setTextArea] = useState('')
    const [textArea2, setTextArea2] = useState('')

    const [deviceCompares, setDeviceCompares] = useState([]);
    const [deviceCompareId, setDeviceCompareId] = useState();

    const textAreaEl1 = useRef(null);
    const textAreaEl2 = useRef(null);

    const saveThis = () => {
        console.log('saveThis:')
        setTextArea('')
        setTextArea2('')

        const uuid_id = uuidv4()
        setDeviceCompareId(uuid_id)
        setDeviceCompares([...deviceCompares, { id: uuid_id, config1: textArea, config2: textArea2 }])

        textAreaEl1.current.value = ''
        textAreaEl2.current.value = ''
    }

    const handleOnSaveClick = (e) => {
        saveThis()
    }

    useEffect(() => {
        console.log('useEffect textArea:')
        setTimeout(() => saveThis(), 1000)
    }, []);

    useEffect(() => {
        console.log('setDeviceCompareId: ', deviceCompareId)
        console.log('deviceCompares: ', deviceCompares)

        console.log('textArea: ', textArea)
        console.log('textArea2: ', textArea2)
        const newList = deviceCompares.map((item) => {
            if (item.id === deviceCompareId) {
                const updatedItem = {
                    ...item,
                    config1: { config: textArea },
                    config2: { config: textArea2 },
                };
                return updatedItem;
            }
            return item;
        });
        console.log('newList: ', newList)
        setDeviceCompares(newList)

    }, [textArea, textArea2]);

    return (
        <div>
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
                    <Col xs lg="6">
                        <h2>Configuration 1</h2>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Enter Configuration1 in Textarea</Form.Label>
                            <Form.Control ref={textAreaEl1} as="textarea" rows="3" onChange={(e) => { setTextArea(e.target.value) }} style={{ height: 200 }} />
                        </Form.Group>
                    </Col>
                    <Col xs lg="6">
                        <h2>Configuration 2</h2>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Enter Configuration2 in Textarea</Form.Label>
                            <Form.Control ref={textAreaEl2} as="textarea" rows="3" onChange={(e) => { setTextArea2(e.target.value) }} style={{ height: 200 }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row><Col>
                    <Form inline>
                        {/* <FormControl type="text" ref={inputEl} onChange={(e) => { setSearch(e.target.value) }} placeholder="Save As" className="mr-sm-2" style={{ display: 'flex', flexDirection: 'row' }} /> */}
                        <Button variant="outline-success" onClick={handleOnSaveClick}>New Diffs</Button>
                    </Form>
                </Col></Row>
                <Row>
                    <Container fluid style={{ paddingTop: '15px', height: '100%' }}>
                        <Row style={{ height: '100%' }}>
                            <Col style={{ height: '100%' }} className="mb-4">

                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={deviceCompareId}
                                    onSelect={(k) => {
                                        setDeviceCompareId(k)
                                        textAreaEl1.current.value = deviceCompares.find(i => k === i.id).config1.config
                                        setTextArea(textAreaEl1.current.value)
                                        textAreaEl2.current.value = deviceCompares.find(i => k === i.id).config2.config
                                        setTextArea2(textAreaEl2.current.value)
                                    }
                                    }
                                    defaultActiveKey="profile">
                                    {deviceCompares && deviceCompares.map(dc => <Tab key={dc.id} eventKey={dc.id} title={dc.id}>
                                        <CardWrapper title={<><h3>{dc.id}</h3><br /><Button className="btn-danger">Delete</Button></>}>
                                            <ReactDiffViewer oldValue={dc.config1.config} newValue={dc.config2.config} splitView={true} />
                                        </CardWrapper>
                                    </Tab>
                                    )}
                                </Tabs>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    )
}

export default CompareConfigs
