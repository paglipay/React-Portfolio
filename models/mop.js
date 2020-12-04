const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mopSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const Mop = mongoose.model("Mop", mopSchema);

module.exports = Mop;
