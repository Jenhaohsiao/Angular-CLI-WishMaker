 const express = require('express');
 const bodyParser = require('body-parser');
 const app = express();
 const PORT = process.env.PORT || 3000;
 //  const PORT = 3000;

 const cors = require('cors');
 const api = require('../routes/api');

 app.use(cors());

 app.use(bodyParser.json());

 app.use('/api', api);

 app.get('/', function(req, res) {
     res.send('Hello from server');
 })

 app.listen(PORT, function() {
     console.log('Server is running on localhost:', PORT);
 })