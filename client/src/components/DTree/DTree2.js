import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import axios from "axios";
// import API from "../../utils/API";

function DTree2({ id }) {

    const [dtreeobjs, setDtreeobjs] = useState({ '0': { "ParamikoObj": ['HELLO'] } })
    const [dtrees, setDtrees] = useState([{ "id": "0", "output": ['BYE'] }])

    useEffect(() => {
        sendDtree(id)
    }, [])

    let myVar = {};
    const showLoop = (id) => {
        myVar[id] = setInterval(() => loadDtree(id), 1000)
    }

    useEffect(() => {
    }, [dtreeobjs])

    const loadDtree = (id) => {
        console.log('loadDtree')
        axios.get("/api/dtree/start/" + id)
            .then(res => {
                // console.log(res.data)
                setDtrees([{ "id": id, "output": res.data.ParamikoObj }])
            })
            .catch(err => console.log(err));
    };

    const sendDtree = (id) => {
        console.log('sendDtree')
        showLoop(id)
        const d = { "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo (PASSCODE): '] }
        axios.post("/api/dtree/start/" + id, d)
            .then(res => {
                // console.log(res.data)
                setDtrees([{ "id": id, "output": res.data.ParamikoObj }])
                clearInterval(myVar[id]);
            })
            .catch(err => console.log(err));
    };


    return (
        <>
            <h1>{dtreeobjs['0']['ParamikoObj']}</h1>
            <Row>
                {dtrees.length > 0 ?
                    dtrees.map(dtree =>
                        <Col>
                            <pre>
                                <h1>DTree</h1>
                                {dtree ? dtree['output'].map((d, i) => d ? <>{d}</> : <h2>LoadingHere too...</h2>) : <h1>Loading...</h1>}
                            </pre>
                        </Col>) : (<>
                            <Col><div style={{ "textAlign": "center" }}><h1>Loading...</h1>
                                <Spinner animation="border" role="status" size="lg">
                                    <span className="sr-only">Loading...</span>
                                </Spinner></div></Col>
                        </>)}
            </Row>
        </>
    )
}

export default DTree2
