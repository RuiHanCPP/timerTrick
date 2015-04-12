var express = require('express');
var router = express.Router();
var User = require('../module/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('game', {
    game: {id: 10},
    item: {
      title: 'Gift card',
      price: 50,
      image: ''
    }
  });
});

router.put('/user', function(req, res) {
	if (User.userList[req.body.username] === undefined) {
		res.send(false);
	}
	var isAdmin = (req.body.username === User.admin);
	res.json({user: req.body.username, chances: User.userList[req.body.username], isAdmin: isAdmin});
});

module.exports = router;
