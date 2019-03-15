const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../server/models/user');
// mLab DB
const mLabDB = "mongodb://userjenhao:2loixrui@ds211625.mlab.com:11625/angular_cli_auth";
// Localhost DB
const localDB = "mongodb://localhost:27017/angular_cli_auth"

mongoose.connect(localDB, function(err) {
    if (err) {
        console.log("the server is NOT connected,err:", err);
    } else {
        console.log("Great, the server is connected!!");
    }
});


router.get('/', function(req, res) {
    res.send('From API route');
});

router.post('/register', function(req, res) {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function(error, registerdUser) {

        if (error) {
            console.log(error)
        } else {
            res.status(200).send(registerdUser);
        }
    });

})

module.exports = router;