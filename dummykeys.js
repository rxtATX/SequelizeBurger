var mysql = require("mysql");

exports.connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
    //Put your own password here.
	password: "",
	database: "burgers_db"
});