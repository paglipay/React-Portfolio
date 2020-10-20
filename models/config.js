const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const configSchema = new Schema({
  // id: { type: String, required: true },
  name: { type: String, required: true },
  data: {},
  config: { type: String, required: true }
});

const Config = mongoose.model("Config", configSchema);

module.exports = Config;
