import React, { useEffect } from 'react'
import { Spinner, Row, Col, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import { XCircle, Folder2Open } from 'react-bootstrap-icons';
export default function CollectionsTable({ collectionData, fetchCollections, onRemovePressed, onActivatePressed }) {
  useEffect(() => {
    fetchCollections()
  }, [])
  return collectionData.loading ? (
    <div style={{ "textAlign": "center" }}>
      <Spinner animation="border" role="status" size="lg">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : collectionData.error ? (
    <h2>{collectionData.error}</h2>
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
              {collectionData &&
                collectionData.collections &&
                collectionData.collections.map(collection => <tr key={collection._id}>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        {/* <InputGroup.Checkbox aria-label="Checkbox for following text input" /> */}
                        <Button onClick={() => onActivatePressed(collection._id)}><Folder2Open /></Button>
                        {/* <Button className="btn-danger" onClick={() => onRemovePressed(collection._id)}><XCircle /></Button> */}
                      </InputGroup.Prepend>
                      {/* <FormControl aria-label="Text input with checkbox" /> */}
                    </InputGroup>
                  </td>
                  <td>{collection.name}</td></tr>)}
            </tbody>
          </Table>
        </>
      )
}


