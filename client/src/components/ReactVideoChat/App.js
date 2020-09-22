import React, { useEffect, useState, useRef } from 'react';
import './App.css';
// import io from "socket.io-client";
import styled from "styled-components";
import { useVideoChatContext } from "../../utils/GlobalState";

const Container = styled.div`
  // height: 100vh;
  // width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

function App() {

  // let UserVideo;
  // if (stream) {
  //   UserVideo = (
  //     <Video playsInline muted ref={userVideo} autoPlay />
  //   );
  // }

  // let PartnerVideo;
  // if (callAccepted) {
  //   PartnerVideo = (
  //     <Video playsInline ref={partnerVideo} autoPlay />
  //   );
  // }

  // let incomingCall;
  // if (receivingCall) {
  //   incomingCall = (
  //     <div>
  //       <h1>{caller} is calling you</h1>
  //       <button onClick={acceptCall}>Accept</button>
  //     </div>
  //   )
  // }
  const inputRef = useRef();
  const [state, dispatch] = useVideoChatContext();

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({
      type: "add",
      name: inputRef.current.value
    });
    inputRef.current.value = "";
  }
  return (
    <Container>
      <Row>
        {/* {UserVideo}
        {PartnerVideo} */}
      </Row>
      <Row>
        <h1>VideoChat</h1>
        <form className="form-group mt-5" onSubmit={handleSubmit}>
          <input
            className="form-control"
            ref={inputRef}
            placeholder="Start typing what you need to do..."
          />
          <button className="btn btn-success mt-3 mb-5" type="submit">
            Add to List
        </button>
        </form>
        {/* {Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          return (
            <button onClick={() => callPeer(key)}>Call {key}</button>
          );
        })} */}
      </Row>
      <Row>
        {/* {incomingCall} */}
      </Row>
      <Row>
        <div>
          <h4>My Todo List:</h4>
          <ul className="list-group">
            {state.map((item, index) => (
              <li className="list-group-item col-12" key={item.id}>
                <button
                  className="btn btn-warning mr-4"
                  onClick={() => dispatch({ type: "prioritize", index })}
                >
                  Prioritize
                                </button>
                <button
                  className="btn btn-warning mr-4"
                  onClick={() => dispatch({ type: "call", index })}
                >
                  Call
                                </button>
                <button
                  className="btn btn-danger mr-4"
                  onClick={() => dispatch({ type: "remove", index })}
                >
                  X Remove
                                </button>
                {index}:<span className={item.priority ? "font-weight-bold" : ""}> {item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Row>
    </Container>
  );
}

export default App;
