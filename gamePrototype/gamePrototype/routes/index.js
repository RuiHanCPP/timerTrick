var express = require('express');
var router = express.Router();
var User = require('../module/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ahchoo Login' });
});

router.post("/", function(req, res) {
  if (User.userList[req.body.username] === undefined) {
    User.addUser(req.body.username);
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;