import React, { useEffect } from 'react'
import { Spinner, Row, Col, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import { XCircle, Folder2Open } from 'react-bootstrap-icons';
export default function ConfigsTable({ configData, fetchConfigs, onRemovePressed, onActivatePressed }) {
  useEffect(() => {
    fetchConfigs()
  }, [])
  return configData.loading ? (
    <div style={{ "textAlign": "center" }}>
      <Spinner animation="border" role="status" size="lg">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
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
                configData.configs.map(config => <tr key={config._id}>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                        <Button onClick={() => onActivatePressed(config._id)}><Folder2Open /></Button>
                        <Button className="btn-danger" onClick={() => onRemovePressed(config._id)}><XCircle /></Button>
                      </InputGroup.Prepend>
                      {/* <FormControl aria-label="Text input with checkbox" /> */}
                    </InputGroup>
                  </td>
                  <td><pre>{config.name} </pre></td></tr>)}
            </tbody>
          </Table>
        </>
      )
}


