import React, { useState, useEffect, useRef } from 'react'
import { Table } from 'react-bootstrap'
import CiscoHelpers from '../CiscoHelpers'
import { Button } from 'react-bootstrap'

function EACLs() {

    const [configs1, setConfigs1] = useState([1, 2, 3, 4])
    const [configs2, setConfigs2] = useState([1, 2, 3, 4])


    useEffect(() => {
        console.log('EACLs')
        console.log(CiscoHelpers.ExtendedAclObj('hi'))
        console.log(CiscoHelpers.compare_acl_entry('192.168.0.0/24', '192.168.0.0/24', 'permit 192.168.0.0 0.0.0.255 192.168.0.0 0.0.0.255'))
    }, []);

    const onClickHandle = e => {
        console.log('onClickHandle')
        console.log(CiscoHelpers.compare_acl_entry('192.168.0.0/24', '192.168.0.0/24', 'permit 192.168.0.0 0.0.0.255 192.168.0.0 0.0.0.255'))
    }

    const getTableBodyAsReactElement = (hd_inv, inv) => {
        // let inv = [{ 'id': 'id', 'upc': 'upc' }, { 'id': 1, 'upc': 123 }, {'id': 2, 'upc': <Button>Press</Button> }];
        return (!inv) ? null : (
            <>
                <thead>
                    <tr><th>controls</th><th>
                        <div className="searchbox">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="">
                                        Search
                                </span>
                                </div>
                                <input
                                    className="form-control mr-sm-2"
                                    type="search"
                                    name="id"
                                    placeholder="ID"
                                    aria-label="Search"
                                />
                            </div>
                        </div>
                    </th>
                        <th>
                            <div className="searchbox">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="">
                                            Search
                                        </span>
                                    </div>
                                    <input
                                        className="form-control mr-sm-2"
                                        type="search"
                                        name="config"
                                        placeholder="config"
                                        aria-label="Search"
                                    />
                                </div>
                            </div>
                        </th>
                        {hd_inv.map((item, i) => {
                            return (
                                <th key={i}>
                                    <div className="searchbox">
                                        <div className="input-group">
                                            {/* <div className="input-group-prepend">
                                                <span className="input-group-text" id="">
                                                    Search
                                                </span>
                                            </div> */}
                                            <input
                                                className="form-control mr-sm-2"
                                                type="search"
                                                name={item}
                                                placeholder={item}
                                                aria-label="Search"
                                            />
                                        </div>
                                    </div>
                                </th>
                            )
                            // return <th>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        inv.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>
                                            {/* <Button size="sm" key={item.id + "1"}>Send to 1</Button><br /><br /><Button key={item.id + "2"} size="sm" >Send to 2</Button> */}
                                        </td>
                                        <td>
                                            <pre >{item['id']}</pre>
                                        </td>
                                        <td>
                                            <pre >{item['config']}</pre>
                                        </td>
                                        {hd_inv.map((field, i) => {
                                            return (<td key={index + '-EACLs-' + i}>
                                                <pre >{item[field]}</pre>
                                            </td>)
                                        })}
                                    </tr>
                                </>
                            );
                        })}
                </tbody>
            </>
        );
    }

    return (
        <>
            <h1>EACLs</h1>
            <Button onClick={onClickHandle}>GO!</Button>
            <Table striped bordered hover responsive>
                {getTableBodyAsReactElement(configs1, configs1)}
            </Table>
        </>
    )

}

export default EACLs
