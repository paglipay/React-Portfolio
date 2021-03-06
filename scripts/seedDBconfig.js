const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb+srv://user1:Pa55w0rd@cluster0.ay0lz.mongodb.net/react-portfolio?retryWrites=true&w=majority"
);

const configSeed = [
  {
    "name": "TEST",
    "config": "config"
  }
];

  db.Config
  .remove({})
  .then(() => db.Config.collection.insertMany(configSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
