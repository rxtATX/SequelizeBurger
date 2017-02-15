USE burgers_db;

INSERT INTO burgers (burger_name, devoured)
VALUES ("Mushroom and Swiss", true)
, ("Texan", false)
, ("Jalapeno and Cheddar", false);

SELECT * FROM burgers;