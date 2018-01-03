import PostModel from './models/post';
import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from './models/user';
import config from './config';
import * as auth from './middlewares/auth';

const router = express.Router();

/* GET users list. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET posts list. */
router.get('/posts', function(req, res, next) {
  PostModel.find({}, {}, function (err, posts) {
    if (err) {
      next(err);
    } else {
      res.json({ postsList: posts });
    }
  });
});

/* POST create post */
router.post('/posts', auth.adminRequired, function(req, res, next) {
  const { title, content} = req.body;

  let post = new PostModel();
  post.title = title;
  post.content = content;
  post.authorId = res.locals.currentUser._id;
  post.save(function(err, doc) {
    if (err) {
      next(err);
    } else {
      res.json({post: doc});
    }
  });
});

/* GET one post. */
router.get('/posts/:id', function(req, res, next) {
  const id = req.params.id;

  PostModel.findOne({_id: id}, function(err, post) {
    if(err) {
      next(err);
    }

    res.json({ post });
  });
});

/* PATCH edit post. */
router.patch('/posts/:id', auth.adminRequired, function(req, res, next) {
  const { id, title, content } = req.params;

  PostModel.findOneAndUpdate({ _id: id }, { title, content }, function(err) {
    if(err) {
      next(err);
    } else {
      res.json({});
    }
  });
});

/* POST signup user */
router.post('/signup', function(req, res, next) {
  const { name, pass, rePass } = req.body;

  if (pass !== rePass) {
    return next(new Error('两次密码不对'));
  }

  let user = new UserModel();
  user.name = name;
  user.pass = bcrypt.hashSync(pass, 10);
  user.save(function(err) {
    if (err) {
      next(err);
    } else {
      res.end();
    }
  });
});

/* POST signin user */
router.post('/signin', function(req, res, next) {
  const { name, pass } = req.body;

  UserModel.findOne({ name }, function(err, user) {
    if (err || !user) {
      return next(new Error('找不到用户'));
    } else {
      const isOk = bcrypt.compareSync(pass, user.pass);
      if (!isOk) {
        return next(new Error('密码不对'));
      }

      const authToken = user._id;
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, // cookie 有效期30天
        signed: true,
        httpOnly: true
      };

      res.cookie(config.cookieName, authToken, opts);
      res.end();
    }
  });
});

export default router;
