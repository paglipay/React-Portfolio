import React, { useState } from 'react'
import { Table } from 'react-bootstrap'

function DTable({ data }) {
    console.log(data)

    // const [tableData, setTableData] = useState(data)

    // useEffect(() => {
    //     console.log(formCounter)
    //     setFormItems(formItemsCollection[formCounter]['form_items'])
    // }, [formCounter])

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>o</th>
                        <th>o</th>
                        <th>o</th>
                    </tr>
                </thead>
                <tbody>
                    {data ? data['_list'].map((e, i) => {

                        const e_targets = e.target_nets.map((t, i) => {
                            return (<td key={i}>{t.status.source.length ? <>x</>: <>o</>}</td>)
                        }
                        )

                        return (
                            <tr key={i}>
                                <td>z</td>
                                {e_targets ? e_targets : null}
                            </tr>)
                    }
                    ) : null}
                </tbody>
            </Table>
        </>
    )
}

export default DTable
