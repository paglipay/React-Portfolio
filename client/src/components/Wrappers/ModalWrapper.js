import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function ModalWrapper({ show, setShow, children, title }) { 
    const handleClose = () => setShow(false);
    
    return (
        <>           
            <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
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

export default ModalWrapper
