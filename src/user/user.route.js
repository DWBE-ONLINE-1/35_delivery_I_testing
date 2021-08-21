const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const { userService } = require("./dependency");
const { logErrors, clientErrorHandler, errorHandler } = require("../exceptions/errorHandler");

const userController = new UserController(userService);

router.post("/user", (req, res, next) => userController.register(req, res, next));
router.get("/user/:id", (req, res) => userController.getUser(req, res));

router.use(logErrors);
router.use(clientErrorHandler);
router.use(errorHandler);

module.exports = router;
