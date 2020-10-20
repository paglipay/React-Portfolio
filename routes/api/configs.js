const router = require("express").Router();
const configsController = require("../../controllers/configsController");

// Matches with "/api/configs"
router.route("/")
  .get(configsController.findAll)
  .post(configsController.create);

// Matches with "/api/configs/:id"
router
  .route("/:id")
  .get(configsController.findById)
  .put(configsController.update)
  .delete(configsController.remove);

module.exports = router;
