import React, { useEffect } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

export default function ConfigsTable({ configData, fetchConfigs }) {
  useEffect(() => {
    fetchConfigs()
  }, [])
  return configData.loading ? (
    <h2>Loading</h2>
  ) : configData.error ? (
    <h2>{configData.error}</h2>
  ) : (
        <>
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
                placeholder="name"
                aria-label="Search"                
              />
            </div>
          </div>
          <Table>
            <tbody>
              {configData &&
                configData.configs &&
                configData.configs.map(user => <tr><td><Button>Open</Button></td><td><pre>{user._id} {user.name} </pre></td></tr>)}
            </tbody>
          </Table>
        </>
      )
}


