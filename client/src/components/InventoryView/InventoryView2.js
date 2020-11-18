import React from 'react'
import { Table } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';

function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        // if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(ipaddress)) {
        return (true)
    }
    // alert("You have entered an invalid IP address!")
    return (false)
}

function parseConfig(config) {
    // console.log(config)
    let cache = []
    let output = config
    const arryConfig = config.split(' ')
    arryConfig.forEach(e => {
        e = e.trim()
        console.log(e, ValidateIPaddress(e) && e !== '' && cache.includes(e, 0) === false)
        if (ValidateIPaddress(e) && e !== '' && cache.includes(e, 0) === false) {
            // console.log(e)
            output = output.replaceAll(` ${e} `, ` <a href="#" title="Access your profile here">${e}</a> `)
            output = output.replaceAll(` ${e}\n`, ` <a href="#" title="Access your profile here">${e}</a>\n`)
            cache.push(e)
        }
    })
    return output
}

function InventoryView({ inv, hd_inv, handleSearchChange }) {

    const getTableBodyAsReactElement = () => {
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
                                    onChange={handleSearchChange}
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
                                        onChange={handleSearchChange}
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
                                                onChange={handleSearchChange}
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
                                                <pre onClick={(e) => { e.target.innerHTML = parseConfig(e.target.innerHTML) }}>{item['id']}</pre>
                                        </td>
                                        <td>
                                                <pre onClick={(e) => { e.target.innerHTML = parseConfig(e.target.innerHTML) }}>{item['config']}</pre>
                                        </td>
                                        {hd_inv.map((field, i) => {
                                            return (<td key={index + '-' + i}>
                                                <pre onClick={(e) => { e.target.innerHTML = parseConfig(e.target.innerHTML) }}>{item[field]}</pre>
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
            <Table striped bordered hover responsive>
                {getTableBodyAsReactElement()}
            </Table>
        </>
    )
}

export default InventoryView
