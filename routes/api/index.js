const router = require("express").Router();
const appointmentRoutes = require("./appointments");
const employeeRoutes = require("./employees");
const configRoutes = require("./configs");
const collectionRoutes = require("./collections");
const projectRoutes = require("./projects");
// const bookRoutes = require("./books");
const dtreeRoutes = require("./dtree");
const userRoutes = require("./users");
const authCheckMiddleware = require('../../config/middleware/authCheck');
		

// Book routes
// router.use("/books", bookRoutes);
// Book routes
router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/employees", authCheckMiddleware, employeeRoutes);
router.use("/configs", configRoutes);
router.use("/collections", collectionRoutes);
router.use("/projects", projectRoutes);
router.use("/dtree", dtreeRoutes);

module.exports = router;
