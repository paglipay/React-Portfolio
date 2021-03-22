import React, { useState, useEffect } from 'react'
import { Row, Col, Tabs, Tab, ButtonGroup, Button, Table, Accordion, Card } from 'react-bootstrap'
import axios from "axios";
import PromptWindow from './PromptWindow'
import LLModal from '../LobbyLogin/components/LLModal'
// import API from "../../utils/API";

function DTree2({ id }) {
    const [dtree, setDtree] = useState({ "id": "0", "output": [<h1>LOADING...</h1>], "prompt_request": [], "sending": [] })
    const [key, setKey] = useState('profile');

    useEffect(() => {
        sendDtree(id)
        // loadDtree(id)
    }, [])

    let myVar;
    const showLoop = (id) => {
        myVar = setInterval(() => loadDtree(id), 1000)
    }

    const loadDtree = (id) => {
        console.log('loadDtree')
        axios.get("/api/dtree/start/" + id)
            .then(res => {
                setDtree({ "id": id, "output": res.data.ParamikoObj, "prompt_request": res.data.prompt_request, "sending": res.data.sending })
            })
            .catch(err => console.log(err));
    };

    const sendDtree = (id) => {
        console.log('sendDtree')
        showLoop(id)
        const d = {
            "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo (PASSCODE): '], "jobs": [
                "./my_packages/ParamikoObj/1.json",
            ]
        }
        axios.post("/api/dtree/start/" + id, d)
            .then(res => {
                // console.log(res.data)
                clearInterval(myVar)
                setDtree({ "id": id, "output": res.data.ParamikoObj, "prompt_request": res.data.prompt_request, "sending": res.data.sending })

            })
            .catch(err => {
                console.log(err)
                clearInterval(myVar)
            });
    };

    return (
        <>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="Home">

                </Tab>
                <Tab eventKey="profile" title="Profile">
                    <Row>
                        <Col lg="12">
                            <h2>{id}</h2>
                            <div>
                                <pre id={"yourDivID-" + id} style={{ "backgroundColor": "black", "color": "greenyellow", "fontFamily": "monospace" }}>
                                    {dtree['output'] ? dtree['output'].map((d, i) => d ? d : <h2>LoadingHere too...</h2>) : <h1>Loading123...</h1>}
                                </pre>
                            </div>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="contact" title="Contact">
                    <Row>
                        <Col lg="12">
                            <h4>Command(s) Sent:</h4>
                            <Accordion defaultActiveKey="0">
                                {dtree['sending'] ? dtree['sending'].map((s, i) => s ?
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey={i + 1}>
                                                {s['send']}
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={i + 1}>
                                            <Card.Body>{s['recv'].includes(".png") ? <img width="100%" src={s['recv']}></img> : <pre>{s['recv']}</pre>}</Card.Body>
                                        </Accordion.Collapse>
                                    </Card> : <h2>LoadingHere too...</h2>) : <h1>Loading...</h1>}
                            </Accordion>
                            {dtree['prompt_request'] ? dtree['prompt_request'].map((p, i) => p ? <><PromptWindow name={p} /></> : <h2>LoadingHere too...</h2>) : <h1>Loading...</h1>}
                        </Col>
                    </Row>

                </Tab>
            </Tabs>

        </>
    )
}

export default DTree2
