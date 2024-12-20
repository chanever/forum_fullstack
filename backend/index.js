require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Node.js!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
