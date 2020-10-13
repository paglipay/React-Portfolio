import React, { useState, useEffect, useRef } from 'react'
import { Tabs, Tab, Form, Container, Row, Col, Button } from 'react-bootstrap'
import helpers from './helpers'
import InventoryView from '../InventoryView/InventoryView'

const oldCode = `spanning-tree mode rapid-pvst
spanning-tree extend system-id
spanning-tree vlan 2-3,7-8,10,419,434,458,485,677-687,726,735 priority 24576
spanning-tree vlan 740,877 priority 24576
!s
vlan internal allocation policy ascending
!
vlan 2
 name br_mgmt_medplaza
!
vlan 3
 name br_aux_mgmt_medplaza
!
vlan 4
 name br_wlan_mgmt_medplaza
!
vlan 7
 name br_sonet_mgmt_medplaza
!
vlan 8
 name Cisco_Native_Vlan
!
vlan 10
 name br11fb-br12fb.medplaza
! 
interface Loopback0
    ip address 169.232.2.158 255.255.255.255
    ipv6 address 2607:F010:FFF:2:2E54:2DFF:FEB1:E0C1/128
    ipv6 ospf 52 area 57
!
interface FastEthernet0
    no ip address
    no ip route-cache
    shutdown
!
interface GigabitEthernet1/0/1
    description sw52fb.medplaza g1/1/2:MNS:B2-505
    switchport trunk encapsulation dot1q
    switchport trunk native vlan 8
    switchport mode trunk
!
interface GigabitEthernet1/0/2
    description sw53fb.medplaza
    switchport trunk encapsulation dot1q
    switchport trunk native vlan 8
    switchport mode trunk
!
interface GigabitEthernet1/0/3
    description sw11fb.rrumc Gi0/1
    switchport trunk encapsulation dot1q
    switchport trunk native vlan 8
    switchport mode trunk
`;
function Devices() {

    const [inventoryList, setInventoryList] = useState()
    const [configTextAreaVal, setConfigTextAreaVal] = useState(oldCode)
    const [ciscoKey, setCiscoKey] = useState('interface')
    const [ciscoKeys, setCiscoKeys] = useState(['interface', 'vlan'])

    const ciscoConfigTextArea = useRef(null);

    const process = (config_var) => {
        const configObj = helpers.cisco_parse(config_var)
        let out_inv
        out_inv = helpers.cisco_get(ciscoKey, configObj)
        let x
        let out = []
        for (x in helpers.cisco_get(ciscoKey, configObj)[ciscoKey]) {
            out.push({ id: x, config: out_inv[ciscoKey][x].config })
        }
        setInventoryList(out)
    }

    // useEffect(() => {  
    //     // process(config)
    // }, []);

    useEffect(() => {
        process(configTextAreaVal)
    }, [configTextAreaVal]);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h2>Configuration 1</h2>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Enter Configuration1 in Textarea</Form.Label>
                        <Form.Control as="textarea" ref={ciscoConfigTextArea} onChange={(e) => { setConfigTextAreaVal(e.target.value) }} rows="3" style={{ height: 200 }} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs
                        id="controlled-tab-example"
                        defaultActiveKey="profile">
                        {ciscoKeys && ciscoKeys.map(ck => <Tab key={ck} eventKey={ck} title={ck}>
                            <InventoryView inv={inventoryList} />
                        </Tab>
                        )}
                    </Tabs>
                </Col>
            </Row>
        </Container>
    )
}

export default Devices
