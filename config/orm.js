var sqlDatabase = require("./connection.js");

var orm = {

    all: function(tableData, callback) {
        sqlDatabase.query("SELECT * FROM burgers", function(err, result) {
            if (err) throw err;

            callback(result);
        });
    },
    create: function(tableData, values, callback) {
        sqlDatabase.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, false)", values, function(err, result) {
            if (err) throw err;

        callback(result);
        });
    },

    update: function(tableData, condition, callback) {
        sqlDatabase.query("UPDATE burgers SET devoured=true WHERE id = ?", condition, function(err, result) {
        if (err) {
            throw err;
        }
        callback(result);
        });
    },

    delete: function(table, condition, callback) {
        var queryString = "DELETE FROM burgers WHERE " + condition;
       
        sqlDatabase.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    }
};

module.exports = orm;