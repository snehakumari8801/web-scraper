
const express = require("express");
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", scraperRoutes);

module.exports = app;