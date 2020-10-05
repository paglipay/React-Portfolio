import React from 'react'
import { Card } from 'react-bootstrap';


function CardWrapper({ children }) {
    return (
        <Card style={{ paddingTop: '15px', height: '100%' }} >
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                {children}
            </Card.Body>
        </Card>
    )
}

export default CardWrapper
