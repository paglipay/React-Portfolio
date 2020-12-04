import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import axios from "axios";
// import API from "../../utils/API";

function DTreeForm() {

    const [dtreeobjs, setDtreeobjs] = useState({ '0': { "ParamikoObj": ['HELLO'] } })
    const [dtrees, setDtrees] = useState([{ "id": "0", "output": ['BYE'] }])

    useEffect(() => {
        sendDtree(0)
        // loadDtree(0)
        // sendDtree(1)
        // sendDtree(2)
        // sendDtree(3)
        // sendDtree(4)
        // sendDtree(5)
        // // sendDtree(6)
        // sendDtree(7)

    }, [])

    let myVar = {};
    const showLoop = (id) => {
        myVar[id] = setInterval(() => loadDtree(id), 1000)
    }

    useEffect(() => {
        console.log('dtreeobjs: ' + dtreeobjs['0']['ParamikoObj'])
        // setDtrees(dtrees => [...dtrees, res.data.ParamikoObj])
    }, [dtreeobjs])

    const loadDtree = (id) => {
        console.log('loadDtree')
        axios.get("/api/dtree/start/" + id)
            .then(res => {
                // console.log(res.data)
                // setDtreeobjs(dtreeobjs => [...dtreeobjs, res.data.ParamikoObj])
                // setDtreeobjs(dtreeobjs => {
                //     return {
                //         ...dtreeobjs,
                //         [id]: res.data.ParamikoObj
                //     }
                // })
                // setDtrees(dtrees => [...dtrees, res.data.ParamikoObj])
                setDtrees([{ "id": id, "output": res.data.ParamikoObj }])
                // const newItems = [{ "id": id, "output": res.data.ParamikoObj }]
                // const result = dtrees.map(x => {
                //     const item = newItems.find(({ id }) => id === x.id);
                //     return item ? item : x;
                //   });
                  
                // setDtrees(dtrees => [...dtrees, result])


            })
            .catch(err => console.log(err));
        // API.getAppointments()
        //     .then(res => console.log(res.data.results))
        //     .catch(err => console.log(err));
    };



    const sendDtree = (id) => {
        console.log('sendDtree')
        showLoop(id)
        const d = { "(PASSCODE): ": ['26559@pa'], "custom_entry": ['echo (PASSCODE): '] }
        axios.post("/api/dtree/start/" + id, d)
            .then(res => {
                console.log(res.data)
                // setDtrees(dtrees => [...dtrees, res.data.ParamikoObj])
                setDtrees([{ "id": id, "output": res.data.ParamikoObj }])
                // const newItems = [{ "id": id, "output": res.data.ParamikoObj }]
                // const result = dtrees.map(x => {
                //     const item = newItems.find(({ id }) => id === x.id);
                //     return item ? item : x;
                //   });
                  
                // setDtrees(dtrees => [...dtrees, result])
                
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

export default DTreeForm
