const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: '784111210562-4r267lej393cop44tp55omic0a8tvjbr.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          // Người dùng chưa tồn tại trong cơ sở dữ liệu, tạo mới
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          });

          newUser.save((err) => {
            if (err) {
              return done(err);
            }
            done(null, newUser);
          });
        } else {
          // Người dùng đã tồn tại trong cơ sở dữ liệu
          done(null, user);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user); // Serialize người dùng bằng cách truyền thông tin người dùng cho hàm done
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Xử lý callback sau khi đăng nhập thành công
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const { infoCompleted } = req.user;
    console.log(req.user);
    
    const previousPageUrl = req.query.previous;
    console.log(req.query.previous);
 
    if (infoCompleted) {
      const previousPageUrl = req.query.previous || "/";
    } else {
      
      res.redirect('http://localhost:3000/' + req.user.id);
    }
  },
  (err, req, res, next) => {
    console.error('Đăng nhập thất bại:', err);
    res.status(500).send('Đăng nhập thất bại!');
  }
);

// Route lưu trữ thông tin khách hàng


module.exports = router;
