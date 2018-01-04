import marked from 'marked';
import PostModel from '../models/post';
import config from '../config';

export const homePage = (req, res, next) => {
  res.render('index');
}

export const postsPage = (req, res, next) => {
  res.render('posts', { title: '我的文章' });
}

export const createPage = (req, res, next) => {
  res.render('create');
}

export const showPage = (req, res, next) => {
  const id = req.query.id;

  PostModel.findOne({_id: id}, function (err, post) {

    console.log(post);
    post.mkContent = marked(post.content);
    console.log(post.authorId);
    res.render('show', {post});
  })
}

export const editPage = (req, res, next) => {
  const id = req.query.id;
  res.render('edit', {id});
}

export const signupPage = (req, res, next) => {
  res.render('signup');
}

export const signinPage = (req, res, next) => {
  res.render('signin');
}

export const signout = (req, res, next) => {
  res.clearCookie(config.cookieName, { path: '/' });
  res.redirect('/');
}