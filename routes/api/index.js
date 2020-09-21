const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");

// Book routes
router.use("/books", bookRoutes);
// Book routes
router.use("/users", userRoutes);

module.exports = router;
