const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const employeeSchema = new Schema({
    name: {
        title: { type: String, required: true },
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    // phone: { type: String, required: true },
    email: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        required: true
    },
    appointments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Appointment"
        }
    ]
});

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
