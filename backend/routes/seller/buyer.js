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


/* GET buyers listing. */
router.get("/:id", verifyToken, async function (req, res, next) {
  try {
    var sql = `SELECT buyers.* FROM buyers WHERE buyers.id = ?`;
    await db.query(sql, [req.params.id], function (err, result) {
      (async () => {
        try{
          sql = `
          SELECT services.*
          FROM services
          WHERE services.id IN
          (SELECT enrollment.service_id
          FROM enrollment
          WHERE
          buyer_id = ?)
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
