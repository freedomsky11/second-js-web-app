var PostModel = require('./models/post');
var express = require('express');
var router = express.Router();
var errorHandle = require('./common/errorHandle');

/* GET users list. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET posts list. */
router.get('/posts', function(req, res, next) {
  PostModel.find({}, {}, function (err, posts) {
    if (err) {
      errorHandle(err, next);
    } else {
      res.json({ postsList: posts });
    }
  });
});

/* POST create post */
router.post('/posts', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;

  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.save(function(err, doc) {
    if (err) {
      errorHandle(err, next);
    } else {
      res.json({post: doc});
    }
  });
});

/* GET one post. */
router.get('/posts/:id', function(req, res, next) {
  var id = req.params.id;

  PostModel.findOne({_id: id}, function(err, post) {
    if(err) {
      errorHandle(err, next);
    }

    res.json({ post });
  });
});

/* PATCH edit post. */
router.patch('/posts/:id', function(req, res, next) {
  var id = req.params.id;
  var title = req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({ _id: id }, { title, content }, function(err) {
    if(err) {
      errorHandle(err, next);
    } else {
      res.json({});
    }
  });
});

module.exports = router;
