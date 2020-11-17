import React, { useState, useEffect, useRef } from 'react'
import { Tabs, Tab, Form, Container, Row, Col, Nav, Button } from 'react-bootstrap'
import helpers from '../helpers'
import InventoryView from '../../InventoryView/InventoryView2'
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function Interfaces({ configData }) {
    const [configs, setConfigs] = useState([])
    const [breakItUp, setBreakItUp] = useState([
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
        )

    useEffect(() => {
        // console.log('Interfaces', configData)
        let output = []
        configData.configs.forEach(e => {
            // console.log(e)
            e.data.interface.forEach(i => {
                console.log(i)
                let output_dic = {"id": e.name.replace('hostname ', '') + ":" + i.id, "config": i.config}
                breakItUp.forEach(p => {
                    output_dic[p] = i[p]
                })
                output.push(output_dic)
            })
        })
        setConfigs(output)
    }, [configData]);

    return (
        <>
            <h1>Interfaces</h1>
            <InventoryView inv={configs} />
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
