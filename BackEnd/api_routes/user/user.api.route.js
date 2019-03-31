const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/user.model');
const tokenSecretKey = 'harrypotter';
const authorizeApi = require('../authorize/authorize.api.route')

router.post('/register', function(req, res) {
    var user = new User();
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.userType = req.body.userType;

    user.save(function(error, registeredUser) {

        if (error) {
            console.log(error)
        } else {

            let payload = authorizeApi.setJWTPayload(user);

            let token = jwt.sign(payload, tokenSecretKey);
            res.status(200).send({
                token
            });

        }
    });
})




module.exports = {
    router: router
};