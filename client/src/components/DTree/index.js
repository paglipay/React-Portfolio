import React, { useEffect } from 'react'
import axios from "axios";
// import API from "../../utils/API";

function DTree() {

    useEffect(() => {
        loadDtree()
    }, [])

    const loadDtree = () => {
        console.log('loadDtree')
        axios.get("/api/dtree/start")
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        // API.getAppointments()
        //     .then(res => console.log(res.data.results))
        //     .catch(err => console.log(err));
    };


    return (
        <div>
            <h1>DTree</h1>
        </div>
    )
}

export default DTree
