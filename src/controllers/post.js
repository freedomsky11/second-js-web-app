import PostModel from '../models/post';

export const more = (req, res, next) => {
  PostModel.find({}, {}, function (err, posts) {
    if (err) {
      next(err);
    } else {
      res.json({ postsList: posts });
    }
  });
}

export const create = (req, res, next) => {
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
}

export const one = (req, res, next) => {
  const id = req.params.id;

  PostModel.findOne({_id: id}, function(err, post) {
    if(err) {
      next(err);
    }

    res.json({ post });
  });
}

export const edit = (req, res, next) => {
  const { id, title, content } = req.params;

  PostModel.findOneAndUpdate({ _id: id }, { title, content }, function(err) {
    if(err) {
      next(err);
    } else {
      res.json({});
    }
  });
}