import React, { useState, useRef, useEffect } from 'react'
import LLCard from './components/LLCard'
import { Container, Row, Col } from 'react-bootstrap';
import HaveAppointment from './components/have_appointment'
import NoAppointment from './components/no_appointment'
import GoTouchless from './components/go_touchless'
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

function LobbyLogin() {
    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();
    const [uuid_id, setUuid_id] = useState(uuidv4())


    useEffect(() => {
        socket.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })

        socket.current.on("yourID", (id) => {
            setYourID(id);
        })
        socket.current.on("allUsers", (users) => {
            setUsers(users);
        })

        socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })
    }, []);

    return (
        <Container>
            <style type="text/css">
                {`
        .modal-90w {
                width: 90%;
                max-width: none!important;
            }

            body {
                color: rgba(0, 0, 0, 0.63);
                /* The image used */
                background-image: url('https://source.unsplash.com/1600x900/?city,dark');
                position:relative;
                /* opacity:0.10; */
                background-position:center;
                background-size:cover;
                background-repeat:no-repeat;
                background-attachment:fixed;
            }
        `}
            </style>
            <Row>
                <h1>{yourID}</h1>
            </Row>
            <Row >
                <Col>
                    < LLCard >
                        <HaveAppointment />
                    </ LLCard >
                </Col>
                <Col>
                    < LLCard >
                        <NoAppointment uuid_id={uuid_id} />
                    </ LLCard >
                </Col>
                <Col>
                    < LLCard >
                        <GoTouchless uuid_id={uuid_id} />
                    </ LLCard >
                </Col>
            </Row>
        </Container>

    )
}

export default LobbyLogin
