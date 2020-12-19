import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, Badge, Card, Button, Spinner, Form } from 'react-bootstrap'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function DynamicForm({
    setCards,
    cards,
    colSize,
    src = `https://source.unsplash.com/1600x900/`,
    id,
    toggleS,
    setSize,
    header = "Featured",
    title = "Card Title",
    body = `
    Some quick example text to build on the card title and make up the bulk of
    the card's content.`,
    formItemsCollection = []
}) {
    const [formCounter, setFormCounter] = useState(0);
    const [output, setOutput] = useState();
    const [badgeStatus, setBadgeStatus] = useState('info');
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
                "./my_packages/ParamikoObj/2.json",
            ]
        },
        {
            "jobs": [
                "./my_packages/ParamikoObj/3.json",
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
    // const [formItemsCollection, setFormItemsCollection] = useState(formItemsCollection)
    const [formItems, setFormItems] = useState([
        // { "id": "./json/excel/excel_dev_list.txt", "value": "" },
    ]);

    useEffect(() => {
        console.log('colSize: ', colSize)
    }, [colSize])

    useEffect(() => {
        console.log(submitData)
    }, [submitData])

    useEffect(() => {
        console.log(formCounter)
        setFormItems(formItemsCollection[formCounter]['items'])
    }, [formCounter])

    let myVar;
    const showLoop = (id) => {
        myVar = setInterval(() => loadDtree(id), 10000)
    }

    const loadDtree = (id) => {
        console.log('loadDtree')
        axios.get("/api/dtree/start/" + id)
            .then(res => {
                let o_arry = res.data.ParamikoObj.map(e => e.split('\n'))
                let t_arry = [].concat.apply([], o_arry)
                // console.log(t_arry)
                // console.log(t_arry.slice(t_arry.length - 5, t_arry.length))
                setOutput([t_arry.slice(t_arry.length - 15, t_arry.length).join('\n')])
            })
            .catch(err => console.log(err));
    };

    const startPost = (id, d = { "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo custom_entry STUFF 1234'], "Code": [''] }) => {
        console.log('startPost')
        showLoop(id)
        setFormItems()
        setBadgeStatus('warning')
        // const d = { "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo custom_entry STUFF 1234'] }
        axios.post("/api/dtree/start/" + id, d)
            .then(res => {
                console.log(res.data)
                clearInterval(myVar)
                setFormCounter(formCounter + 1)

                if (res.data.hasOwnProperty('ParamikoObj')) {
                    let o_arry = res.data.ParamikoObj.map(e => e.split('\n'))
                    let t_arry = [].concat.apply([], o_arry)
                    // console.log(t_arry)
                    // console.log(t_arry.slice(t_arry.length - 5, t_arry.length))
                    setOutput([t_arry.join('\n')])
                }
                setBadgeStatus('success')
            })
            .catch(err => {
                console.log(err)
                clearInterval(myVar)
                setBadgeStatus('danger')
                setFormItems([])
            });
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
            <Card.Header as="h5" onClick={() => toggleS(setSize)}>{header}<Badge variant={badgeStatus} style={{ float: 'right' }}>{badgeStatus.charAt(0).toUpperCase() + badgeStatus.slice(1)}</Badge>{' '}</Card.Header>

            {output ? output.map((d, i) => <pre style={{ "height": 250, "backgroundColor": "black", "color": "greenyellow", "fontFamily": "monospace" }}>{d}</pre>) : <Card.Img variant="top" src={src} />}
            <Card.Body>
                <Row>
                    <Col lg={colSize !== 4 ? 6 : 12}>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {body}
                        </Card.Text>
                    </Col>
                    <Col>
                        {/* <h1>UUID:{sessionId}</h1> */}
                        <Form>
                            {formItems ? formItems.map((d, i) => {
                                if (d.type === 'textarea') {
                                    return (<React.Fragment key={`frag-${d.id}`}>
                                        {/* <h1>{d.id}</h1> */}
                                        <Form.Group key={`fg-${d.id}`} controlId={`${d.id}`}>
                                            <Form.Label key={`fl-${d.id}`}><h4 key={`h2-${d.id}`}>{d.id}</h4></Form.Label>
                                            <Form.Control key={`fc-${d.id}`} key={`fc-${d.id}`} as="textarea" onChange={(e) => handleChange(e)} rows="3" style={{ height: 200 }} />
                                        </Form.Group>
                                    </React.Fragment>)
                                }
                                else if (d.type === 'password') {
                                    return (<React.Fragment key={`frag-${d.id}`}>
                                        {/* <h1>{d.id}</h1> */}
                                        <Form.Group key={`fg-${d.id}`} controlId={`${d.id}`}>
                                            <Form.Label key={`fl-${d.id}`}>{d.id}</Form.Label>
                                            {/* <Form.Control type="password" placeholder="Password" /> */}
                                            <Form.Control key={`fc-${d.id}`} key={`fc-${d.id}`} type="password" onChange={(e) => handleChange(e)} rows="3" />
                                        </Form.Group>
                                    </React.Fragment>)
                                }
                                else if (d.type === 'button') {
                                    return (<React.Fragment key={`frag-${d.id}`}>
                                        {/* <h5>{d.id}</h5> */}
                                        <Form.Group key={`fg-${d.id}`} controlId={`${d.id}`}>
                                            <Button
                                                style={{ float: 'right' }}
                                                onClick={() => startPost(sessionId, d.action)} size="lg">Next</Button>
                                            {/* <hr /> */}
                                        </Form.Group>
                                    </React.Fragment>)
                                }
                                else if (d.type === 'pre') {
                                    return (<React.Fragment key={`frag-${d.id}`}>
                                        <h4>{d.id}</h4>
                                        <pre>{d.value}</pre>
                                    </React.Fragment>)
                                }
                                else if (d.type === 'message') {
                                    return (<React.Fragment key={`frag-${d.id}`}>
                                        <h5>{d.name}</h5>
                                        <p>{d.value}</p>
                                    </React.Fragment>)
                                }
                                else {
                                    return (<React.Fragment key={`frag-${d.id}`}>
                                        {/* <h1>{d.id}</h1> */}
                                        <Form.Group key={`fg-${d.id}`} controlId={`${d.id}`}>
                                            <Form.Label key={`fl-${d.id}`}>{d.id}</Form.Label>
                                            {/* <Form.Control type="password" placeholder="Password" /> */}
                                            <Form.Control key={`fc-${d.id}`} key={`fc-${d.id}`} type="text" onChange={(e) => handleChange(e)} rows="3" />
                                        </Form.Group>
                                    </React.Fragment>)
                                }
                            }
                            ) : <><h4>Processing Order...</h4><Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner></>}
                        </Form>
                    </Col>
                </Row>

            </Card.Body>
            <Card.Footer className="text-muted">
                {/* <Button onClick={() => startPost(sessionId, submitData)}>Start 9 with POST</Button>
                <Button onClick={() => startPost(sessionId, defaultSubmits[1])}>Update 9 with POST</Button>
                <Button style={{ float: 'right' }} onClick={() => setCards(cards.filter(c => c.id !== id))}>Close</Button> */}
                {id}<Badge variant={badgeStatus} style={{ float: 'right' }}>{badgeStatus.charAt(0).toUpperCase() + badgeStatus.slice(1)}</Badge>{' '}
            </Card.Footer>
        </Card>

    )
}

export default DynamicForm
