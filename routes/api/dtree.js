const router = require("express").Router();
const dtreeController = require("../../controllers/dtreeController");

// Matches with "/api/dtree"
router.route("/start")
.get(dtreeController.start)



module.exports = router;
