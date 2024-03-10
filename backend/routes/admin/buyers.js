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
router.get("/:name?", verifyToken, async function (req, res, next) {
  if (req.params.name) {
    var sql = `SELECT * FROM buyers WHERE (CONCAT(firstname, ' ', lastname) LIKE ?)`;
    name = "%" + req.params.name + "%";
    await db.query(sql, [name], function (err, result) {
      res.status(201).json({ result: result });
    });
  } else {
    var sql = ` SELECT buyers.* FROM buyers WHERE 1;`;
    await db.query(sql, function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    });
  }
});

router.post("/store",verifyToken, async (req, res, next) => {
  let name = req.body.name,
    email = req.body.email,
    password = req.body.password,
    firstname = req.body.firstname,
    lastname = req.body.lastname,
    age = req.body.age,
    housenumber = req.body.housenumber,
    streetnumber = req.body.streetnumber,
    city = req.body.city,
    state = req.body.state,
    postalcode = req.body.postalcode,
    country = req.body.country,
    contact = req.body.contact,
    gender = req.body.gender,
    latitude = req.body.latitude,
    longitude = req.body.longitude,
    created_at = "date",
    updated_at = "date";
  email = email.toLowerCase();
  let photo;

  try {
    var sql = "SELECT * FROM buyers WHERE email = ? ";
    await db.query(sql, [email], function (err, result) {
      if (result.length > 0) {
        return res.status(201).json({ error: "Email is already registered" });
      } else {
        if (req.files === null) {
          photo = "profile.png";
        } else {
          const avatar = req.files.avatar;
          photo = avatar.name.split(".");
          photo = photo[0] + "." + Date.now() + "." + photo[photo.length - 1];
          (async () => {
            avatar.mv(
              `${__dirname}/../../../frontend/public/uploads/${photo}`,
              (err) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          })();
        }
        //Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, async (err, hash) => {
            var sql =
              "INSERT INTO `buyers` (name, email,password,firstname,lastname,gender,age,contact,avatar,housenumber,streetnumber,city,state,postalcode,country,latitude,longitude,created_at,updated_at) VALUES (?)";
            var values = [
              name,
              email,
              hash,
              firstname,
              lastname,
              gender,
              age,
              contact,
              photo,
              housenumber,
              streetnumber,
              city,
              state,
              postalcode,
              country,
              latitude,
              longitude,
              created_at,
              updated_at,
            ];
            await db.query(sql, [values], function (err, result) {
              if (err) {
                res.status(201).json({ error: "Error while inseting data" });
              } else {
                res.status(201).json({ success: "buyer Registerd" });
              }
            });
          })
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
});


/* GET buyers listing. */
router.get("/edit/:id", verifyToken, async function (req, res, next) {
  try {
    var sql = `SELECT buyers.* FROM buyers WHERE buyers.id = ?`;
    await db.query(sql, [req.params.id], function (err, result) {
      res.status(201).json({ result: result });
    });
  } catch (er) {
    console.log(err);
  }
});

/* GET buyers listing. */
router.get("/profile/:id", verifyToken, async function (req, res, next) {
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

 

router.put("/update",verifyToken, async (req, res, next) => {
  let id = req.body.id,
    name = req.body.name,
    email = req.body.email,
    firstname = req.body.firstname,
    lastname = req.body.lastname,
    age = req.body.age,
    housenumber = req.body.housenumber,
    streetnumber = req.body.streetnumber,
    city = req.body.city,
    state = req.body.state,
    postalcode = req.body.postalcode,
    country = req.body.country,
    contact = req.body.contact,
    gender = req.body.gender,
    avatar = req.body.avatar,
    latitude = req.body.latitude,
    longitude = req.body.longitude,
    oldEmail = req.body.oldEmail,
    updated_at = "24";
  email = email.toLowerCase();
  let photo;
  try {
    var sql = "SELECT * FROM buyers WHERE email = ? ";
    await db.query(sql, [email], function (err, result) {
      if (result.length > 0 && result[0].email != oldEmail) {
        return res.status(201).json({ error: "Email is already registered" });
      } else {
        if (req.files === null) {
          photo = avatar;
        } else {
          if (req.body.avatar != 'profile.png') {
            fs.unlinkSync(
              `${__dirname}/../../../frontend/public/uploads/${req.body.avatar}`
            );
          }
          const avatar = req.files.file;
          photo = avatar.name.split(".");
          photo = photo[0] + "." + Date.now() + "." + photo[photo.length - 1];
          (async () => {
            avatar.mv(
              `${__dirname}/../../../frontend/public/uploads/${photo}`,
              (err) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          })();
        }
        sql = `UPDATE buyers SET name = ? , email = ? , firstname = ? , lastname = ? , gender = ? , age = ? , contact = ? , avatar = ? , housenumber = ? , streetnumber = ? , city = ? , state = ? , postalcode = ? , country = ? , latitude = ? , longitude = ? , updated_at = ? WHERE id = ? ;`;
        db.query(
          sql,
          [
            name,
            email,
            firstname,
            lastname,
            gender,
            age,
            contact,
            photo,
            housenumber,
            streetnumber,
            city,
            state,
            postalcode,
            country,
            latitude,
            longitude,
            updated_at,
            id,
          ],
          function (err, result) {
            if (err) {
              res.status(201).json({ error: "Error while updating data" });
            } else {
               res.status(201).json({ avatar:photo ,success: "Profile Updated" });
           }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
});



router.delete("/:id", verifyToken, async function (req, res, next) {
  try {
    var sql = `SELECT buyers.avatar FROM buyers WHERE buyers.id = ?`;
    await db.query(sql, [req.params.id], function (err, result) {
      if (result[0].avatar != 'profile.png') {
        fs.unlinkSync(
          `${__dirname}/../../../frontend/public/uploads/${result[0].avatar}`
        );
      }
      (async () => {
        try {
          var sql = `DELETE FROM buyers WHERE id = ?`;
          await db.query(sql, [req.params.id], function (err, result) {
            res.status(201).json({ result: result });
          });
        } catch (err) {
          console.log(err);
        }
      })();
    });
  } catch (er) {
    console.log(err);
  }
});

module.exports = router;
