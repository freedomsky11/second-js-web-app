var express = require('express');
var router = express.Router();

/* Get posts page. */
router.get('/', function(req, res, next) {
  res.render('posts', { title: '码字空间', postsList: ['文章1', '文章2', '文章3'] });
});

module.exports = router;
