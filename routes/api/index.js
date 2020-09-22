const router = require("express").Router();
const appointmentRoutes = require("./appointments");
const employeeRoutes = require("./employees");
// const bookRoutes = require("./books");
const userRoutes = require("./users");

// Book routes
// router.use("/books", bookRoutes);
// Book routes
router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/employees", employeeRoutes);

module.exports = router;
