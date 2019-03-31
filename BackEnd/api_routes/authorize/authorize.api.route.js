const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/user.model');
const tokenSecretKey = 'harrypotter';

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
    router: router,
    verifyToken: verifyToken

};