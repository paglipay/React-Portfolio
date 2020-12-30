const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    name: { type: String, required: true },
    projects: [
    ],
    author: { type: String, required: false },
    date: { type: Date, default: Date.now }
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
