import express from 'express';
import * as auth from './middlewares/auth';
import * as post from './controllers/post';
import * as user from './controllers/user';

const router = express.Router();

/* GET users list. */
router.get('/users', user.more);

/* GET posts list. */
router.get('/posts', post.more);

/* POST create post */
router.post('/posts', auth.adminRequired, post.create);

/* GET one post. */
router.get('/posts/:id', );

/* PATCH edit post. */
router.patch('/posts/:id', auth.adminRequired, post.edit);

/* POST signup user */
router.post('/signup', user.signup);

/* POST signin user */
router.post('/signin', user.signin);

export default router;
