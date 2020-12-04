import React from 'react'
import { Card } from 'react-bootstrap';


function LLCard({ title="Card Title", children="children" }) {
    return (
        <Card style={{ paddingTop: '15px', height: '100%' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title>{ title }</Card.Title>
                { children }
            </Card.Body>
        </Card>
    )
}

export default LLCard
