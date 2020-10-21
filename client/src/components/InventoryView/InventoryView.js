import React from 'react'
import { Table, Button } from 'react-bootstrap'

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

function InventoryView({ inv }) {

  const getTableBodyAsReactElement = () => {
    // let inv = [{ 'id': 'id', 'upc': 'upc' }, { 'id': 1, 'upc': 123 }, {'id': 2, 'upc': <Button>Press</Button> }];

    return (!inv) ? null : (
      <>
        {/* <div style={{ overflow: 'auto', height: '600px' }}> */}
          <thead>
            <tr><th>controls</th><th>id</th><th>configs</th></tr>
          </thead>
          <tbody>
            {inv.map((item) => {                                // changed here
              // console.log('item: ', item);
              return (
                <>
                  {/* <tr><th></th><th></th><th><Button size="sm">Edit</Button> <Button size="sm" className="btn-danger">Reset</Button></th></tr> */}
                  <tr key={item.id + Math.floor(Math.random() * 10000)} >
                    <td>
                      {/* <Button size="sm" key={item.id + "1"}>Send to 1</Button><br /><br /><Button key={item.id + "2"} size="sm" >Send to 2</Button> */}
                    </td>
                    {Object.entries(item).map((field) => {        // changed here
                      // console.log('field: ', field);
                      // return <td key={field[1]}><pre><a style={{ textDecoration: "underline" }} onMouseEnter={() => console.log('IN')} onMouseLeave={() => console.log('out')}>{field[1]}</a></pre></td>
                      return <td key={field[1]}><pre onClick={(e) => { e.target.innerHTML = parseConfig(e.target.innerHTML) }}>{field[1]}</pre></td>
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        {/* </div> */}
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
