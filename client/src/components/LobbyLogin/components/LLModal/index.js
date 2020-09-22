import React from 'react'
import { Modal, Button } from 'react-bootstrap';

// import VideoChat from "../../../ReactVideoChat/App";

function index(props) {    
    const handleClose = () => props.setShow(false);
    
    return (
        <>           
            <Modal show={props.show} onHide={handleClose} dialogClassName="modal-90w" >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default index
