import React, { useState, useEffect, useRef, PureComponent } from 'react'
import { Container, Row, Col, Form, FormControl, Button, NavDropdown, Nav, Navbar, Modal, Tabs, Tab } from 'react-bootstrap'
import CardWrapper from '../Wrappers/CardWrapper'
import DevicesTable from './Devices'
import helpers from './helpers'
import ReactDiffViewer from 'react-diff-viewer';
import { v4 as uuidv4 } from 'uuid';
import TextareaAutosize from 'react-textarea-autosize';

const oldCode = `
ip access-list extended voip_wc_out_20200109
 remark Required for HSRP hello packets
 permit udp 224.0.0.0 0.255.255.255 172.18.176.0 0.0.7.255
 remark Allow DNS lookups
 permit udp 164.67.128.0 0.0.0.15 eq domain 172.18.176.0 0.0.7.255
 permit tcp 164.67.128.0 0.0.0.15 eq domain 172.18.176.0 0.0.7.255
 permit udp 128.97.128.0 0.0.0.15 eq domain 172.18.176.0 0.0.7.255
 permit tcp 128.97.128.0 0.0.0.15 eq domain 172.18.176.0 0.0.7.255
 remark Allow DHCP servers
 permit udp 172.18.176.0 0.0.7.255 eq bootps host 0.0.0.0 eq bootps
 permit udp 164.67.128.16 0.0.0.15 172.18.176.0 0.0.7.255
 remark Allow CUCM Cluster and Voice Gateways access to IP phones
 permit ip 172.18.1.0 0.0.0.31 172.18.176.0 0.0.7.255
 remark Allow IP phones access to other IP phones
 permit udp 172.18.0.0 0.0.255.255 172.18.176.0 0.0.7.255 range 16384 32767
 remark Allow VoIP Applications servers access to IP phones
 permit ip 169.232.46.244 0.0.0.1 172.18.176.0 0.0.7.255
 permit ip 169.232.47.244 0.0.0.1 172.18.176.0 0.0.7.255
 remark Allow VoIP phones access to phones on SIP network
 permit ip 169.232.46.56 0.0.0.1 172.18.176.0 0.0.7.255
 permit tcp host 169.232.184.126 172.18.176.0 0.0.7.255 eq 443
 permit tcp host 169.232.184.126 172.18.176.0 0.0.7.255 eq www
 permit tcp host 164.67.132.29 172.18.176.0 0.0.7.255 eq 443
 permit tcp host 164.67.132.29 172.18.176.0 0.0.7.255 eq www
 permit ip host 169.232.33.134 172.18.176.0 0.0.7.255
 permit ip host 169.232.33.141 172.18.176.0 0.0.7.255
 permit ip 172.18.1.96 0.0.0.15 172.18.176.0 0.0.7.255
 permit ip 172.21.247.0 0.0.0.15 172.18.176.0 0.0.7.255
 remark Allow Jumper Server SR00196611
 remark Allow CUCM Cluster and Voice GWs, Exp-C, Voip Proxy and DN server access to IP phones
 permit ip 172.18.1.0 0.0.0.255 172.18.176.0 0.0.7.255
 deny   ip any any

`;
const newCode = `
ip access-list extended voip_wc_out_20200109n
 remark Required for HSRP hello packets
 permit udp 224.0.0.0 0.255.255.255 172.18.176.0 0.0.7.255
 remark Allow DNS lookups
 permit udp 164.67.128.0 0.0.0.15 eq domain 172.18.176.0 0.0.7.255
 permit tcp 164.67.128.0 0.0.0.15 eq domain 172.18.176.0 0.0.7.255
 permit udp 128.97.128.0 0.0.0.15 eq domain 172.18.176.0 0.0.7.255
 permit tcp 128.97.128.0 0.0.0.15 eq domain 172.18.176.0 0.0.7.255
 remark Allow DHCP servers
 permit udp 172.18.176.0 0.0.7.255 eq bootps host 0.0.0.0 eq bootps
 permit udp 164.67.128.16 0.0.0.15 172.18.176.0 0.0.7.255
 remark Allow CUCM Cluster and Voice Gateways access to IP phones
 permit ip 172.18.1.0 0.0.0.31 172.18.176.0 0.0.7.255
 remark Allow Expressway-C Jabber to IP phones
 permit ip 172.18.11.64 0.0.0.15 172.18.176.0 0.0.7.255
 remark Allow IP phones access to ASA VoIP Proxy Public
 permit ip 169.232.59.0 0.0.0.31 172.18.176.0 0.0.7.255
 remark Allow IP phones access to other IP phones
 permit udp 172.18.0.0 0.0.255.255 172.18.176.0 0.0.7.255 range 16384 32767
 remark Allow VoIP Applications servers access to IP phones
 permit ip 169.232.46.244 0.0.0.1 172.18.176.0 0.0.7.255
 permit ip 169.232.47.244 0.0.0.1 172.18.176.0 0.0.7.255
 remark Allow VoIP phones access to phones on SIP network
 permit ip 169.232.46.56 0.0.0.1 172.18.176.0 0.0.7.255
 permit tcp host 169.232.184.126 172.18.176.0 0.0.7.255 eq 443
 permit tcp host 169.232.184.126 172.18.176.0 0.0.7.255 eq www
 permit tcp host 164.67.132.29 172.18.176.0 0.0.7.255 eq 443
 permit tcp host 164.67.132.29 172.18.176.0 0.0.7.255 eq www
 permit ip host 169.232.33.134 172.18.176.0 0.0.7.255
 permit ip host 169.232.33.141 172.18.176.0 0.0.7.255
 permit ip 172.18.1.96 0.0.0.15 172.18.176.0 0.0.7.255
 permit ip 172.21.247.0 0.0.0.15 172.18.176.0 0.0.7.255
 remark Allow Jumper Server SR00196611
 remark Allow CUCM Cluster and Voice GWs, Exp-C, Voip Proxy and DN server access to IP phones
 permit ip 172.18.1.0 0.0.0.255 172.18.176.0 0.0.7.255
 deny   ip any any

`;

function Devices() {
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
        helpers.cisco_get()
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
                    <DevicesTable inv={[ { 'id': 1, 'upc': 123 }, {'id': 2, 'upc': <Button>Press</Button> }]}/>
                </Row>
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

export default Devices
