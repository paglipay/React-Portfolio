const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  uuid_id: { type: String, required: true },
  name: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: true },
  employee: { type: String, required: true },
  employee_id: { type: String, required: false },
  info: { type: String, required: false },
  datetime: { type: Date, required: true },
  //user_id: { type: String, required: true}

});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
