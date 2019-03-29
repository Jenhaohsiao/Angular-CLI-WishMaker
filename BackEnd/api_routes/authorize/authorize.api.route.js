const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/user.model');
const tokenSecretKey = 'harrypotter';

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
    try {
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
                                username: user.userName,
                                email: user.email,
                                userType: user.userType,
                            };
                            let token = jwt.sign(payload, tokenSecretKey, {
                                expiresIn: '600s'
                            });


                            res.status(200)
                            res.json({
                                success: false,
                                message: 'Authenticated and Logged in successfully',
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

    } catch (err) {
        console.log("An error occurred with Login");
        console.error(err);
        cb(err);
        return;
    }
})





module.exports = {
    router: router
};