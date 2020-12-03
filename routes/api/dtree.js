const router = require("express").Router();
const dtreeController = require("../../controllers/dtreeController");

// Matches with "/api/dtree"
router.route("/start/:id")
    .get(dtreeController.show)
    .post(dtreeController.start)

router.route("/send/:id")
    .post(dtreeController.send)

module.exports = router;
