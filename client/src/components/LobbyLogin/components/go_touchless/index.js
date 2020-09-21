import React, { useState } from 'react'
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from 'uuid';
import { Card } from 'react-bootstrap';

function GoTouchless({ uuid_id }) {
    return (
        <>
        <Card.Text>
            <h1>UUID:{`${uuid_id}`}</h1>
            <a href={`${window.origin}/touchlesslogin/${uuid_id}`}>
                <QRCode value={`${window.origin}/touchlesslogin/${uuid_id}`} />
            </a>
            </Card.Text>
        </>
    )
}

export default GoTouchless
