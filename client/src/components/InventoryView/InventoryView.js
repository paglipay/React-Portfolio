import React from 'react'
import { Table, Button } from 'react-bootstrap'
function InventoryView({ inv = [{ 'id': 'id', 'upc': 'upc' }, { 'id': 1, 'upc': 123 }, { 'id': 2, 'upc': <Button>Press</Button> }] }) {

  const getTableBodyAsReactElement = () => {
    // let inv = [{ 'id': 'id', 'upc': 'upc' }, { 'id': 1, 'upc': 123 }, {'id': 2, 'upc': <Button>Press</Button> }];
    console.log('inv: ', inv);

    return (!inv) ? null : (
      <tbody>
        <tr><th>controls</th><th>id</th><th>configs</th></tr>
        {inv.map((item) => {                                // changed here
          // console.log('item: ', item);
          return (
            <>
              <tr><th></th><th></th><th><Button size="sm">Edit</Button> <Button size="sm" className="btn-danger">Reset</Button></th></tr>
              <tr key={item.id}>
                <td>
                  <Button size="sm">Send to 1</Button><br /><br /><Button size="sm">Send to 2</Button>
                </td>
                {Object.entries(item).map((field) => {        // changed here
                  // console.log('field: ', field);
                  return <td key={field[1]}><pre>{field[1]}</pre></td>
                })}
              </tr>
            </>
          );
        })}
      </tbody>
    );
  }

  return (
    <Table striped bordered hover>
      {getTableBodyAsReactElement()}
    </Table>
  )
}

export default InventoryView
