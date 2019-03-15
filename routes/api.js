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

router.post('/login', function(req, res) {
    var userData = req.body;

    User.findOne({
        email: userData.email
    }, function(error, user) {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send("Invalid email");
            } else if (user.password !== userData.password) {
                res.status(401).send('Invail Password');
            } else {
                res.status(200).send(user);
            }
        }
    })
})

router.get('/events', function(req, res) {

    let events = [

        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "7",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "8",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "9",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        }

    ]

    res.json(events)
})


router.get('/special', function(req, res) {

    let events = [

        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "7",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "8",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "9",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "data": "2016-08-25T16:33:05.678Z"
        }

    ]

    res.json(events)
})


module.exports = router;