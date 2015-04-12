var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('gameList', {
    game: {id: 10},
    item: {
      title: 'Amazon Gift card',
      price: 5,
      image: ''
    }
  });
});

module.exports = router;
