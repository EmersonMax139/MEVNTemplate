var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// ------- Mongoose Model -----------
var User = require("../models/user");

// Add new user
router.post('/', (req, res) => {
  var dbOthr = req.dbOther;
  var username = req.body.username;
  var password = req.body.password;

  var new_user = new User({
    username,
    password,
  })

  new_user.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'User saved successfully!'
    })
  })
})

// // Fetch Bounties (and sort)
router.get('/', (req, res) => {
  User.find({}, 'username password', function (error, users) {
    if (error) { console.error(error); }
    res.send({
      users: users
    })
  }).sort({_id:-1})
})


module.exports = router;
