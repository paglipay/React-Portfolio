import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import LLModal from '../LLModal'

function HaveAppointment() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Card.Text>
                HAVE APPOINTMENT
            </Card.Text>
            <Button variant="primary" onClick={handleShow}>
                Start
            </Button>
            < LLModal show={show} setShow={setShow} />
        </div>
    )
}

export default HaveAppointment
