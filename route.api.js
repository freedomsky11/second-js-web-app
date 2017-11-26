var PostModel = require('./models/post');
var express = require('express');
var router = express.Router();

/* GET users list. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET posts list. */
router.get('/posts', function(req, res, next) {
  PostModel.find({}, {}, function (err, posts) {
    if (err) {
      res.json({ success: false });
      return;
    } else {
      res.json({ success: true, postsList: posts });
    }
  });
});

/* POST create post */
router.post('/posts/create', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;

  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.save(function(err) {
    if (err) {
      res.json({success: false});
    } else {
      res.json({success: true});
    }
  });
});

module.exports = router;
