const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if(err){console.log("error", err);}
    else {console.log("connection succesfull");}
});

module.exports = db;