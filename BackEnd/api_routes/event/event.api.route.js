const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
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


module.exports = {
    router: router
};