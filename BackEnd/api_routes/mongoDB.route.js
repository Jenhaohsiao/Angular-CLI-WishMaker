const express = require('express');
const DBrouter = express.Router();
const mongoose = require('mongoose');
// mLab DB
const mLabDB = "mongodb://userjenhao:2loixrui@ds211625.mlab.com:11625/angular_cli_auth";
// Localhost DB
const localDB = "mongodb://localhost:27017/angular_cli_auth";

mongoose.connect(localDB, function(err) {
    if (err) {
        console.log("the server is NOT connected,err:", err);
    } else {
        console.log("Great, the server is connected!!");
    }
});

module.exports = DBrouter;