var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
// const url = 'mongodb://jeroen:password@127.0.0.1:12346/?authSource=admin';

mongoose.connect('mongodb://mongodb:12346/users');

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

app.post('/users', async function (req, res) {
    
  let user = new userSchema(req.body);
  let result = await db.collection('users').insertOne(user);
  user.save().then((user) => {
      result.send(200, user);
  })
});

module.exports = router;
