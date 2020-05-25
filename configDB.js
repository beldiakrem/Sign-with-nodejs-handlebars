/**
 * configDB database - Database config
 * @module configDB
 */

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://akrem:akrem123456@cluster0-ijzli.mongodb.net/autopailot?retryWrites=true&w=majority",{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
); // Here put the database you want to connect to.

var db = mongoose.connection;

db.on("error", () => console.log("Error in connection"));
db.once("open", () => {
	console.log("connected");
});

module.exports = db;
