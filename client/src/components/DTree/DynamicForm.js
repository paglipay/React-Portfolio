import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, Badge, Card, Button, Spinner, Form } from 'react-bootstrap'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function DynamicForm({ toggleS, setSize }) {
    const [formCounter, setFormCounter] = useState(0);
    const [output, setOutput] = useState();
    const [sessionId, setSessionId] = useState(uuidv4());
    const [defaultSubmits, setDefaultSubmits] = useState([
        {
            // "./json/excel/excel_dev_list.txt": "br00f2n.luskin.ucla.net",
            "./json/excel/excel_dev_list.txt": 'br01f2.carnesalecommons.ucla.net',
            // "./CustomObj/CiscoObj/_accept_list.txt": configTextAreaVal,
            // "C:/Users/Paul Aglipay/Desktop/New folder/br00f2n.luskin.ucla.net.txt": configTextAreaVal,
            "jobs": [
                {
                    "import": "Key"
                },
                {
                    "True": [
                        {
                            "True": "./CustomObj/CiscoObj/create_cisco_json_test.json"
                        },
                        {
                            "True": "./CustomObj/CiscoObj/cisco_json_test_dev_list.json"
                        },
                        {
                            "False": "./CustomObj/CiscoObj/process_cisco_acls.json"
                        }
                    ]
                },
            ]
        },
        {
            "./CustomObj/CiscoObj/process_cisco_acls.json": [
                {
                    "import": "ExtendedAccessListObj"
                },
                {
                    "open": {
                        "src_net": "128.97.107.0/24",
                        "dest_net": "149.142.33.0/24"
                    }
                }
            ],
            "jobs": [
                {
                    "import": "Key"
                },
                "./CustomObj/CiscoObj/process_cisco_acls.json",
            ]
        },
        {
            "jobs": [
                "./my_packages/ParamikoObj/31.json",
            ]
        },
        {
            "jobs": [
                "./my_packages/ParamikoObj/32.json",
            ]
        },
        {
            "jobs": [
                "./my_packages/ParamikoObj/4.json",
            ]
        }
    ])
    const [submitData, setSubmitData] = useState({
        // "./json/excel/excel_dev_list.txt": "br00f2n.luskin.ucla.net",
        "./json/excel/excel_dev_list.txt": 'br01f2.carnesalecommons.ucla.net',
        // "./CustomObj/CiscoObj/_accept_list.txt": configTextAreaVal,
        // "C:/Users/Paul Aglipay/Desktop/New folder/br00f2n.luskin.ucla.net.txt": configTextAreaVal,
        "jobs": [
            {
                "import": "Key"
            },
            {
                "True": [
                    {
                        "True": "./CustomObj/CiscoObj/create_cisco_json_test.json"
                    },
                    {
                        "True": "./CustomObj/CiscoObj/cisco_json_test_dev_list.json"
                    },
                    {
                        "False": "./CustomObj/CiscoObj/process_cisco_acls.json"
                    }
                ]
            },
        ]
    });
    const [formItemsCollection, setFormItemsCollection] = useState([
        {
            id: 1,
            items: [
                { "id": "./json/excel/excel_dev_list.txt", "value": "", "type": "textarea" },
                { "id": 2, "value": "", "type": "button" },
            ]
        },
        {
            id: 2,
            items: [
                { "id": "PASSCODE", "value": "", "type": "text" },
                { "id": 3, "value": "", "type": "button" },
            ]
        },
        {
            id: 3,
            items: [
                { "id": "PASSCODE", "value": "", "type": "text" },
                { "id": 4, "value": "", "type": "button" },
            ]
        },
        {
            id: 4,
            items: [
                { "id": "Done", "value": "" },
            ]
        }
    ])
    const [formItems, setFormItems] = useState([
        // { "id": "./json/excel/excel_dev_list.txt", "value": "" },
    ]);

    useEffect(() => {
        console.log(submitData)
    }, [submitData])

    useEffect(() => {
        console.log(formCounter)
        setFormItems(formItemsCollection[formCounter]['items'])
    }, [formCounter])

    let myVar;
    const showLoop = (id) => {
        myVar = setInterval(() => loadDtree(id), 1000)
    }    
    
    const loadDtree = (id) => {
        console.log('loadDtree')
        axios.get("/api/dtree/start/" + id)
            .then(res => {                
                setOutput([res.data.ParamikoObj])
            })
            .catch(err => console.log(err));
    };

    const startPost = (id, d = { "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo custom_entry STUFF 1234'], "Code": [''] }) => {
        console.log('startPost')
        showLoop(id)
        setFormItems()
        // const d = { "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo custom_entry STUFF 1234'] }
        axios.post("/api/dtree/start/" + id, d)
            .then(res => {
                console.log(res.data)
                clearInterval(myVar)
                setFormCounter(formCounter + 1)
                setOutput([res.data.ParamikoObj])
            })
            .catch(err => console.log(err));
    }

    const handleChange = e => {
        // console.log(e.target.id)
        setSubmitData({
            ...submitData,
            [e.target.id]: e.target.value
        })
        // this.setState({ [e.target.name]: e.target.value });
    }

    return (

        <Card style={{ height: '100%' }}>
            <Card.Header as="h5" onClick={() => toggleS(setSize)}>Featured <Badge variant="success" style={{ float: 'right' }}>Success</Badge>{' '}</Card.Header>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                {output ? output.map((d, i) => <pre style={{ "height": 300, "backgroundColor": "black", "color": "greenyellow", "fontFamily": "monospace" }}>{d}</pre>):null}
                </Card.Text>
                {/* <h1>UUID:{sessionId}</h1> */}
                <Form>
                    {formItems ? formItems.map((d, i) => {
                        if (d.type === 'textarea') {
                            return (<React.Fragment key={`frag-${d.id}`}>
                                {/* <h1>{d.id}</h1> */}
                                <Form.Group key={`fg-${d.id}`} controlId={`${d.id}`}>
                                    <Form.Label key={`fl-${d.id}`}><h3 key={`h2-${d.id}`}>{d.id}</h3></Form.Label>
                                    <Form.Control key={`fc-${d.id}`} key={`fc-${d.id}`} as="textarea" onChange={(e) => handleChange(e)} rows="3" style={{ height: 200 }} />
                                </Form.Group>
                            </React.Fragment>)
                        }
                        else if (d.type === 'password') {
                            return (<React.Fragment key={`frag-${d.id}`}>
                                {/* <h1>{d.id}</h1> */}
                                <Form.Group key={`fg-${d.id}`} controlId={`${d.id}`}>
                                    <Form.Label key={`fl-${d.id}`}><h2 key={`h2-${d.id}`}>{d.id}</h2></Form.Label>
                                    {/* <Form.Control type="password" placeholder="Password" /> */}
                                    <Form.Control key={`fc-${d.id}`} key={`fc-${d.id}`} type="password" onChange={(e) => handleChange(e)} rows="3" />
                                </Form.Group>
                            </React.Fragment>)
                        }
                        else if (d.type === 'button') {
                            return (<React.Fragment key={`frag-${d.id}`}>
                                <h1>{d.id}</h1>
                                <Form.Group key={`fg-${d.id}`} controlId={`${d.id}`}>
                                    <Button onClick={() => startPost(sessionId, defaultSubmits[d.id])} size="lg">Next</Button>
                                </Form.Group>
                            </React.Fragment>)
                        }
                        else if (d.type === 'pre') {
                            return (<React.Fragment key={`frag-${d.id}`}>
                                <h1>{d.id}</h1>
                                <pre>{d.value}</pre>
                            </React.Fragment>)
                        }
                        else {
                            return (<React.Fragment key={`frag-${d.id}`}>
                                {/* <h1>{d.id}</h1> */}
                                <Form.Group key={`fg-${d.id}`} controlId={`${d.id}`}>
                                    <Form.Label key={`fl-${d.id}`}><h3 key={`h2-${d.id}`}>{d.id}</h3></Form.Label>
                                    {/* <Form.Control type="password" placeholder="Password" /> */}
                                    <Form.Control key={`fc-${d.id}`} key={`fc-${d.id}`} type="text" onChange={(e) => handleChange(e)} rows="3" />
                                </Form.Group>
                            </React.Fragment>)
                        }
                    }
                    ) : <><Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner><h1>Loading...</h1></>}
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">

                <Button onClick={() => startPost(sessionId, submitData)}>Start 9 with POST</Button>
                <Button onClick={() => startPost(sessionId, defaultSubmits[1])}>Update 9 with POST</Button>
                <Button onClick={() => startPost(sessionId, defaultSubmits[2])}>31</Button></Card.Footer>
        </Card>

    )
}

export default DynamicForm
