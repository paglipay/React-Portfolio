import React, { useEffect } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

export default function ConfigsTable ({ configData, fetchConfigs }) {
  useEffect(() => {
    fetchConfigs()
  }, [])
  return configData.loading ? (
    <h2>Loading</h2>
  ) : configData.error ? (
    <h2>{configData.error}</h2>
  ) : (
    <Table>
      <thead>Configs List</thead>
      <tbody>
        {configData &&
          configData.configs &&
          configData.configs.map(user => <tr><td><pre>{user._id} {user.name} </pre></td></tr>)}
      </tbody>
    </Table>
  )
}


