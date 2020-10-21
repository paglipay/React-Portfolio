const router = require("express").Router();
const appointmentRoutes = require("./appointments");
const employeeRoutes = require("./employees");
const configRoutes = require("./configs");
// const bookRoutes = require("./books");
const userRoutes = require("./users");
const authCheckMiddleware = require('../../config/middleware/authCheck');
		

// Book routes
// router.use("/books", bookRoutes);
// Book routes
router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/employees", authCheckMiddleware, employeeRoutes);
router.use("/configs", configRoutes);

module.exports = router;
