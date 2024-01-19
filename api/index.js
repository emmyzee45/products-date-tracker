var express = require("express");
var app = express();
var cors = require("cors")
const path   = require("path");
const dotenv = require("dotenv");
// const multer = require("multer");
const mongoose = require("mongoose");
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const scheduleExpirationCheck = require("./utils/update");

dotenv.config();

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/images", express.static(path.join(__dirname, "/images")))

// process.env.MONGO_URL
mongoose.connect(process.env.MONGO_URL)
.then(console.log("connected to Mongodb"))
.catch((err) => console.log(err));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
      next();
    });
    app.use(
      cors({
        origin: "http://localhost:3000",
      })
      );

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

// setInterval(() => {
//   scheduleExpirationCheck()
// }, 1 * 60 * 1000); // 1 minutes in milliseconds

app.listen("5000", () => {
    console.log("Backend is running.");
  });