import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap'
import axios from "axios";
import DTree2 from './DTree2'
// import API from "../../utils/API";

function DTreeForm() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {

    }, [])

    const getTasks = (id) => {
        setTasks(tasks => [...tasks, id])
    }

    return (
        <>
        <Button onClick={() => getTasks(0)}>Get</Button>
        <Button onClick={() => getTasks(1)}>Get</Button>
        <Button onClick={() => getTasks(2)}>Get</Button>
        <Button onClick={() => getTasks(3)}>Get</Button>
            <Row>
                {tasks && tasks.map(d => <DTree2 key={d} id={d} />)}
            </Row>
        </>
    )
}

export default DTreeForm
