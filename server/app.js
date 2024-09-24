const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");
const menuRoute = require("./routes/menuRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const userRoute = require("./routes/userRoute");
const cors = require("cors")

app.use(
	cors({
		origin: "*", // allow requests from any other server
	})
);


app.use(bodyParser.json());
app.use("/auth", authRoute);
app.use("/order", orderRoute);
app.use("/menu",menuRoute);
app.use("/restaurant",restaurantRoute);
app.use("/user",userRoute);
module.exports = app;
