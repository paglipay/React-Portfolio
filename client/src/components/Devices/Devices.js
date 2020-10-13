import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import helpers from './helpers'
import InventoryView from '../InventoryView/InventoryView'

const oldCode = `spanning-tree mode rapid-pvst
spanning-tree extend system-id
spanning-tree vlan 2-3,7-8,10,419,434,458,485,677-687,726,735 priority 24576
spanning-tree vlan 740,877 priority 24576
!
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
    const [config, setConfig] = useState(oldCode)
    const [ciscoKey, setCiscoKey] = useState('interface')
    const [ciscoKeys, setCiscoKeys] = useState(['interface', 'vlan'])
    const [key, setKey] = useState('interface');

    useEffect(() => {
        const configObj = helpers.cisco_parse(oldCode)
        const out_inv = helpers.cisco_get(ciscoKey, configObj)
        let x
        let out = []
        for (x in out_inv.interface) {
            out.push({ id: x, config: out_inv.interface[x].config })
        }
        setInventoryList(out)
    }, []);

    return (
        <>
            
            <Tabs
                id="controlled-tab-example"                
                defaultActiveKey="profile">
                {ciscoKeys && ciscoKeys.map(ck => <Tab key={ck} eventKey={ck} title={ck}>
                    <InventoryView inv={inventoryList} />
                </Tab>
                )}
            </Tabs>
        </>
    )
}

export default Devices
