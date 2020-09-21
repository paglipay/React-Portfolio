import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import LLModal from '../LLModal'

function NoAppointment({ uuid_id }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Card.Text>
            NO APPOINTMENT 
            </Card.Text>           
            <Button variant="primary" onClick={handleShow}>
                Start
            </Button>
            < LLModal show={show} setShow={setShow} uuid_id={uuid_id}/>
        </div>
    )
}

export default NoAppointment
