const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/KAMPers"
);

const employeeSeed = [
  {
    "name": {
      "title": "Mr",
      "first": "Mahmoud",
      "last": "Hijazi"
    },
    "appointments": [],
    "email": "hijaziii@example.com",
    "dob": {
      "date": "1981-03-07T12:38:20.729Z",
      "age": 38
    },
    "phone": "(818)-654-9640",
    "picture": {
      "large": "https://randomuser.me/api/portraits/men/80.jpg",
      "medium": "https://randomuser.me/api/portraits/med/men/80.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/men/80.jpg"

    }
  }
];


// db.Employee.collection.insertMany(employeeSeed)
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });


  db.Employee
  .remove({})
  .then(() => db.Employee.collection.insertMany(employeeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
