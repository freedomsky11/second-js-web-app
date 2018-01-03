import PostModel from './models/post';
import express from 'express';
import marked from 'marked';
import config from './config';
import * as auth from './middlewares/auth';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET posts page. */
router.get('/posts', function(req, res, next) {
  res.render('posts', { title: '我的文章' });
});

/* GET posts create page. */
router.get('/posts/create', auth.adminRequired, function(req, res, next) {
  res.render('create');
});

/* GET posts show page. */
router.get('/posts/show', function (req, res, next) {
  const id = req.query.id;

  PostModel.findOne({_id: id}, function (err, post) {

    console.log(post);
    post.mkContent = marked(post.content);
    console.log(post.authorId);
    res.render('show', {post});
  })
})

/* GET posts edit page. */
router.get('/posts/edit', auth.adminRequired, function (req, res, next) {
  const id = req.query.id;

  res.render('edit', {id});
})

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/* GET signin page. */
router.get('/signin', function(req, res, next) {
  res.render('signin');
});

/* GET signout */
router.get('/signout', function(req, res, next) {
  req.session.user = null;
  res.clearCookie(config.cookieName, { path: '/' });
  res.redirect('/');
});

export default router;
