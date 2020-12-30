const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: { type: String, required: true },
    forms: [
        {
            type: Schema.Types.ObjectId,
            id: "Form"
        }
    ],
    author: { type: String, required: false },
    date: { type: Date, default: Date.now }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
