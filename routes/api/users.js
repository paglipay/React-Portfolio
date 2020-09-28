const router = require("express").Router();
const usersController = require("../../controllers/usersController");
var passport = require("../../config/passport");

router.route("/")
    .get(usersController.findAll)
    .post(usersController.create);


router
    .route("/:id")
    .get(usersController.findById)
    .put(usersController.update)
    .delete(usersController.remove);

router
    .route("/signup")
    .post(usersController.signUpUser)

router.route("/login")
// .post(passport.authenticate("local"), usersController.loginUser)
.post(passport.authenticate("local"), usersController.loginUser)

router.route("/logout/:id")
    .get(usersController.signOutUser)

module.exports = router;
