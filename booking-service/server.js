const express = require("express");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/bookings", bookingRoutes);

app.listen(5003, () => console.log("Booking Service running on port 5003"));
