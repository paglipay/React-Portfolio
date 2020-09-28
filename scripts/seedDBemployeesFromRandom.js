const mongoose = require("mongoose");
const db = require("../models");
const axios = require('axios')
// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb+srv://user1:Pa55w0rd@cluster0.ay0lz.mongodb.net/react-portfolio?retryWrites=true&w=majority"
);

const getBreeds = () => {
  try {
    return axios.get('https://randomuser.me/api/?results=10&nat=us')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = getBreeds()
    .then(response => {
      if (response.data.results) {
        console.log(
          `Got ${Object.entries(response.data.results).length} breeds`
        )

        db.Employee.collection.insertMany(response.data.results)
          .then(data => {
            console.log(data.result.n + " records inserted!");
            process.exit(0);
          })
          .catch(err => {
            console.error(err);
            process.exit(1);
          });

        // db.Employee
        //   .remove({})
        //   .then(() => db.Employee.collection.insertMany(response.data.results))
        //   .then(data => {
        //     console.log(data.result.n + " records inserted!");
        //     process.exit(0);
        //   })
        //   .catch(err => {
        //     console.error(err);
        //     process.exit(1);
        //   });
      }
    })
    .catch(error => {
      console.log(error)
    })
}

countBreeds()
