const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controller/userController")

router.post("/", userController.createUser);
router.get("/:userId", userController.getUser);
router.put("/:userId", userController.updateUser);

module.exports = router;