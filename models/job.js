const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  items: [mongoose.Schema.Types.ObjectId],
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
