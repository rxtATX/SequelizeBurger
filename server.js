var express = require("express");
var app = express();

var path = require("path");
app.use(express.static(process.cwd + "/public"));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

var PORT = 5000;
app.listen(process.env.PORT || 5000, function() {
    console.log("App listening on PORT " + PORT);
});