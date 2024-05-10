import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';

function ReactVideoChat({ users, UserVideo, PartnerVideo, incomingCall, yourID, callPeer }) {
    return (
        <Container>
            {/* <Row>
                <div>
                    <h1>SocketIO Users</h1>
                    {users &&
                        users.map(user => <p>{user.name}</p>)}
                </div>
            </Row> */}
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
                        <><Button className="mb-2" onClick={() => callPeer(key.id)}>Call</Button><br/></>
                    );
                })}
            </Row>
        </Container>
    )
}

export default ReactVideoChat
