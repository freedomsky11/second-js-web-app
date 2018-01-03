import config from '../config';
import UserModel from '../models/user';
import jwt from 'jwt-simple';
import { decode } from 'punycode';

export const authUser = (req, res, next) => {
  res.locals.currentUser = null;

  const token = req.headers['x-access-token'] || req.signedCookies[config.cookieName] || '';

  if (token) {
    try {
      const decoded = jwt.decode(token, config.jwtSecret);
      if (decode.exp <= Date.now()) {
        res.end('Access token has expired', 400);
        return;
      }

      req.user = res.locals.currentUser = decoded;
      return next();
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};

export const userRequired = (req, res, next) => {
  if (!req.user) {
    let err = new Error('需要登录');
    err.status = 403;
    next(err);
    return;
  }

  next();
};

export const adminRequired = (req, res, next) => {
  if (!req.user) {
    let err = new Error('需要登录');
    err.status = 403;
    next(err);
    return;
  }

  if (!req.user.isAdmin) {
    let err = new Error('需要管理员权限');
    err.status = 403;
    next(err);
    return;
  }

  next();
};
