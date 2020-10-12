import React, { useState, useRef, useEffect } from 'react'
import LLCard from './components/LLCard'
import { Container, Row, Col, Button } from 'react-bootstrap';
import HaveAppointment from './components/have_appointment'
import NoAppointment from './components/no_appointment'
import GoTouchless from './components/go_touchless'
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import Peer from "simple-peer";
import { useVideoChatContext } from "../../utils/GlobalState";
import UserContext from "../../utils/userContext";
import VideoChat from "../ReactVideoChat";
import styled from "styled-components";
import LLModal from './components/LLModal'
import Todo from '../Todo/App'
import TodoList from './components/TodoList'
// import customHook from "./utils/customHook";
import Users from "../Users/UsersContainer";
import Employees from "../EmployeeDirectory/containers";
import Appointments from "../EmployeeAppointments/AppointmentsContainer";
// import Todos from '../Todos/components/TodoList';

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

function LobbyLogin() {
    const [state, dispatch] = useVideoChatContext();

    const [showVideoChat, setShowVideoChat] = useState(false);
    const [yourID, setYourID] = useState("1234");
    const [users, setUsers] = useState([{ name: '' }]);
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();
    const [uuid_id, setUuid_id] = useState(uuidv4())

    // const debouncedSearchTerm = customHook(search);

    useEffect(() => {
        socket.current = io.connect("/");
        // navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        //     setStream(stream);
        //     if (userVideo.current) {
        //         userVideo.current.srcObject = stream;
        //     }
        // })

        socket.current.on("yourID", (id) => {
            setYourID(id);
        })
        socket.current.on("allUsers", (users) => {
            setUsers(users);
            console.log(users)
        })

        socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })
    }, []);



    function handleBtnClick(event) {
        setShowVideoChat(true)
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })
    }


    function callPeer(id) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {

                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    }
                ]
            },
            stream: stream,
        });

        peer.on("signal", data => {
            socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        })

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.current.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })

    }

    function acceptCall() {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", data => {
            socket.current.emit("acceptCall", { signal: data, to: caller })
        })

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
    }

    let UserVideo;
    if (stream) {
        UserVideo = (
            <Video playsInline muted ref={userVideo} autoPlay />
        );
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
            <Video playsInline ref={partnerVideo} autoPlay />
        );
    }

    let incomingCall;
    if (receivingCall) {
        incomingCall = (
            <div>
                <p>{caller} is calling you</p>
                <Button onClick={acceptCall}>Accept</Button>
            </div>
        )
    }

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
            <Row >
                <Col>
                    < LLCard >
                        <HaveAppointment />
                    </ LLCard >
                </Col>
                <Col>
                    < LLCard >
                        <UserContext.Provider value={{ yourID, users, stream, UserVideo, handleBtnClick }}>
                            <NoAppointment uuid_id={uuid_id} setUuid_id={setUuid_id} />
                        </UserContext.Provider>
                    </ LLCard >
                </Col>
                <Col>
                    < LLCard >
                        <GoTouchless uuid_id={uuid_id} />
                    </ LLCard >
                </Col>
            </Row>
            <Row>
                <Col>
                    <LLCard>
                    <Button className="mb-2" onClick={handleBtnClick}>Call Modal</Button>
                        <Users />
                        <Row>
                            <div>
                                <h1>SocketIO Users</h1>
                                {users &&
                                    users.map(user => <p>{user.name}</p>)}
                            </div>
                        </Row>
                        <Row>
                            {UserVideo}
                            {PartnerVideo}
                        </Row>
                        <Row>
                            {incomingCall}
                        </Row>
                        <Row>
                            {users.map(key => {
                                if (key.id === yourID) {
                                    return null;
                                }
                                return (
                                    <Button className="mb-2" onClick={() => callPeer(key.id)}>Call {key.name}</Button>
                                );
                            })}
                        </Row>
                    </LLCard>
                </Col>
                <Col>
                    <LLCard>
                        <Employees />
                    </LLCard>
                </Col>
                <Col>
                    <LLCard>
                        <Appointments />
                    </LLCard>
                </Col>
            </Row>
            <Row>
                <Col>
                    <LLCard>
                        {/* <Todos /> */}
                        <h1>yourID: {yourID}</h1>
                        {/* <h1>yourID{state}</h1> */}

                        <LLModal show={showVideoChat} setShow={setShowVideoChat}>
                            <VideoChat users={users} UserVideo={UserVideo} PartnerVideo={PartnerVideo} incomingCall={incomingCall} yourID={yourID} callPeer={callPeer} />
                        </LLModal>
                    </LLCard>
                </Col>
            </Row>
            <Row>
                <Col>
                    <LLCard>
                        <TodoList />
                    </LLCard>
                </Col>
            </Row>
        </Container>

    )
}

export default LobbyLogin
