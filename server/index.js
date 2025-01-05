import dotenv from "dotenv";
import app from "./app.js";
// Temp temp temp temp temp
// const connection = require("./config/connection.js");

// Load environment variables
dotenv.config({ path: "./.env" });

// Define PORT
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
