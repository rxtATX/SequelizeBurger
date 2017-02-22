var db = require("../models");

module.exports = function(app) {

    app.get("/api", function(req, res) {
        db.Burger.findAll({}).then(function(burgerdb) {
            res.json(burgerdb);
        });
    });

    // app.get("/:id", function(req, res) {
    //     db.Burger.findOne({
    //             where: {
    //                 id: req.params.id
    //             }
    //         }).then(function(burgerdb) {
    //             res.json(burgerdb);
    //     });
    // });
    app.get("/favicon.ico", function(req, res) {
        res.send(204);
    });

    app.post("/api", function(req, res) {
        db.Burger.create({
            burger_name: req.body.burger_name,
            devoured: false
        }).then(function(burgerdb) {
            res.json(burgerdb);
        });
    });

    app.put("/api", function(req, res) {
        db.Burger.update({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured,
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(burgerdb) {
            res.json(burgerdb);
        });
    });

    app.delete("/api/:id", function(req, res) {
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(burgerdb) {
            res.json(burgerdb);
        });
    });
};