var express = require('express');
var router = express.Router();

/* Get posts page. */
router.get('/', function(req, res, next) {
  res.render('posts', { title: '码字空间' });
});

module.exports = router;
