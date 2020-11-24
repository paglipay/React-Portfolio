import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import axios from "axios";
import DTree2 from './DTree2'
// import API from "../../utils/API";

function DTreeForm() {
    useEffect(() => {

    }, [])


    return (
        <>
            <Row>
                <Col>
                    <DTree2 key={7} id={7} />
                </Col>
                <Col>
                    <DTree2 key={0} id={0} />
                </Col>
                <Col>
                    <DTree2 key={1} id={1} />
                </Col>
                <Col>
                    <DTree2 key={3} id={3} />
                </Col>
            </Row>
        </>
    )
}

export default DTreeForm
