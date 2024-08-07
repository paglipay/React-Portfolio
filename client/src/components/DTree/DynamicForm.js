import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Image, Badge, Card, Button, Spinner, Form } from 'react-bootstrap'
import axios from "axios";
import PromptWindow from './PromptWindow'
import DTable from './DTable/DTable';
import { BsPersonFill } from "react-icons/bs";
function DynamicForm({
    setCards,
    cards,
    colSize,
    src = `https://picsum.photos/1600/900`,
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
    const [dtabledata, setDtabledata] = useState(false);
    const [promptRequest, setPromptRequest] = useState([]);
    const [badgeStatus, setBadgeStatus] = useState('info');
    const [sessionId, setSessionId] = useState(id);
    const windowRef = useRef()

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
    // const [submitData, setSubmitData] = useState({
    //     // "./json/excel/excel_dev_list.txt": "br00f2n.luskin.ucla.net",
    //     "./json/excel/excel_dev_list.txt": 'br01f2.carnesalecommons.ucla.net',
    //     // "./CustomObj/CiscoObj/_accept_list.txt": configTextAreaVal,
    //     // "C:/Users/Paul Aglipay/Desktop/New folder/br00f2n.luskin.ucla.net.txt": configTextAreaVal,
    //     "jobs": [
    //         {
    //             "import": "Key"
    //         },
    //         {
    //             "True": [
    //                 {
    //                     "True": "./CustomObj/CiscoObj/create_cisco_json_test.json"
    //                 },
    //                 {
    //                     "True": "./CustomObj/CiscoObj/cisco_json_test_dev_list.json"
    //                 },
    //                 {
    //                     "False": "./CustomObj/CiscoObj/process_cisco_acls.json"
    //                 }
    //             ]
    //         },
    //     ]
    // });

    const [submitData, setSubmitData] = useState({});

    // const [formItemsCollection, setFormItemsCollection] = useState(formItemsCollection)
    const [formItems, setFormItems] = useState([
        // { "id": "./json/excel/excel_dev_list.txt", "value": "" },
    ]);

    // useEffect(() => {
    //     console.log('colSize: ', colSize)
    // }, [colSize])

    useEffect(() => {
        console.log(submitData)
    }, [submitData])

    useEffect(() => {
        console.log(formCounter)
        setFormItems(formItemsCollection[formCounter]['form_items'])
    }, [formCounter])

    


    let myVar;
    const showLoop = (id, timeSize) => {
        myVar = setInterval(() => loadDtree(id), timeSize)
    }

    const loadDtree = (id) => {
        // console.log('loadDtree')
        axios.get("/api/dtree/start/" + id)
            .then(res => {
                console.log(res.data)
                if (res.data.hasOwnProperty('ParamikoObj')) {
                    let o_arry = res.data.ParamikoObj.map(e => e.split('\n'))
                    let t_arry = [].concat.apply([], o_arry)
                    // console.log(t_arry)
                    // console.log(t_arry.slice(t_arry.length - 5, t_arry.length))
                    setOutput([t_arry.join('\n')])
                    // console.log('windowRef: ', windowRef)
                    windowRef.current.scrollTop = windowRef.current.scrollHeight

                }
                else if (res.data.hasOwnProperty('acl_networks')) {
                    console.log(res.data.acl_networks)
                    setDtabledata(res.data.acl_networks)
                }
                if (res.data.hasOwnProperty('prompt_request')) {
                    console.log(res.data.prompt_request)
                    setPromptRequest(res.data.prompt_request)
                }
            })
            .catch(err => console.log(err));
    };

    const startPost = (id, data) => {
        let d = {}
        // console.log('startPost: data: ', data)
        let new_dic = {}
        if ('form_items_to_dic' in data) {
            const new_dic_name = data['form_items_to_dic']['to_dic_name']
            let build_dic = {}
            data['form_items_to_dic']['form_items'].forEach(e => {
                build_dic[e] = submitData[e]
            })
            new_dic[new_dic_name] = [build_dic]
            d = { ...submitData, ...data, id, ...new_dic }
        }
        else {
            d = { ...submitData, ...data, id }
        }

        console.log('startPost d: ', d)
        showLoop(id, 3000)
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
                    windowRef.current.scrollTop = windowRef.current.scrollHeight
                }
                else if (res.data.hasOwnProperty('acl_networks')) {
                    console.log(res.data.acl_networks)
                    setDtabledata(res.data.acl_networks)
                }
                if (res.data.hasOwnProperty('prompt_request')) {
                    console.log(res.data.prompt_request)
                    setPromptRequest(res.data.prompt_request)
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
        // console.log('handleChange type: ', e.target.type)
        setSubmitData({
            ...submitData,
            [e.target.name]: (e.target.type === 'text' || e.target.type === 'password' ? [e.target.value] : e.target.value)
        })
        // this.setState({ [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <>
            <Card style={{ height: '100%' }}>
                <Card.Header as="h5" onClick={() => toggleS(setSize)}>
                    {/* <BsPersonFill size={50}/> */}
                    {/* <Image src={`https://randomuser.me/api/portraits/med/men/${(() => Math.floor(Math.random() * 10))()}.jpg`} roundedCircle /> */}
                    {' '}{header}<Badge variant={badgeStatus} style={{ float: 'right' }}>{badgeStatus.charAt(0).toUpperCase() + badgeStatus.slice(1)}</Badge>{' '}
                    </Card.Header>

                {output ? output.map((d, i) => <pre ref={windowRef} key={`${id}-df_pre_${d.id}`} style={{ "height": 250, "backgroundColor": "black", "color": "greenyellow", "fontFamily": "monospace", "scrollBehavior": "smooth" }}>{d}</pre>) : <Card.Img variant="top" src={src} />}
                {dtabledata ? <DTable data={dtabledata} /> : null}

                {true ? promptRequest.map((e, i) => {
                    return (
                        <Card key={`promptRequest-${i}`}><Card.Body><h3>Prompt Request: {e}</h3><Form>
                            <React.Fragment key={`-pfrag-${e}`}>
                                <Form.Group key={`-pfg-${e}`} controlId={`-cid-${e}`}>
                                    <Form.Label key={`-pfl-${e}`}>{e}</Form.Label>
                                    <Form.Control key={`-pfc-${e}`} name={`${e}`} type="text" onChange={(elem) => handleChange(elem)} rows="3" />
                                </Form.Group>
                            </React.Fragment>
                            <Form.Group key={``} controlId={``}>
                                <Button
                                    style={{ float: 'right' }}
                                    onClick={(elem) => {
                                        elem.preventDefault()
                                        // startPost(sessionId, d.action)
                                        console.log('promptRequest-id: ', id, '-', e, '-', submitData[e])

                                        axios.post("/api/dtree/send/" + id, { [e]: submitData[e] })
                                            .then(res => { console.log('Success!') })
                                    }} size="lg">Submit</Button>
                            </Form.Group>
                        </Form></Card.Body></Card>)
                }) : <h1>Prompt Request: HERE</h1>}
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
                            <Form onSubmit={handleSubmit}>
                                {formItems ? formItems.map((d, i) => {
                                    if (d.type === 'textarea') {
                                        return (<React.Fragment key={`tafrag-${d.id}-${d.name}`}>
                                            {/* <h1>{d.id}</h1> */}
                                            <Form.Group key={`${id}-tafg-${d.id}-${d.name}`} controlId={`${id}-tafgcid-${d.id}-${d.name}`}>
                                                <Form.Label key={`${id}-tafl-${d.id}-${d.name}`}><h4 key={`${id}-tah2-${d.id}-${d.name}`}>{id}-{d.id}</h4></Form.Label>
                                                <Form.Control key={`${id}-tafc-${d.id}-${d.name}`} key={`${id}-tafc-${d.id}-${d.name}`} as="textarea" onChange={(e) => handleChange(e)} rows="3" style={{ height: 200 }} />
                                            </Form.Group>
                                        </React.Fragment>)
                                    }
                                    else if (d.type === 'password') {
                                        return (<React.Fragment key={`${id}-pfrag-${d.id}-${d.name}`}>
                                            {/* <h1>{d.id}</h1> */}
                                            <Form.Group key={`${id}-pfg-${d.id}-${d.name}`} controlId={`${id}-cid-${d.id}-${d.name}`}>
                                                <Form.Label key={`${id}-pfl-${d.id}-${d.name}`}>{d.id}</Form.Label>
                                                {/* <Form.Control type="password" placeholder="Password" /> */}
                                                <Form.Control key={`${id}-pfc-${d.id}`} type="password" onChange={(e) => handleChange(e)} rows="3" />
                                            </Form.Group>
                                        </React.Fragment>)
                                    }
                                    else if (d.type === 'button') {
                                        return (<React.Fragment key={`${id}-bfrag-${d.id}-${d.name}`}>
                                            {/* <h5>{d.id}</h5> */}
                                            <Form.Group key={`${id}-bfg-${d.id}-${d.name}`} controlId={`${id}-bcid-${d.id}-${d.name}`}>
                                                <Button
                                                    style={{ float: 'right' }}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        startPost(sessionId, d.action)
                                                    }} size="lg">Next</Button>
                                                {/* <Button
                                                style={{ float: 'right' }}
                                                onClick={() => startPost(sessionId, submitData)} size="lg">Next</Button> */}
                                                {/* <hr /> */}
                                            </Form.Group>
                                        </React.Fragment>)
                                    }
                                    else if (d.type === 'pre') {
                                        return (<React.Fragment key={`${id}-pfrag-${d.id}-${d.name}`}>
                                            <h4>{d.id}</h4>
                                            <pre>{d.value}</pre>
                                        </React.Fragment>)
                                    }
                                    else if (d.type === 'message') {
                                        return (<React.Fragment key={`${id}-mfrag-${d.id}-${d.name}`}>
                                            <h5>{d.name}</h5>
                                            <p>{d.value}</p>
                                        </React.Fragment>)
                                    }
                                    else {
                                        return (<React.Fragment key={`${id}-tfrag-${d.id}`}>
                                            {/* <h1>{d.id}</h1> */}
                                            <Form.Group key={`${id}-tfg-${d.id}-${d.name}`} controlId={`${id}-tcid-${d.id}-${d.name}`}>
                                                <Form.Label key={`${id}-tfl-${d.id}-${d.name}`}>{d.value}</Form.Label>
                                                {/* <Form.Control type="password" placeholder="Password" /> */}
                                                <Form.Control key={`${id}-tfc-${d.id}-${d.name}`} name={`${d.name}`} type="text" onChange={(e) => handleChange(e)} rows="3" />
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
        </>
    )
}

export default DynamicForm
