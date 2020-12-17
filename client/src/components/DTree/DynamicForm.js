import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, Accordion, Card, Button, ButtonGroup, Badge, Form } from 'react-bootstrap'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function DynamicForm() {
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
            "jobs": [
                {
                    "import": "Key"
                },
                "./CustomObj/CiscoObj/process_cisco_acls.json",
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
    const [formItems, setFormItems] = useState([
        { "id": "./json/excel/excel_dev_list.txt", "value": "" },
        { "id": "./CustomObj/CiscoObj/_accept_list.txt", "value": "" },
        {
            "id": "jobs",
            "value": [
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
        }
    ]);

    useEffect(() => {
        console.log(submitData)
    }, [submitData])

    const startPost = (id, d = { "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo custom_entry STUFF 1234'], "Code": [''] }) => {
        console.log('startPost')
        // const d = { "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo custom_entry STUFF 1234'] }
        axios.post("/api/dtree/start/" + id, d)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    const handleChange = e => {
        console.log(e.target.id)
        setSubmitData({
            ...submitData,
            [e.target.id]: e.target.value
        })
        // this.setState({ [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Row>
                <h1>UUID:{sessionId}</h1>
                <Form>
                    {formItems && formItems.map((d, i) =>
                        (<React.Fragment key={`frag-${d.id}`}>
                            {/* <h1>{d.id}</h1> */}
                            <Form.Group key={`fg-${d.id}`} controlId={`${d.id}`}>
                                <Form.Label key={`fl-${d.id}`}><h2 key={`h2-${d.id}`}>{d.id}</h2></Form.Label>
                                <Form.Control key={`fc-${d.id}`} key={`fc-${d.id}`} as="textarea" onChange={(e) => handleChange(e)} rows="3" style={{ height: 200 }} />
                            </Form.Group>
                        </React.Fragment>)
                    )}

                    <Button onClick={() => startPost(sessionId, submitData)}>Start 9 with POST</Button>
                    <Button onClick={() => startPost(sessionId, defaultSubmits[1])}>Update 9 with POST</Button>
                </Form>
            </Row>
        </Container>
    )
}

export default DynamicForm
