import axios from "axios";

export default {
    // Gets all appointments
    getAppointments: function() {
      return axios.get("/api/appointments");
    },
}