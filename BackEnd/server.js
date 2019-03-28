 const express = require('express');
 const bodyParser = require('body-parser');
 const app = express();
 const PORT = process.env.PORT || 3000;

 const cors = require('cors');
 const dbRoute = require('./api_routes/mongoDB.route');
 const api = require('./api_routes/api');


 app.use(cors());

 app.use(bodyParser.json());

 app.use('/', dbRoute); //When you connect to mongoDFB
 app.use('/api', api); // When you use API

 app.get('/', function(req, res) {
     res.send('Hello from server.js');
 })

 app.listen(PORT, function() {
     console.log('Server is running on localhost:', PORT);
 })