const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);
router.get("/:userId", bookingController.getBookingsByUser);
router.delete("/:bookingId", bookingController.cancelBooking);

module.exports = router;
