 const express = require('express');
 const bodyParser = require('body-parser');
 const app = express();
 const PORT = process.env.PORT || 3000;

 const cors = require('cors');
 const dbRoute = require('./api_routes/mongoDB.route');
 const api = require('./api_routes/api');


 // cors (Cross-origin resource sharing)
 app.use(cors());

 app.use(bodyParser.json());

 app.get('/', function(req, res) {
     res.send('Hello from server.js');
 })

 app.listen(PORT, function() {
     console.log('Server is running on localhost:', PORT);
 })


 app.use('/', dbRoute); //When you connect to mongoDFB
 app.use('/api', api.router); // When you use Root API
 app.use('/api/authorize', api.authorize); // When you use authorize API
 app.use('/api/event', api.event); // When you use authorize API
 app.use('/api/user', api.user); // When you use authorize API