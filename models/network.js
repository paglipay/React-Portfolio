const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const networkSchema = new Schema({
    // id: { type: String, required: true },
    name: { type: String, required: true },
    interface: {
        device_id: { type: String, required: true },
        interface: { type: String, required: true }
    },
    network: { type: String, required: true }
});

const Network = mongoose.model("Network", networkSchema);

module.exports = Network;
