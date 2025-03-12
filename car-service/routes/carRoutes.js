const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController")

router.post("/", carController.createCar);
router.get("/:carId", carController.getCar);
router.put("/:carId", carController.updateCar);

module.exports = router;