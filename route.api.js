var express = require('express');
var router = express.Router();

/* GET users list. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET posts list. */
router.get('/posts', function(req, res, next) {
  res.json({postsList: ['文章1', '文章2', '文章3']});
});

/* POST posts */
router.post('/posts', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  res.send({title, content}); // 收到数据后，又把数据返回给了请求方
})

module.exports = router;
