import React, { useState, useEffect, useRef } from 'react'
import { Tabs, Tab, Form, Container, Row, Col, Nav, Button } from 'react-bootstrap'
import helpers from './helpers'
import InventoryView from '../InventoryView/InventoryView'
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
// import { addTodoRequest } from '../../redux/ciscoConfig/thunks';

import { addConfigRequest } from '../../redux/ciscoConfig/actions';



function Devices({ xconfigs, onCreatePressed }) {
    const [inventoryLists, setInventoryLists] = useState({})
    const [configTextAreaVal, setConfigTextAreaVal] = useState('')
    const [configs, setConfigs] = useState([{ id: uuidv4(), config: 'oldConfig' }])
    const [ciscoKey, setCiscoKey] = useState('interface')
    const [ciscoKeys, setCiscoKeys] = useState([
        'hostname',
        'interface',
        'ip access-list extended',
        'access-list',
        'vlan',
        'spanning-tree',
        'switch',
        'router ospf',
        'router bgp',
        'line',
        'ntp',
        'snmp-server location',
        'snmp-server contact',
        // 'snmp-server', 
        'ip default-gateway'
    ])

    const ciscoConfigTextArea = useRef(null);

    function sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    const process = (config_var) => {
        const configObj = helpers.cisco_parse(config_var)
        let out_inv
        let x
        let t_objs = {}
        ciscoKeys.forEach(e => {
            out_inv = helpers.cisco_get(e, configObj)
            let out = []
            for (x in helpers.cisco_get(e, configObj)[e]) {
                out.push({
                    id: x,
                    config: out_inv[e][x].config
                })
            }
            out = sortByKey(out, 'id')
            t_objs[e] = out
        })
        console.log('t_objs: ', t_objs)
        setInventoryLists(t_objs)

    }

    useEffect(() => {
        setConfigTextAreaVal(configs[0].config)
        ciscoConfigTextArea.current.value = configTextAreaVal
        process(configTextAreaVal)
    }, []);

    useEffect(() => {
        process(configTextAreaVal)
    }, [configTextAreaVal]);

    const handleClick = () => {
        console.log('click')
        
        onCreatePressed({
            name: 'TEST',
            config: configTextAreaVal,
            data: inventoryLists
          });
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h2>Paste Cisco Configuration Here</h2>
                    <Button onClick={handleClick} >Save</Button>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Enter Configuration1 in Textarea</Form.Label>
                        <Form.Control as="textarea" ref={ciscoConfigTextArea} onChange={(e) => { setConfigTextAreaVal(e.target.value) }} rows="3" style={{ height: 200 }} value={configTextAreaVal} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column">
                                    {ciscoKeys && ciscoKeys.map(ck => <Nav.Item>
                                        <Nav.Link eventKey={ck}>{ck}</Nav.Link>
                                    </Nav.Item>
                                    )}
                                </Nav>
                            </Col>
                            <Col sm={10}>
                                <Tab.Content>
                                    {ciscoKeys && ciscoKeys.map(ck => <Tab.Pane key={ck} eventKey={ck} title={ck}>
                                        <InventoryView inv={inventoryLists[ck]} />
                                    </Tab.Pane>
                                    )}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                    {/* <Tabs
                        id="controlled-tab-example"
                        defaultActiveKey="profile">
                        {ciscoKeys && ciscoKeys.map(ck => <Tab key={ck} eventKey={ck} title={ck}>
                            <InventoryView inv={inventoryLists[ck]} />
                        </Tab>
                        )}
                    </Tabs> */}

                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    xconfigs: state.configs,
});

const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addConfigRequest(text)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Devices)
