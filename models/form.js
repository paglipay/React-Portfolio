const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema({
    name: { type: String, required: true },
    items: [
        {
            type: Schema.Types.ObjectId,
            id: "Item"
        }
    ]
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
