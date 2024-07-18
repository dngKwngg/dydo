const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");

app.use(bodyParser.json());
app.use("/auth", authRoute);
app.use("/order", orderRoute);
module.exports = app;
