var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mysql = require("mysql");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "freelance_finder",
});

// connect to database
db.connect();


var adminRouter = require('./routes/admin/admin');
var buyersAdminRouter = require('./routes/admin/buyers');
var sellersAdminRouter = require('./routes/admin/sellers');
var servicesAdminRouter = require('./routes/admin/services');

var sellerRouter = require('./routes/seller/seller');
var servicesSellerRouter = require('./routes/seller/services');
var buyerSellerRouter = require('./routes/seller/buyer');
var chatSellerRouter = require('./routes/seller/chat');

var buyerRouter = require('./routes/buyer/buyer');
var servicesUserRouter = require('./routes/buyer/services');
var sellerUserRouter = require('./routes/buyer/seller');
var chatUserRouter = require('./routes/buyer/chat');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
   var sql = `select 
    (select count(*) from buyers) as buyers,
    (select count(*) from sellers) as sellers,
    (select count(*) from services) as services`;  
      await db.query(sql, function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    });
});

app.use('/admin', adminRouter);
app.use('/admin/buyers', buyersAdminRouter);
app.use('/admin/sellers', sellersAdminRouter);
app.use('/admin/services', servicesAdminRouter);

app.use('/seller', sellerRouter);
app.use('/seller/services', servicesSellerRouter);
app.use('/seller/buyers/profile/', buyerSellerRouter);
app.use('/seller/chat/', chatSellerRouter);


app.use('/buyer', buyerRouter);
app.use('/buyer/services', servicesUserRouter);
app.use('/buyer/sellers/profile/', sellerUserRouter);
app.use('/buyer/chat/', chatUserRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
