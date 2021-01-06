import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, ListGroup, Accordion, Card, Button, ButtonGroup, Badge, Form } from 'react-bootstrap'
import axios from "axios";
import DTree2 from './DTree2'
import DynamicForm from './DynamicForm'
import LLCard from '../LobbyLogin/components/LLCard'
import { XCircle, Folder2Open } from 'react-bootstrap-icons';
// import API from "../../utils/API";
import { v4 as uuidv4 } from 'uuid';
import Collections from '../DTree/containers/CollectionsTable'
import { connect } from 'react-redux';
import { addCollectionRequest } from '../../redux/collection/actions';

function DTreeForm({ collectionData }) {
    const [tasks, setTasks] = useState([])
    const [configTextAreaVal, setConfigTextAreaVal] = useState('')
    const ciscoConfigTextArea = useRef(null);
    const [colSizes, setColSizes] = useState([4, 4, 4, 8, 4, 4, 8, 4, 4, 4])
    const [cards, setCards] = useState([])
    const [formItemsCollection, setFormItemsCollection] = useState([{
        id: "0",
        name: "Test (3) servers",
        form_items: [
            {
                "id": "f00",
                "name": "Begin Demo2",
                "value": "Would you like a demo2",
                "type": "message"
            },
            {
                "id": "f01",
                "name": "ip",
                "value": "Enter ip",
                "type": "text"
            },
            {
                "id": "f02",
                "name": "username",
                "value": "Enter Username",
                "type": "text"
            },
            {
                "id": "f03",
                "name": "password",
                "value": "Enter Code",
                "type": "text"
            },
            {
                "id": "f04",
                "name": "send_cmd",
                "value": "Enter Command",
                "type": "text"
            },
            {
                "id": "f05",
                "name": "Next",
                "value": "Next",
                "type": "button",
                "action": {
                
                    "form_items_to_dic": {
                        "form_items": [
                            'ip',
                            'username',
                            'password',
                            'send_cmd'
                        ],
                        "to_dic_name": "./json/paramiko/ubuntu/open/form_dic.json"
                    },
                    "jobs": [
                        {
                            "import": "Key"
                        },
                        {
                            "True": "./start.json"
                        }
                    ]
                }
            }
        ]
    },
    {
        id: "2",
        name: "2",
        form_items: [
            { "id": "Done", "name": "Done", "value": "This is completed. Would you like to email yourself the results?", "type": "message" }
        ]
    }])

    // const formItemsCollection = [
    //     {
    //         id:"0",
    //         name: "Test (3) servers",
    //         form_items: [
    //             {
    //                 "id":"f00",
    //                 "name": "Begin Demo2",
    //                 "value": "Would you like a demo2",
    //                 "type": "message"
    //             },
    //             {
    //                 "id":"f01",
    //                 "name": "Code",
    //                 "value": "Enter Code",
    //                 "type": "text"
    //             },
    //             {
    //                 "id":"f02",
    //                 "name": "Next",
    //                 "value": "Next",
    //                 "type": "button",
    //                 "action": {
    //                     "jobs": [
    //                         {
    //                             "import": "Key"
    //                         },
    //                         {
    //                             "False": "./my_packages/ParamikoObj/1.json"
    //                         },
    //                         {
    //                             "False": "./my_packages/ParamikoObj/2.json"
    //                         },
    //                         {
    //                             "False": "./my_packages/ParamikoObj/3.json"
    //                         }
    //                     ]
    //                 }
    //             }
    //         ]
    //     },
    //     {
    //         id:"1",
    //         name: 1,
    //         form_items: [
    //             { 
    //                 "id":"f10", "name": "Begin Demo?", "value": "Would you like a demo", "type": "message" },
    //             { 
    //                 "id":"f11", "value": "", "type": "text" },
    //             {
    //                 "id":"f12", "value": "Begin Demo", "type": "button", "action": {
    //                     "jobs": [
    //                         {
    //                             "import": "Key"
    //                         },
    //                         {
    //                             "False": "./start.json"
    //                         }
    //                     ]
    //                 }
    //             },
    //         ]
    //     },
    //     {
    //         id:"2",
    //         name: "2",
    //         form_items: [
    //             {
    //                 "id": "Begin Demo?", "name": "Step 1 - Testing Cisco Parse",
    //                 "value": "Testing cisco parse from a list of hostnames",
    //                 "type": "message"
    //             },
    //             { "id": "./json/excel/excel_dev_list.txt", "value": "", "type": "textarea" },
    //             {
    //                 "id": 3,
    //                 "value": "Step 1 - Process 192.168.2.82",
    //                 "type": "button",
    //                 "action": {
    //                     "jobs": [
    //                         {
    //                             "import": "Key"
    //                         },
    //                         {
    //                             "False": [
    //                                 {
    //                                     "True": "./CustomObj/CiscoObj/create_cisco_json_test.json"
    //                                 },
    //                                 {
    //                                     "True": "./CustomObj/CiscoObj/cisco_json_test_dev_list.json"
    //                                 },
    //                                 {
    //                                     "False": "./CustomObj/CiscoObj/process_cisco_acls.json"
    //                                 }
    //                             ]
    //                         },
    //                     ]
    //                 }
    //             },
    //         ]
    //     },
    //     {
    //         id:"3",
    //         name: "3",
    //         form_items: [
    //             {
    //                 "id": "Begin Demo?", "name": "Step 1 - Testing Cisco Parse",
    //                 "value": "Testing cisco parse from a list of hostnames",
    //                 "type": "message"
    //             },
    //             { "id": "src_net", "value": "", "type": "text" },
    //             { "id": "dest_net", "value": "", "type": "text" },
    //             {
    //                 "id": 4,
    //                 "value": "Step 1 - Process 192.168.2.82",
    //                 "type": "button",
    //                 "action": {
    //                     "./CustomObj/CiscoObj/process_cisco_acls.json": [
    //                         {
    //                             "import": "ExtendedAccessListObj"
    //                         },
    //                         // {
    //                         //     "open": {
    //                         //         "src_net": "128.97.107.0/24",
    //                         //         "dest_net": "149.142.33.0/24"
    //                         //     }
    //                         // }
    //                     ],
    //                     "jobs": [
    //                         {
    //                             "import": "Key"
    //                         },
    //                         "./CustomObj/CiscoObj/process_cisco_acls.json",
    //                     ]
    //                 }
    //             },
    //         ]
    //     },
    //     {
    //         id:"4",
    //         name: "4",
    //         form_items: [
    //             { "id": "Begin Demo?", "name": "Step 2 - Process 192.168.2.83", "value": "Step 2 - Process 192.168.2.83", "type": "message" },
    //             { "id": "Host", "value": "", "type": "text" },
    //             { "id": "Username", "value": "", "type": "text" },
    //             { "id": "PASSCODE", "value": "", "type": "text" },
    //             {
    //                 "id": 5, "value": "Step 2 - Process 192.168.2.83", "type": "button", "action": {
    //                     "jobs": [
    //                         "./my_packages/ParamikoObj/3.json",
    //                     ]
    //                 }
    //             },
    //         ]
    //     },
    //     {
    //         id:"5",
    //         name: "5",
    //         form_items: [
    //             { "id": "Begin Demo?", "name": "Begin Demo?", "value": "Step 3 - Process 192.168.2.32", "type": "message" },
    //             { "id": "PASSCODE", "value": <pre>{'pwd\nls -ls\nexit'}</pre>, "type": "text" },
    //             {
    //                 "id": 6, "value": "Step 3 - Process 192.168.2.32", "type": "button", "action": {
    //                     "jobs": [
    //                         "./my_packages/ParamikoObj/32.json",
    //                     ]
    //                 }
    //             },
    //         ]
    //     },
    //     {
    //         id:"6",
    //         name: "6",
    //         form_items: [
    //             { "id": "Done", "name": "Done", "value": "This is completed. Would you like to email yourself the results?", "type": "message" },
    //             { "id": "Email Results", "value": "", "type": "text" },
    //         ]
    //     }
    // ]



    const pictureCats = ['datacenter', 'facebook', 'python', 'beaches', 'city', 'nature', 'travel', 'calm', 'javascript']
    const toggleSizes = n => {
        setColSizes(colSizes.map((num, i) => i === n ? (num === 8 ? 4 : 8) : num))
    }

    useEffect(() => {
        // console.log('collectionData.activeCollection: ', collectionData.activeCollection)

        if (collectionData.activeCollection && collectionData.activeCollection.projects) {
            let t_arry = []
            let i = 0
            // for (let i = 0; i < 1; i++) {
            collectionData.activeCollection.projects.forEach(p => {
                const c_name = uuidv4()
                t_arry.push({
                    id: c_name,
                    src: `https://source.unsplash.com/1600x900/?${pictureCats[i]}`,
                    title: p.name,
                    header: 'Featured Project',
                    body: p.description,
                    formItemsCollection: p.forms
                })
                i += 1
            })
            setCards(t_arry)
        }
    }, [collectionData]);

    useEffect(() => {
        let t_arry = []
        for (let i = 0; i < 1; i++) {
            const c_name = uuidv4()
            t_arry.push({
                id: c_name,
                src: `https://source.unsplash.com/1600x900/?${pictureCats[i]}`,
                title: 'Test Ubuntu Servers',
                header: 'Featured Project',
                body: c_name + " Some quick example text to build on the card title and make up the bulk of the card's content.",
                formItemsCollection: formItemsCollection
            })
        }
        setCards(t_arry)
    }, [])

    useEffect(() => {
        console.log('colSizes: ', colSizes)
    }, [colSizes])

    useEffect(() => {
        console.log('configTextAreaVal: ', configTextAreaVal)
    }, [configTextAreaVal])

    const goTasks = () => {
        clearTasks()
        setTasks([
            { "id": 0, "output": 0 },
            { "id": 1, "output": 1 },
            { "id": 2, "output": 2 },
            { "id": 3, "output": 3 },
            { "id": 4, "output": 4 },
            { "id": 5, "output": 5 },
            { "id": 7, "output": 7 }
        ])
    }

    const getTasks = (num) => {
        clearTasks()
        setTasks(tasks => [...tasks, { "id": num, "output": num }])
    }

    const clearTasks = () => {
        setTasks([])
    }

    const sendPost = (id, d = { "(PASSCODE): ": [''], "custom_entry": ['echo custom_entry STUFF 1234'], "Code": [''] }) => {
        console.log('sendPost')
        // const d = { "(PASSCODE): ": [''], "custom_entry": ['echo custom_entry STUFF 1234'] }
        axios.post("/api/dtree/send/" + id, d)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    const startPost = (id, d = { "(PASSCODE): ": [''], "custom_entry": ['echo custom_entry STUFF 1234'], "Code": [''] }) => {
        console.log('startPost')
        // const d = { "(PASSCODE): ": [''], "custom_entry": ['echo custom_entry STUFF 1234'] }
        axios.post("/api/dtree/start/" + id, d)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Container style={{ backgroundColor: '#f4f4f4' }} fluid className="ml-2">
                {/* <Button onClick={() => goTasks()}>Go</Button>
                <Button onClick={() => clearTasks()}>Clear</Button>
                <Button onClick={() => getTasks(0)}>Get</Button>
                <Button onClick={() => sendPost(0)}>Send</Button>
                <Button onClick={() => getTasks(1)}>Get</Button>
                <Button onClick={() => getTasks(2)}>Get</Button>
                <Button onClick={() => getTasks(3)}>Get</Button>
                <Button onClick={() => getTasks(4)}>Get</Button>
                <Button onClick={() => getTasks(5)}>Get</Button>
                <Button onClick={() => getTasks(6)}>Get</Button>
                <Button onClick={() => getTasks(7)}>Get</Button> */}
                <Row>
                    <Col lg="3">
                        <Row className="mt-3">
                            <LLCard title="Showcase Catagories">
                                <Collections />
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li">
                                        Add a new Card
                                        <Button style={{ float: 'right' }} onClick={() => {
                                            const c_name = uuidv4()
                                            setCards([...cards, {
                                                id: c_name,
                                                src: `https://source.unsplash.com/1600x900/?${pictureCats[cards.length]}`,
                                                title: 'Test Connection to Ubuntu Servers',
                                                header: 'Title Here',
                                                body: " Some quick example text to build on the card title and make up the bulk of the card's content.",
                                                formItemsCollection: formItemsCollection
                                            }])
                                        }}>Add</Button>
                                        <Button style={{ float: 'right' }} onClick={() => {
                                            setCards([])
                                        }}>Clear</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Cisco Network Administration
                                        <Button style={{ float: 'right' }} onClick={() => {
                                            let t_arry = []
                                            for (let i = 0; i < 10; i++) {
                                                const c_name = uuidv4()
                                                t_arry.push({
                                                    id: c_name,
                                                    src: `https://source.unsplash.com/1600x900/?${pictureCats[i]}`,
                                                    title: 'Test Connection to Ubuntu Servers',
                                                    header: 'Featured Project',
                                                    body: "I have a collection of ubuntu servers online that this script will connect to and test it's accessability. Please follow the step by step process provided, and see the results. Results will be shown above, located where the picture currently is on this card. Once complete, you will have the option to email the results to an email you provide.",
                                                    formItemsCollection: formItemsCollection
                                                })
                                            }
                                            setCards(t_arry)

                                        }}>Launch Demo</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Network Engineering
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        DevOps
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        MERN-Stack Development
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Python
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Network Automation
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Web Scraping
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Dapibus ac facilisis in
                                <Button style={{ float: 'right' }} onClick={() => getTasks(1)}>Get</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" disabled>
                                        Morbi leo risus
                                <Button style={{ float: 'right' }} onClick={() => getTasks(2)}>Get</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Porta ac consectetur ac
                                <Button style={{ float: 'right' }} onClick={() => getTasks(3)}>Get</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <Button onClick={() => goTasks()}>Go</Button>
                                        <Button onClick={() => clearTasks()}>Clear</Button>
                                        <Button onClick={() => getTasks(0)}>Get</Button>
                                        <Button onClick={() => sendPost(0)}>Send</Button>
                                        <Button onClick={() => getTasks(1)}>Get</Button>
                                        <Button onClick={() => getTasks(2)}>Get</Button>
                                        <Button onClick={() => getTasks(3)}>Get</Button>
                                        <Button onClick={() => getTasks('abcd')}>Get4</Button>
                                        <Button onClick={() => getTasks(5)}>Get</Button>
                                        <Button onClick={() => getTasks(6)}>Get</Button>
                                        <Button onClick={() => getTasks(7)}>Get</Button>
                                        <Button onClick={() => sendPost(7)}>Send</Button>
                                        <Button onClick={() => getTasks(8)}>Get</Button>
                                        <Button onClick={() => sendPost(8)}>Send</Button>
                                        <Button onClick={() => getTasks(9)}>Start 9</Button>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Enter Configuration1 in Textarea</Form.Label>
                                            <Form.Control as="textarea" ref={ciscoConfigTextArea} onChange={(e) => { setConfigTextAreaVal(e.target.value) }} rows="3" style={{ height: 200 }} value={configTextAreaVal} />
                                        </Form.Group>

                                        <Button onClick={() => startPost(9, {
                                            // "./json/excel/excel_dev_list.txt": "br00f2n.luskin.ucla.net",
                                            "./json/excel/excel_dev_list.txt": configTextAreaVal,
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
                                        })}>Start 9 with POST</Button>
                                        <Button onClick={() => startPost(9, {
                                            // "./json/excel/excel_dev_list.txt": "br00f2n.luskin.ucla.net",
                                            // "./json/excel/excel_dev_list.txt": configTextAreaVal,
                                            // "./CustomObj/CiscoObj/_accept_list.txt": configTextAreaVal,
                                            // "C:/Users/Paul Aglipay/Desktop/New folder/br00f2n.luskin.ucla.net.txt": configTextAreaVal,
                                            "jobs": [
                                                {
                                                    "import": "ExtendedAccessListObj"
                                                },
                                                {
                                                    "True": "ExtendedAccessListObj"
                                                },
                                                {
                                                    "open": {
                                                        "src_net": "149.142.0.0/16",
                                                        "dest_net": "149.142.33.0/24"
                                                    }
                                                }
                                            ]
                                        })}>Start 9 with POST2</Button>

                                        {/* <Button onClick={() => {
                                            configTextAreaVal.split('\n').forEach(d => {
                                                // console.log('d: ', d)
                                                startPost(9, {
                                                    "./json/excel/excel_dev_list.txt": d,
                                                    // "./CustomObj/CiscoObj/_accept_list.txt": configTextAreaVal,
                                                    // "C:/Users/Paul Aglipay/Desktop/New folder/br00f2n.luskin.ucla.net.txt": configTextAreaVal,
                                                })
                                            }
                                            )

                                        }}>Start 9 with POST</Button> */}
                                    </ListGroup.Item>
                                </ListGroup>
                            </LLCard>
                        </Row>
                    </Col>
                    <Col lg="9">
                        <Row className="mt-3">
                            {cards.map((e, i) => (
                                <Col key={`col_index_1${e.id}`} lg={colSizes[i]} className="mb-3">
                                    <DynamicForm
                                        prompt_request={e.prompt_request}
                                        src={e.src}
                                        key={e.id}
                                        cards={cards}
                                        setCards={setCards}
                                        id={e.id}
                                        toggleS={toggleSizes}
                                        colSize={colSizes[i]}
                                        setSize={i}
                                        title={e.title}
                                        header={e.header}
                                        body={e.body}
                                        formItemsCollection={e.formItemsCollection}
                                    />
                                </Col>
                            )
                            )
                            }
                        </Row>
                        <Row className="mt-3">
                            <Col lg="12">
                                <LLCard title="Status">
                                    {tasks.length > 0 &&
                                        <Accordion defaultActiveKey={tasks.length}>
                                            {tasks && tasks.map((d, i) =>
                                                <Card>
                                                    <Card.Header>
                                                        {/* <ButtonGroup size="sm">
                                                            <Button>Left</Button>
                                                            <Button>Middle</Button>
                                                            <Button>Right</Button>
                                                        </ButtonGroup> */}
                                                        <Accordion.Toggle size="sm" as={Button} variant="link" eventKey={i + 1}>
                                                            Click me!
                                                        </Accordion.Toggle>
                                                        {/* <Spinner animation="border" role="status" size="sm" style={{ float: 'right' }}>
                                                    <span className="sr-only">Loading...</span>
                                                    </Spinner> */}
                                                        {/* <Badge variant="primary" style={{ float: 'right' }}>Primary</Badge>{' '}
                                                    <Badge variant="secondary" style={{ float: 'right' }}>Secondary</Badge>{' '} */}
                                                        <Badge variant="success" style={{ float: 'right' }}>Success</Badge>{' '}
                                                        {/* <Badge variant="danger" style={{ float: 'right' }}>Danger</Badge>{' '}
                                                    <Badge variant="warning" style={{ float: 'right' }}>Warning</Badge> 
                                                    <Badge variant="info" style={{ float: 'right' }}>Info</Badge>{' '}
                                                    <Badge variant="light" style={{ float: 'right' }}>Light</Badge> 
                                                    <Badge variant="dark" style={{ float: 'right' }}>Dark</Badge> */}
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey={i + 1}>
                                                        <Card.Body>
                                                            {/* <LLCard> */}
                                                            <DTree2 key={d.output} id={d.output} />
                                                            {/* </LLCard> */}
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>)}
                                        </Accordion>
                                    }
                                </LLCard>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

// export default DTreeForm

const mapStateToProps = state => {
    return {
        collectionData: state.collection
    }
}

const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addCollectionRequest(text)),
    // onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DTreeForm)
