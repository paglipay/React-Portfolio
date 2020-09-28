const router = require("express").Router();
const appointmentsController = require("../../controllers/appointmentsController");

// Matches with "/api/appointments"
router.route("/")
.get(appointmentsController.findAll)
.post(appointmentsController.create);



// Matches with "/api/books/:id"
router
.route("/:id")
.get(appointmentsController.findById)
.put(appointmentsController.update)
.delete(appointmentsController.remove);

router
  .route("/uuid/:id")
  .get(appointmentsController.findByUuId)

// Matches with "/api/availabletimes/:date"
router
  .route("/availabletimes/:date")
  .get(appointmentsController.findAvailabletimesByDate)

module.exports = router;
