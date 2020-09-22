const db = require("../models");
const moment = require("moment")

function getDaterange(start, end, arr) {
  if (!moment(start).isSameOrAfter(end)) {
    // if (arr.length == 0) arr.push(moment(start).format("dddd, MMMM Do YYYY, h:mm:ss a"));
    var next = moment(start).add(15, 'minutes');
    //  arr.push(next.format("dddd, MMMM Do YYYY, h:mm:ss a"));


    if (Math.random() >= 0.7) {
      arr.push(next.format("h:mm a"));
    }
    getDaterange(next, end, arr);
  } else {
    return arr;
  }
  return arr;
}
// Defining methods for the appointmentsController
module.exports = {
  findAll: function (req, res) {
    db.Appointment
      .find(req.query)
      // .find({ ...req.query, user_id: req.userId }) fillter by users
      .sort({ date: -1 })
      .then(dbModel => res.json({ results: dbModel }))
      .catch(err => res.status(422).json(err));
  },
  findAvailabletimesByDate: function (req, res) {
    console.log(req.params.date)
    let date_start = moment(req.params.date).add(8, 'hours');
    let date_end = moment(date_start).add(9, 'hours')
    console.log('date_end', date_end)
    console.log('date_start', date_start)
    db.Appointment
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(getDaterange(date_start, date_end, [])))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Appointment
      .findById(req.params.id)
      .then(dbModel => res.json({ results: dbModel }))
      .catch(err => res.status(422).json(err));
  },
  findByUuId: function (req, res) {
    db.Appointment
      .find({ uuid_id: req.params.id })
      .then(dbModel => res.json({ results: dbModel }))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log('create:', req.body)
    db.Appointment
      .create(req.body)
      // .create({ ...req.body, user_id: req.userId })  adding user id to appointment that been created
      .then(({ _id }) => db.Employee.findOneAndUpdate({ email: req.body.employee },
        { $push: { appointments: _id } }, { new: true }))
      .then(dbModel => {
        console.log({ results: dbModel })
        res.json({ results: dbModel })
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      });
  },


  update: function (req, res) {
    db.Appointment
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json({ results: dbModel }))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Appointment
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json({ results: dbModel }))
      .catch(err => res.status(422).json(err));
  }
};
