const router = require("express").Router();
const booksController = require("../../controllers/booksController");

var authCheck = require("../../config/middleware/authCheck");
// Matches with "/api/books"
router.route("/")
  .get(authCheck, booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
