import axios from "axios";

export default {
    // Gets all appointments
    loadTodos: function() {
      return axios.get("/api/todos");
    },
}