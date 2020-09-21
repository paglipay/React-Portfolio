import React, { useState, useEffect, useRef } from 'react';
import TouchlessLogin from './index'
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

function TouchlessLoginUrl(props) {
    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});    
    const [uuid_id, setUuid_id] = useState()
    const socket = useRef();

    useEffect(() => {
        setUuid_id(uuidv4())
        socket.current = io.connect("/");

        socket.current.on("yourID", (id) => {
            setYourID(id);
            console.log('socket_id:', id)
        })
        socket.current.on("allUsers", (users) => {
          setUsers(users);
          console.log('users:', users)
        })
        socket.current.on("userDisconnect", (users) => {
          console.log('userDisconnect: ', users)
          console.log(users)
          setUsers(users);
        })

    }, []);

    return (
        <div>
            <TouchlessLogin uuid_id={props.match.params.id}/>
        </div>
    )
}

export default TouchlessLoginUrl
