var PostModel = require('./models/post');
var express = require('express');
var marked = require('marked');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "码字空间" });
});

/* GET posts page. */
router.get('/posts', function(req, res, next) {
  res.render('posts', { title: 'posts' });
});

/* GET posts edit page. */
router.get('/posts/create', function(req, res, next) {
  res.render('create');
});

router.get('/posts/show', function (req, res, next) {
  var id = req.query.id;

  PostModel.findOne({_id: id}, function (err, post) {
    post.mkContent = marked(post.content);
    res.render('show', {post});
  })
})

module.exports = router;
