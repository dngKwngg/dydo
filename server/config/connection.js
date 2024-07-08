const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "dydo",
});

connection.connect((err) => {
	if (err) {
		throw err;
	} else {
		console.log("Connected to the database");
	}
});

module.exports = connection;
