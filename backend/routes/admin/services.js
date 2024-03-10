let express = require("express");
let router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const verifyToken = require('../verifyToken');

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "freelance_finder",
});

// connect to database
db.connect();
/* GET services listing. */


router.get("/hired-services/:id",verifyToken,async (req, res, next) => {
   
  try{
    sql = `SELECT buyers.id,buyers.firstname, buyers.lastname,buyers.email,buyers.avatar
      FROM buyers
      WHERE buyers.id IN
      (SELECT enrollment.buyer_id
      FROM enrollment
      WHERE
      service_id = ?) 
  `;
      db.query(sql, [req.params.id], function (err, result) {           
          res.status(201).json({ result:result});
      });
    }catch (er) {
      console.log(err);
    }
}); 


router.get("/:name?",verifyToken, async (req, res, next) => {
  if (req.params.name) {
    let sql = `SELECT services.*,sellers.name as seller_name
    FROM services
    INNER JOIN sellers ON services.seller_id=sellers.id 
    WHERE services.name LIKE ?`;
    name = "%" + req.params.name + "%";
    await db.query(sql, [name], function (err, result) {
      res.status(201).json({ result: result });
    });
  } 
  else {
    let sql = `SELECT services.*,sellers.name as seller_name
    FROM services
    INNER JOIN sellers ON services.seller_id=sellers.id
    WHERE 1
    `;
    await db.query(sql, function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    });
  }
});


/* GET single service */
router.get("/show/:id",verifyToken, async function (req, res, next) {
    try{
      let sql = `SELECT services.*,
      sellers.id as seller_id,
      sellers.firstname as seller_firstname,
      sellers.lastname as seller_lastname,
      sellers.country as seller_country,
      sellers.city as seller_city,
      sellers.avatar as seller_photo
      FROM services 
      INNER JOIN sellers ON services.seller_id=sellers.id
      WHERE
      services.id = ?
      `;
      await db.query(sql, [req.params.id], function (err, result) {
      try{
      sql = `SELECT reviews.*,
      buyers.firstname as buyer_firstname,
      buyers.lastname as buyer_lastname,
      buyers.avatar as buyer_photo
      FROM reviews 
      INNER JOIN buyers ON reviews.buyer_id=buyers.id
      WHERE
      reviews.service_id = ?
      `;
          db.query(sql, [req.params.id], function (err, reviews) {

                try{
                sql = `SELECT buyers.id,buyers.name,buyers.avatar
                  FROM buyers
                  WHERE buyers.id IN
                  (SELECT enrollment.buyer_id
                  FROM enrollment
                  WHERE
                  service_id = ?)
              `;
                  db.query(sql, [req.params.id], function (err, enrollments) {           
                      res.status(201).json({ result: result , reviews : reviews ,enrollments:enrollments});
                  });
                }catch (er) {
                  console.log(err);
                }
          });
        }catch (er) {
          console.log(err);
        }
      }); 
    }catch (er) {
      console.log(err);
    }
});


/* GET single service */
router.get("/edit/:id",verifyToken, async function (req, res, next) {
    let sql = `SELECT services.* FROM services
    WHERE
    services.id = ?
    `;
    await db.query(sql, [req.params.id], function (err, result) {
      res.status(201).json({ result: result });
    });
});


router.delete("/:id",verifyToken, async function (req, res, next) {
    let sql = `DELETE FROM services WHERE id = ?`;
    await db.query(sql, [req.params.id], function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    });
});

router.delete("/enrollment/service/:service_id/buyer/:buyer_id",verifyToken, async function (req, res, next) {
  let sql = `DELETE FROM enrollment WHERE service_id = ? AND buyer_id = ?`;
  await db.query(sql, [req.params.service_id, req.params.buyer_id], function (err, result) {
    if (err) throw err;
    res.status(201).json({ result: result });
  });
});



router.put("/update",verifyToken, async (req, res, next) => {
  let id = req.body.id;
  let name = req.body.name;
  let details = req.body.details;
  let seller_id = req.body.seller_id;
  console.log(req.body);
  sql =
    `
      UPDATE services
      SET name = ?, 
      details = ?,
      seller_id = ?
      WHERE id = ? 
      `;    
    await db.query(sql, [name,details,seller_id,id], function (err, result) {
        if (err) throw err;      
        res.status(201).json({'success':'Service updated'});  
    })
  })

 
module.exports = router;