import React, { useState, useEffect, useRef } from 'react'
import { Button, Accordion, Card, Form } from 'react-bootstrap'
import helpers from '../helpers'
import InventoryView from '../../InventoryView/InventoryView2'
import { connect } from 'react-redux';

function Interfaces({ configData }) {
    const [configs, setConfigs] = useState([])
    const [filters, setFilters] = useState({})
    const [breakItUp, setBreakItUp] = useState([
        "interface",
        "description",
        "ip address",
        "network_id",
        "ip access-group",
        // "standby",
        // "switchport access vlan",
        // "switchport voice vlan",
        // "switchport",
        // "ip ospf",
        // "ipv6 address",
        // "ipv6 ospf",
        // "ipv6 traffic-filter",
        // "cdp",
        // "lldp",
        // "ip helper-address",
        // "shutdown",
        // "port-security",
        // "spanning-tree",
        // "dhcp snooping",
        // "arp inspection",
        // "vrf forwarding",
        // "service-policy"
    ]
    )

    useEffect(() => {
        // console.log('Interfaces', configData)
        let output = []
        configData.configs.forEach(e => {
            // console.log(e)
            e.data.interface.forEach(i => {
                // console.log(i)
                let output_dic = { "id": e.name.replace('hostname ', '') + ":" + i.id, "config": i.config.split('\n')[0] + '...' }
                breakItUp.forEach(p => {
                    output_dic[p] = i[p]
                })
                output.push(output_dic)
            })
        })
        setConfigs(output)
    }, [configData]);

    useEffect(() => {
        let output = []
        configData.configs.forEach(e => {
            // console.log(e)
            e.data.interface.forEach(i => {
                let output_dic = { "id": e.name.replace('hostname ', '') + ":" + i.id, "config": i.config }
                breakItUp.forEach(p => {
                    output_dic[p] = i[p]
                })
                output.push(output_dic)
            })
        })

        for (let k in filters) {
            // console.log(k + ' is ' + filters[k])
            output = output.filter(f => {
                if (filters[k] === '') { return true }
                let fk = f[k]
                let filtersk = filters[k]
                return fk.includes(filtersk)
            })
        }
        setConfigs(output)
    }, [filters]);

    const handleSearchChange = e => {
        // console.log('handleSearchChange:', e.target.name, e.target.value)
        setFilters({ ...filters, [e.target.name]: [e.target.value] })
    }

    return (
        <>
            <h1>Interfaces</h1>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Options
                            </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Example select</Form.Label>
                                    <Form.Control as="select">
                                        {breakItUp.map((item, i) => {
                                            // console.log('item: ', item);
                                            return <option key={i}>{item}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect2">
                                    <Form.Label>Example multiple select</Form.Label>
                                    <Form.Control as="select" multiple>
                                        {breakItUp.map((item, i) => {
                                            // console.log('item: ', item);
                                            return <option key={i}>{item}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Example textarea</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <InventoryView inv={configs} hd_inv={breakItUp} handleSearchChange={handleSearchChange} />
        </>
    )
}
const mapStateToProps = state => {
    return {
        configData: state.config
    }
}

const mapDispatchToProps = dispatch => ({
    // onCreatePressed: text => dispatch(addConfigRequest(text)),
    // onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Interfaces)
