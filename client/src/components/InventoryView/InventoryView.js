import React from 'react'
import { Table, Button } from 'react-bootstrap'
function InventoryView({ inv=[{ 'id': 'id', 'upc': 'upc' }, { 'id': 1, 'upc': 123 }, {'id': 2, 'upc': <Button>Press</Button> }] }) {

    const getTableBodyAsReactElement = () => {
        // let inv = [{ 'id': 'id', 'upc': 'upc' }, { 'id': 1, 'upc': 123 }, {'id': 2, 'upc': <Button>Press</Button> }];
        console.log('inv: ', inv);

        return (!inv) ? null : (
          <tbody>            
          {inv.map((item) => {                                // changed here
            console.log('item: ', item);
            return (
              <tr key={item.id}>
                {Object.entries(item).map((field) => {        // changed here
                  console.log('field: ', field);
                  return <td key={field[1]}><pre>{field[1]}</pre></td>
                })}
              </tr>
              
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
