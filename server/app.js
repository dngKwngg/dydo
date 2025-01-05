import express from "express";
import cors from "cors";

import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.js";
import orderRoute from "./routes/orderRoute.js";
import menuRoute from "./routes/menuRoute.js";
import restaurantRoute from "./routes/restaurantRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
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

export default app;