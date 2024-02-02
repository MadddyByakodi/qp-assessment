const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const verifyToken = require('./middleware/authMiddleware');

const app = express();
require('dotenv').config({path: './.env'});

const publicDirectory = path.join(__dirname, '/public');
app.use(express.static(publicDirectory));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'hbs');

app.use("/", require('./routes/pages'));
app.use("/auth", require('./routes/auth'));
app.use("/admin",verifyToken, require('./routes/admin'));
app.use("/products", require('./routes/product'));
app.use("/cart", require('./routes/cart'));
app.use("/user", require('./routes/users'));


app.listen(3000, () => {
    console.log("server started");
});