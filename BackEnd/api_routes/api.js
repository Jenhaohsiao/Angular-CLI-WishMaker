const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
// mLab DB
const mLabDB = "mongodb://userjenhao:2loixrui@ds211625.mlab.com:11625/angular_cli_auth";
// Localhost DB
const localDB = "mongodb://localhost:27017/angular_cli_auth";
const tokenSecretKey = 'harrypotter';

mongoose.connect(localDB, function(err) {
    if (err) {
        console.log("the server is NOT connected,err:", err);
    } else {
        console.log("Great, the server is connected!!");
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    let token = req.headers.authorization.split(' ')[1];

    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    let payload = jwt.verify(token, tokenSecretKey);
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }

    req.userId = payload.subject;

    next();

}


router.get('/', function(req, res) {
    res.send('From API route');
});

router.post('/register', function(req, res) {
    var user = new User();
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function(error, registerdUser) {

        if (error) {
            console.log(error)
        } else {

            let payload = {
                subject: registerdUser._id
            };
            let token = jwt.sign(payload, tokenSecretKey);
            res.status(200).send({
                token
            });

        }
    });
})

router.post('/login', function(req, res) {
    var userData = req.body;

    User.findOne({
        userName: userData.userName,
    }, function(error, user) {
        if (error) {
            res.status(401)
            res.json({
                success: false,
                message: 'Error has occurred',
                error: error,
            });
            return res;

        } else {

            if (!user) {
                res.status(401)
                res.json({
                    success: false,
                    message: 'Invalid user name',
                    error: error,
                });

            } else {

                if (userData.password) {
                    var validPassword = user.comparePassword(userData.password); // get true or false

                    if (validPassword) {
                        let payload = {
                            username: user.username,
                            email: user.email,
                            userType: user.userType,
                        };
                        let token = jwt.sign(payload, tokenSecretKey);


                        res.status(200)
                        res.json({
                            success: false,
                            message: 'Logged in successfully',
                            token: token
                        });

                    } else {
                        res.status(401)
                        res.json({
                            success: false,
                            message: 'Invail Password',
                            error: error,
                        });
                    }

                } else {
                    res.status(401)
                    res.json({
                        success: false,
                        message: 'It needs password',
                        error: error,
                    });

                }
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
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "7",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "8",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "9",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        }

    ]

    res.json(events)
})


router.get('/special', verifyToken, function(req, res) {

    let events = [

        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "7",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "8",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        },

        {
            "_id": "9",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2016-08-25T16:33:05.678Z"
        }

    ]

    res.json(events)
})


module.exports = router;