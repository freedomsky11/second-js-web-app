var express = require('express');
var router = express.Router();

/* GET posts page. */
router.get('/', function(req, res, next) {
  res.render('posts', { title: '码字空间', postsList: ['文章1', '文章2', '文章3'] });
});

/* GET 获取postList数据  */
router.get('/list', function(req, res, next) {
  res.json({postsList: ['文章1', '文章2', '文章3'] })
});

module.exports = router;
