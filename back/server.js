const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2/promise");
const config = require("./app/config/db.config");

var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors());
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
mysql
	.createConnection({
		user: config.USER,
		password: config.PASSWORD,
	})
	.then((connection) => {
		connection.query(`CREATE DATABASE IF NOT EXISTS ${config.DB};`);
	})
	.then(() => {
		const db = require("./app/models");

		// db.sequelize.sync({force: true});
		db.sequelize.sync();
		// force: true will drop the table if it already exists
		// db.sequelize.sync({force: true}).then(() => {
		//   console.log('Drop and Resync Database with { force: true }');
		//   initial();
		// });

		// routes
		require("./app/routes/auth.routes")(app);
		require("./app/routes/user.routes")(app);
	});
// set port, listen for requests
const PORT = 7000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
