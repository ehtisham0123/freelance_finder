var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");
const fileUpload = require("express-fileupload");
const fs = require("fs");
router.use(fileUpload());

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "freelance_finder",
});

// connect to database
db.connect();


/* GET sellers listing. */
router.get("/:id", verifyToken, async function (req, res, next) {
  try {
    var sql = `SELECT sellers.* FROM sellers WHERE sellers.id = ?`;
    await db.query(sql, [req.params.id], function (err, result) {
      (async () => {
        try{
          sql = `SELECT services.id,services.name
          FROM services 
          INNER JOIN sellers ON services.seller_id=sellers.id
          WHERE
          sellers.id = ?
          `;
             await db.query(sql, [req.params.id], function (err, services) {
                  res.status(201).json({ result: result , services : services });
              });
        }catch (er) {
            console.log(err);
        }
        })();

      });
      } catch (er) {
      console.log(err);
    }

});

 

module.exports = router;
