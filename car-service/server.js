const express = require("express");
const cors = require("cors");
const carRoutes = require("./routes/carRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/cars", carRoutes);

app.listen(5002, () => console.log("Car Service running on port 5002"));