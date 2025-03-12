const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.listen(5001, () => console.log("User Service running on port 5001"));