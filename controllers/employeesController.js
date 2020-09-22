const db = require("../models");
const moment = require("moment")
// Defining methods for the EmployeesController
module.exports = {
  findAll: function (req, res) {
    console.log('Employee findAll')
    db.Employee
      .find(req.query)
      .then(dbModel => res.json({ results: dbModel }))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    console.log('Employee findById', req.params.id)
    db.Employee.find({ _id: req.params.id }).sort({"email":1})
      .populate("appointments")
      .then(dbModel => {
        console.log(dbModel)
        res.json({ results: dbModel });
      })
      .catch(err => {
        res.json(err);
      });


    // db.Employee
    //   .findById(req.params.id)
    //   .then(dbModel => res.json({results:dbModel}))
    //   .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log('create:', req.body)
    db.Employee
      .create(req.body)
      .then(dbModel => {
        console.log({ results: dbModel })
        res.json({ results: dbModel })
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Employee
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json({ results: dbModel }))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Employee
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json({ results: dbModel }))
      .catch(err => res.status(422).json(err));
  }
};
