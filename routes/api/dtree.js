const router = require("express").Router();
const dtreeController = require("../../controllers/dtreeController");

// Matches with "/api/dtree"
router.route("/start/:id")
    .get(dtreeController.start)
    .post(dtreeController.send)

module.exports = router;
