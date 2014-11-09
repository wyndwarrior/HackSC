var mongoose = require('mongoose');
var express = require('express');
var preston = require('preston');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017');

var Patient = mongoose.model('Patient', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}));

var Prescription = mongoose.model('Prescription', new Schema({
  name: String,
    prescribed: {
      type: Schema.Types.ObjectId,
    ref: 'Patient'
    },
  food: [{
    type: Schema.Types.ObjectId,
    ref: 'Food'
  }],
  data: Schema.Types.Mixed,
  repetitions: Number
}));

var Food = mongoose.model('Food', new Schema({
  name: String,
  calories: Number
}));

preston(Patient).submodel('prescriptions', 'prescribed', Prescription);
preston(Food);

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use('/api', preston.middleware());

var db = {};

app.post('/position_updates', function(req, res) {
  try {
    db.lastPosition = JSON.parse(req.body.data);
    res.send('OK');
  } catch (e) {
    res.send('ERR: ' + e.toString());
  }
});

app.all('/positions', function(req, res) {
  res.json(db.lastPosition);
});

app.listen(3000);
console.log('Listening on port 3000');
