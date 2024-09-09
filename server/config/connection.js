const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "dydo",
	// password: "2529062k3",
});

connection.connect((err) => {
	if (err) {
		throw err;
	} else {
		console.log("Connected to the database");
	}
});

module.exports = connection;
