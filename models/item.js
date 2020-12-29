const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    id: { type: String, required: true },
    jobs: [
        {
            type: Schema.Types.ObjectId,
            id: "Job"
        }
    ],
    name: { type: String, required: true },
    value: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
