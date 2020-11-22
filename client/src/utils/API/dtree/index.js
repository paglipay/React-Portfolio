import axios from "axios";

export default {
    // Gets all appointments
    getAppointments: function () {
        console.log('getDtree')
        return axios.get("/api/dtree/start");
    },
