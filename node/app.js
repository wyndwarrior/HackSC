var express = require('express');

var app = express();
app.use(require('body-parser').text());

var db = {};

app.post('/position_updates', function(req, res) {
  db.lastPosition = JSON.parse(req.data.data);
  res.send('OK');
});

app.get('/', function(req, res) {
  res.json(db.lastPosition);
});

app.listen(3000);
console.log('Listening on port 3000');
