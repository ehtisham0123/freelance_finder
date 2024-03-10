let express = require("express");
let router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");
let temp = {};

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "freelance_finder",
});

router.get("/enrolled/:name?", verifyToken, async function (req, res, next) {
  try {
    if (req.params.name) {
      let sql = `
    SELECT services.*
    FROM services
    WHERE services.name LIKE ? AND services.id IN (SELECT enrollment.service_id 
    FROM enrollment WHERE buyer_id = ?)`;
      name = "%" + req.params.name + "%";
      await db.query(sql, [name, req.user_id], function (err, services) {
        res.status(201).json({ services: services });
      });
    } else {
      sql = `
    SELECT services.*
    FROM services
    WHERE services.id IN
    (SELECT enrollment.service_id
    FROM enrollment
    WHERE
    buyer_id = ?);
    `;
      await db.query(sql, [req.user_id], function (err, services) {
        res.status(201).json({ services: services });
      });
    }
  } catch (er) {
    console.log(err);
  }
});

// connect to database
db.connect();
/* GET services listing. */
router.get("/:name?", verifyToken, (req, res, next) => {
  const getUser = async () => {
    var sql = `SELECT buyers.latitude as buyer_latitude,buyers.longitude as buyer_longitude FROM buyers WHERE buyers.id = ?`;
     db.query(sql, [req.user_id], function (err, buyer) {
      buyer = buyer[0];
      if (req.params.name) {
        let sql = `SELECT services.*,sellers.name as seller_name
          FROM services
          INNER JOIN sellers ON services.seller_id=sellers.id 
          WHERE services.name LIKE ?`;
        name = "%" + req.params.name + "%";
        db.query(sql,[name], (err, services) => {
          if (err) throw err;
  
              for(let i=1; i<services.length; i++)
              {
                for(let j=0; j<services.length-i; j++) 
                {    
                  var radlat1 = Math.PI * parseFloat(buyer.buyer_latitude)/180;
                  var radlat2 = Math.PI * parseFloat(services[j].latitude)/180;
                  var theta = parseFloat(buyer.buyer_longitude)-parseFloat(services[j].longitude);
                  var radtheta = Math.PI * theta/180;
                  var dist1 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist1 > 1) {
                    dist1 = 1;
                  }
                  dist1 = Math.acos(dist1);
                  dist1 = dist1 * 180/Math.PI;
                  dist1 = dist1 * 60 * 1.1515;
                  dist1 = dist1 * 1.609344      
                  radlat1 = Math.PI * parseFloat(buyer.buyer_latitude)/180;
                  radlat2 = Math.PI * parseFloat(services[j+1].latitude)/180;
                  theta = parseFloat(buyer.buyer_longitude)-parseFloat(services[j+1].longitude);
                  radtheta = Math.PI * theta/180;
                  var dist2 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist2 > 1) {
                    dist2 = 1;
                  }
                  dist2 = Math.acos(dist2);
                  dist2 = dist2 * 180/Math.PI;
                  dist2 = dist2 * 60 * 1.1515;
                  dist2 = dist2 * 1.609344     
                  if((dist2)<(dist1))
                  {
                    temp=services[j];
                    services[j]=services[j+1];
                    services[j+1]=temp;
                  }   
                }
              }
          res.status(201).json({ result: services });
        });
      } else {
        let sql = `SELECT services.*,sellers.name  as seller_name,sellers.latitude,sellers.longitude
          FROM services
          INNER JOIN sellers ON services.seller_id=sellers.id
          WHERE 1
          `;
          db.query(sql, (err, services) => {
          if (err) throw err;
  
              for(let i=1; i<services.length; i++)
              {
                for(let j=0; j<services.length-i; j++) 
                {    
                  var radlat1 = Math.PI * parseFloat(buyer.buyer_latitude)/180;
                  var radlat2 = Math.PI * parseFloat(services[j].latitude)/180;
                  var theta = parseFloat(buyer.buyer_longitude)-parseFloat(services[j].longitude);
                  var radtheta = Math.PI * theta/180;
                  var dist1 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist1 > 1) {
                    dist1 = 1;
                  }
                  dist1 = Math.acos(dist1);
                  dist1 = dist1 * 180/Math.PI;
                  dist1 = dist1 * 60 * 1.1515;
                  dist1 = dist1 * 1.609344      
                  radlat1 = Math.PI * parseFloat(buyer.buyer_latitude)/180;
                  radlat2 = Math.PI * parseFloat(services[j+1].latitude)/180;
                  theta = parseFloat(buyer.buyer_longitude)-parseFloat(services[j+1].longitude);
                  radtheta = Math.PI * theta/180;
                  var dist2 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist2 > 1) {
                    dist2 = 1;
                  }
                  dist2 = Math.acos(dist2);
                  dist2 = dist2 * 180/Math.PI;
                  dist2 = dist2 * 60 * 1.1515;
                  dist2 = dist2 * 1.609344     
                  if((dist2)<(dist1))
                  {
                    temp=services[j];
                    services[j]=services[j+1];
                    services[j+1]=temp;
                  }   
                }
              }
          res.status(201).json({ result: services });
        });
      }
    });
  };
  getUser();
});

