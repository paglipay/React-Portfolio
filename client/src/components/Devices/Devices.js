import React, { useState, useEffect, useRef } from 'react'
import { Tabs, Tab, Form, Container, Row, Col, Nav, Button } from 'react-bootstrap'
import helpers from './helpers'
import InventoryView from '../InventoryView/InventoryView'
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
// import { addTodoRequest } from '../../redux/ciscoConfig/thunks';

import { addConfigRequest } from '../../redux/ciscoConfig/actions';

function Devices({ configData, onCreatePressed }) {
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
    const [breakItUp, setBreakItUp] = useState([
        {
            key: 'interface',
            list: [
                "interface",
                "description",
                "ip address",
                "ip access-group",
                "standby",
                "switchport access vlan",
                "switchport voice vlan",
                "switchport",
                "ip ospf",
                "ipv6 address",
                "ipv6 ospf",
                "ipv6 traffic-filter",
                "cdp",
                "lldp",
                "ip helper-address",
                "shutdown",
                "port-security",
                "spanning-tree",
                "dhcp snooping",
                "arp inspection",
                "vrf forwarding",
                "service-policy"
            ]
        },
        {
            key: 'vlan',
            list: [
                "vlan",
                "name"
            ]
        },
        {
            key: 'class-map',
            list: [
                "class-map",
                "match access-group name"
            ]
        },
        {
            key: 'crypto',
            list: [
                "crypto",
                "match ip address"
            ]
        }
    ])

    const [configName, seConfigName] = useState('QWE')

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
                let configObj = {
                    id: x,
                    config: out_inv[e][x].config
                }

                let configList = out_inv[e][x].config.split('\n')
                console.log(configList)

                let properties_list = []
                // let properties_list = breakItUp.find(b => b.key === e).list
                if (breakItUp.find(b => b.key === e) !== undefined) {
                    properties_list = breakItUp.find(b => b.key === e).list
                }
                console.log(e, ':', properties_list)
                if (Array.isArray(properties_list)) {
                    properties_list.forEach(p => {                        
                        let c_res = ''
                        let l_res = []                        
                        configList.forEach(l => {
                            if (l.includes(p)) {
                                c_res += l + '\n'
                                l_res.push(l)
                            }
                        })
                        configObj[p] = c_res
                        console.log(p, ':---->', c_res)
                    })
                }
                out.push(configObj)
            }
            out = sortByKey(out, 'id')
            t_objs[e] = out
        })
        setInventoryLists(t_objs)

        if (t_objs && t_objs.hostname && t_objs.hostname[0] && t_objs.hostname[0].config) {
            seConfigName(t_objs.hostname[0].config)
            console.log('t_objs: ', t_objs)
        }


    }
    // useEffect(() => {
    //     ciscoConfigTextArea.current.value = configTextAreaVal
    //     process(configTextAreaVal)
    // }, []);
    useEffect(() => {
        console.log('configData.activeConfig.config: ', configData.activeConfig)
        if (configData.activeConfig && configData.activeConfig.config) {
            setConfigTextAreaVal(configData.activeConfig.config)
        }
    }, [configData]);

    useEffect(() => {
        process(configTextAreaVal)
    }, [configTextAreaVal]);

    const handleClick = () => {
        console.log('click')
        setConfigTextAreaVal('')
        onCreatePressed({
            name: configName,
            data: inventoryLists,
            config: configTextAreaVal
        });
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h2>Paste Cisco Configuration Here</h2>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Enter Configuration1 in Textarea</Form.Label>
                        <Form.Control as="textarea" ref={ciscoConfigTextArea} onChange={(e) => { setConfigTextAreaVal(e.target.value) }} rows="3" style={{ height: 200 }} value={configTextAreaVal} />
                    </Form.Group>
                    <Button onClick={handleClick} >Save</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column">
                                    {ciscoKeys && ciscoKeys.map(ck => <Nav.Item key={ck}>
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

const mapStateToProps = state => {
    return {
        configData: state.config
    }
}

const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addConfigRequest(text)),
    // onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices)
