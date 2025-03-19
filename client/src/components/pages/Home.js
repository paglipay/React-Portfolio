import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import {
  Jumbotron,
  Button,
  Card,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Modal,
  Image,
} from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
// import { MDBIcon } from "mdbreact";
// import BasicTable from '../../components/MDB/BasicTable/BasicTable'
// import Datatable from '../../components/MDB/Datatable/Datatable'
// import FeaturesPage from '../../components/MDB/FeaturesPage/FeaturesPage'
// import NavTabs from "../NavTabs";
import { Link, useLocation } from "react-router-dom";
import Todo from "../../components/Todo/App";
import DTree from "../../components/DTree";
// import ReactPlayer from 'react-player'
// import { ChatWidget } from "@paglipay/chat-widget";
// import { Storytime } from "@papercups-io/storytime";
import LLModal from "../LobbyLogin/components/LLModal";
import VideoChat from "../ReactVideoChat";
const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

function Home() {
  const [showVideoChat, setShowVideoChat] = useState(false);
  const [yourID, setYourID] = useState("1234");
  const [users, setUsers] = useState([{ name: "" }]);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const mouseClickEvents = ["mousedown", "click", "mouseup"];

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
    });
    socket.current.on("allUsers", (users) => {
      setUsers(users);
      console.log(users);
    });

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  function handleBtnClick(event) {
    setShowVideoChat(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });
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
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <p>{caller} is calling you</p>
        <Button onClick={acceptCall}>Accept</Button>
      </div>
    );
  }

  function simulateMouseClick(element) {
    mouseClickEvents.forEach((mouseEventType) =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      )
    );
  }

  const clickChat = () => {
    console.log("clickChat");
    const element = document.querySelector(
      'button[class~="Papercups-toggleButton"]'
    );
    simulateMouseClick(element);
  };
  return (
    <div>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: purple;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    .container {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .jumbotron {      
      margin-bottom: 0px;
    }
    `}
      </style>
      <Jumbotron
        style={{
          // backgroundImage: `url('https://source.unsplash.com/1600x300/?design')`,
          backgroundImage: `url('https://picsum.photos/1600/300?design=1')`,
          backgroundSize: "cover",
          height: 500,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.75)",
            padding: "100px",
            margin: "-25px 0px",
          }}
        >
          <h1>Welcome to Paul Aglipay's Portfolio Site!</h1>
          Skilled Software Developer with experience in Network / Systems
          Engineering. Experienced Programmer Analyst / Network Engineer with a
          demonstrated history of working in the higher education industry.
          Proficient in Full-Stack development particularly in the MERN stack.
          <br />
          <br />
          <p>
            <Button variant="flat" size="xxl" as={Link} to={"/dynamicform"}>
              Instant Interview
            </Button>
            <ArrowRight style={{ visibility: "hidden" }} />
            <Button variant="flat" size="xxl" href="https://yoom.paglipay.info" target="_blank">
              Schedule an Interview
            </Button>
            <ArrowRight style={{ visibility: "hidden" }} />
            <Button variant="flat" size="xxl" onClick={handleShow}>
              Learn more
            </Button>
            <ArrowRight style={{ visibility: "hidden" }} />
            {/* <Button variant="flat" size="xxl" onClick={handleBtnClick}>
              Instant Interview
            </Button> */}
            {/* <Button variant="flat" size="xxl" onClick={handleBtnClick}>
              Instant Interview
            </Button> */}

            <Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Now with AI Virtual Assistance! How to use...</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Select Showcase Categories to view Featured Projects.
                <br />
                <br />
                A great place to start would be the "Docker Swarm" demos.
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/RAqPD-EjAT4?si=ImuK_IECZsavRViz"
                  title="YouTube video player"
                  // frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  // referrerpolicy="strict-origin-when-cross-origin"
                  // allowfullscreen
                ></iframe>
                <br />
                <br />
                Please feel free to use our chatbot to ask any questions you may
                have about the developer or anything about life in general
                
                <Image src="./chat-logo.png" onClick={clickChat}></Image>
                {/* <ArrowRight /> */}
                {/* <br />
                <Button className="mb-2" onClick={handleBtnClick}>
                  Instant Interview
                </Button> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button> */}
              </Modal.Footer>
            </Modal>

            <LLModal show={showVideoChat} setShow={setShowVideoChat}>
              <VideoChat
                users={users}
                UserVideo={UserVideo}
                PartnerVideo={PartnerVideo}
                incomingCall={incomingCall}
                yourID={yourID}
                callPeer={callPeer}
              />
            </LLModal>
          </p>
        </div>
      </Jumbotron>
      <section className="section section-icons grey lighten-4 center">
        <Container fluid>
          <Row>
            <DTree />
          </Row>
        </Container>
      </section>
     
    </div>
  );
}

export default Home;
