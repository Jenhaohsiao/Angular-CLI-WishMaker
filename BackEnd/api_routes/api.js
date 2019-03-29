const express = require('express');
const router = express.Router();
const apiHelper = require('./api.route.helper');
const authorizeApi = require('./authorize/authorize.api.route');
const eventApi = require('./event/event.api.route');


router.get('/', function(req, res) {
    res.send('Root From API route');
});


module.exports = {
    router: router,
    authorize: authorizeApi.router,
    event: eventApi.router,
}