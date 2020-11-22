import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import axios from "axios";
// import API from "../../utils/API";

function DTree() {

    const [dtree, setDtree] = useState()
    const [dtrees, setDtrees] = useState([])

    useEffect(() => {
        // loadDtree()
        sendDtree(0)
        sendDtree(1)
        sendDtree(2)
        sendDtree(3)
        sendDtree(4)
        sendDtree(5)
    }, [])

    const loadDtree = () => {
        console.log('loadDtree')
        axios.get("/api/dtree/start")
            .then(res => {
                console.log(res.data)
                // setDtree(res.data.ParamikoObj)
                setDtrees(dtrees => [...dtrees, res.data.ParamikoObj])
            })
            .catch(err => console.log(err));
        // API.getAppointments()
        //     .then(res => console.log(res.data.results))
        //     .catch(err => console.log(err));
    };

    const sendDtree = (id) => {
        console.log('sendDtree')
        const d = { "key": "TEST" }
        axios.post("/api/dtree/start/" + id, d)
            .then(res => {
                console.log(res.data)
                // setDtree([res.data.ParamikoObj])
                setDtrees(dtrees => [...dtrees, res.data.ParamikoObj])
            })
            .catch(err => console.log(err));
    };


    return (
        <>
            <Row>
                {dtrees.length > 0 ?
                    dtrees.map(dtree =>
                        <Col>
                            <div>
                                <h1>DTree</h1>
                                {dtree ? dtree.map(d => <pre>{d}</pre>) : <h1>Loading...</h1>}
                            </div>
                        </Col>) : (<>
                            <Col><div style={{ "textAlign": "center" }}><h1>Loading...</h1>
                                <Spinner animation="border" role="status" size="lg">
                                    <span className="sr-only">Loading...</span>
                                </Spinner></div></Col>
                            <Col><div style={{ "textAlign": "center" }}><h1>Loading...</h1>
                                <Spinner animation="border" role="status" size="lg">
                                    <span className="sr-only">Loading...</span>
                                </Spinner></div></Col>
                            <Col><div style={{ "textAlign": "center" }}><h1>Loading...</h1>
                                <Spinner animation="border" role="status" size="lg">
                                    <span className="sr-only">Loading...</span>
                                </Spinner></div></Col>
                        </>)}
            </Row>
        </>
    )
}

export default DTree
