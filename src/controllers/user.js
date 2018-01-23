import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import moment from 'moment';
import config from '../config';
import UserModel from '../models/user';

export const more = (req, res, next) => {
  res.send('respond with a resource');
}

export const signup = (req, res, next) => {
  const { name, email, pass, rePass } = req.body;

  if (pass !== rePass) {
    return next(new Error('两次密码不对'));
  }

  let user = new UserModel();
  user.name = name;
  user.email = email;
  user.pass = bcrypt.hashSync(pass, 10);
  user.save(function(err) {
    if (err) {
      next(err);
    } else {
      res.end();
    }
  });
}

export const signin = (req, res, next) => {
  const { name, pass } = req.body;

  UserModel.findOne({ name }, function(err, user) {
    if (err || !user) {
      return next(new Error('找不到用户'));
    } else {
      const isOk = bcrypt.compareSync(pass, user.pass);
      if (!isOk) {
        return next(new Error('密码不对'));
      }

      const token = jwt.encode(
        {
          _id: user._id,
          name: user.name,
          isAdmin: user.name === config.admin ? true : false,
          exp: moment().add('days', 30).valueOf(),
        },
        config.jwtSecret
      );
      const opts = {
        path: '/',
        maxAge: moment().add('days', 30).valueOf(), // cookie 有效期30天
        signed: true,
        httpOnly: true
      };

      // 将 token 保存在 cookie 里。
      res.cookie(config.cookieName, token, opts);
      res.json({ token });
    }
  });
}