/* GET single service */
router.get("/show/:id", verifyToken, async (req, res, next) => {
  try {
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
    await db.query(sql, [req.params.id], (err, result) => {
      try {
        sql = `SELECT reviews.*,
        buyers.firstname as buyer_firstname,
        buyers.lastname as buyer_lastname,
        buyers.avatar as buyer_photo
        FROM reviews 
        INNER JOIN buyers ON reviews.buyer_id=buyers.id
        WHERE
        reviews.service_id = ?
      `;
        db.query(sql, [req.params.id], (err, reviews) => {
          try {
            sql = `SELECT enrollment.*
              FROM enrollment
              WHERE
              buyer_id = ? AND service_id = ?;
              `;
            db.query(
              sql,
              [req.user_id, req.params.id],
              function (err, enrollment) {
                if (enrollment.length > 0) {
                  res.status(201).json({
                    result: result,
                    reviews: reviews,
                    enrollment_id: enrollment[0].id,
                  });
                } else {
                  res.status(201).json({
                    result: result,
                    reviews: reviews,
                    enrollment_id: 0,
                  });
                }
              }
            );
          } catch (er) {
            console.log(err);
          }
        });
      } catch (er) {
        console.log(err);
      }
    });
  } catch (er) {
    console.log(err);
  }
});

router.delete("/enrollment/:id", verifyToken, async (req, res, next) => {
  let sql = `DELETE FROM enrollment WHERE service_id = ? AND buyer_id = ?`;
  await db.query(sql, [req.params.id, req.user_id], (err, result) => {
    if (err) throw err;
    res.status(201).json({ result: result });
  });
});

router.delete("/reviews/:id", verifyToken, async function (req, res, next) {
  let sql = `DELETE FROM reviews WHERE id = ? AND buyer_id`;
  await db.query(sql, [req.params.id, req.user_id], function (err, result) {
    if (err) throw err;
    res.status(201).json({ result: result });
  });
});

router.post("/enroll", verifyToken, async function (req, res, next) {
  const service_id = req.body.service_id;
  const seller_id = req.body.seller_id;
  const buyer_id = req.user_id;
  sql =
    "INSERT INTO `enrollment` (buyer_id, service_id,seller_id) VALUES (?)";
  let values = [buyer_id, service_id, seller_id];
  await db.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({ enrollment_id: result.insertId });
    }
  });
});

router.post("/review", verifyToken, async function (req, res, next) {
  const buyer_id = req.user_id;
  const service_id = req.body.service_id;
  const seller_id = req.body.seller_id;
  const enorllment_id = req.body.enorllment_id;
  const reviews = req.body.reviews;
  const reviews_details = req.body.reviews_details;

  sql =
    "INSERT INTO `reviews` (buyer_id, service_id,seller_id,enrollment_id,reviews,reviews_details) VALUES (?)";
  let values = [
    buyer_id,
    service_id,
    seller_id,
    enorllment_id,
    reviews,
    reviews_details,
  ];
  await db.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      res.status(201).json({ error: "Error while inseting data" });
    } else {
      res.status(201).json({ success: "Review Added" });
    }
  });
});

/* GET buyers listing. */

module.exports = router;
