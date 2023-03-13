var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

mongoose.connect('mongodb://jeroen:password@mongodb:27017/users?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

let userSchema = mongoose.model('users', new mongoose.Schema({
  username: String,
  lastname: String,
}));

let app = express();

app.use(express.json());

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await db.collection('users').find().toArray();
  res.json(users);
});

router.post('/', async function (req, res) {
    
  let user = new userSchema(req.body);
  let result = await db.collection('users').insertOne(user);
  res.status(200).send(user);
});

module.exports = router;