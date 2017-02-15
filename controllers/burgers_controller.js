var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
		var hbsObject = {
			burgers: data
		};
		res.render("index", hbsObject);
	});
});

router.post("/", function(req, res) {
	burger.create([
		"burger_name", "devoured"
	], [
		req.body.burger_name, false
	], function() {
		res.redirect("/");
	});
});

router.put("/:id", function(req, res) {
	var condition = req.params.id;

	burger.update({
		devoured: req.body.devoured
	}, condition, function() {
		res.redirect("/");
	});
});

router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function() {
    res.redirect("/");
  });
});

module.exports = router;