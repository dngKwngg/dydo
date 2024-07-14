const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/auth", authRoute);
module.exports = app;
