import React, { useEffect } from "react";
import {
  Spinner,
  Row,
  Col,
  Button,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";
// import { XCircle, Folder2Open } from 'react-bootstrap-icons';
import { AiFillAppstore } from "react-icons/ai";

export default function CollectionsTable({
  collectionData,
  fetchCollections,
  onRemovePressed,
  onActivatePressed,
}) {
  useEffect(() => {
    fetchCollections();
  }, []);
  return collectionData.loading ? (
    <div style={{ textAlign: "center" }}>
      <Spinner animation="border" role="status" size="lg">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : collectionData.error ? (
    <h2>{collectionData.error}</h2>
  ) : (
    <>
      {/* <div className="searchbox">
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
          </div> */}
      <Table>
        <tbody>
          {collectionData &&
            collectionData.collections &&
            // collectionData.collections.slice().reverse().map((collection) => (
              collectionData.collections.map((collection) => (
              <tr key={collection._id}>
                <td>
                  {/* <InputGroup className="mb-3"> */}
                  {/* <InputGroup.Prepend> */}
                  {/* <InputGroup.Checkbox aria-label="Checkbox for following text input" /> */}
                  {/* <Button id={`b-col-${collection._id}`} key={`b-col-${collection._id}`} onClick={() => onActivatePressed(collection._id)}> */}
                  {/* <Folder2Open /> */}
                  {/* <AiFillDatabase /> */}
                  {/* </Button> */}
                  {/* <Button className="btn-danger" onClick={() => onRemovePressed(collection._id)}><XCircle /></Button> */}
                  {/* </InputGroup.Prepend> */}
                  <AiFillAppstore
                    size={50}
                    className="btn btn-primary"
                    id={`b-col-${collection._id}`}
                    key={`b-col-${collection._id}`}
                    onClick={() => onActivatePressed(collection._id)}
                  />
                  {/* <FormControl aria-label="Text input with checkbox" /> */}
                  {/* </InputGroup> */}
                </td>
                <td>{collection.name}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
