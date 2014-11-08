var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').text());

var db = {};

app.post('/position_updates', function(req, res) {
  try {
    db.lastPosition = JSON.parse(req.data.data);
    res.send('OK');
  } catch (e) {
    res.send('ERR');
  }
});

app.get('/positions', function(req, res) {
  res.json(db.lastPosition);
});

app.listen(3000);
console.log('Listening on port 3000');
