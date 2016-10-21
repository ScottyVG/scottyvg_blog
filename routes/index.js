var express = require('express');
var router = express.Router();
var passport = require('../mw/passport.js');
var quser = require('../mw/quser.js');
var qblog = require('../mw/qblog.js');
var qcomment = require('../mw/qcomment.js');

// Get All Blogs
router.get('/', function(req, res, next) {
  qblog.getAllBlogs()
    .then(function(blogData) {
      res.render('index', {
        blogs: blogData
      });
    });
});

// Render - Register Page
router.get('/register', function(req, res, next) {
  res.render('register');
});

// Post - Register Info
router.post('/register', function(req, res, next) {
  quser.addUser(req.body.username, req.body.password, req.body.fullName)
    .then(function() {
      res.redirect('/login');
    })
    .catch(function(err) {
      res.render('error', {
        message: "This username is already in use.",
        link: '/register'
      });
      return;
    });
});

// Render - Login Page
router.get('/login', function(req, res, next) {
  res.render('login');
});

// Post - Login Information
router.post('/login', passport.authenticate('local', {
  successRedirect: '/post',
  failureRedirect: '/login'
}));

// Logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

// Render - Post Article Page
router.get('/post', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  res.render('post', {
    users: req.users
  });
});

// Post - Post Article
router.post('/post', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  quser.findUserInfo(req.users.username)
    .then(function(userInfo) {
      qblog.createPost(req.body.title, req.body.content, req.body.image, userInfo.id, userInfo.fullName)
        .then(function() {
          res.redirect('/');
        });
    });
});

// Get Single Blog
router.get('/:blogid', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  var authorized = false;
  qblog.getBlogByID(req.params.blogid)
    .then(function(blogInfo) {
      qcomment.getComments(req.params.blogid)
        .then(function(comments) {
          res.render('blog', {
            blogs_id: req.params.blogid,
            blogInfo: blogInfo,
            comments: comments
          });
        });
    });
});

// Post Comment on Blog
router.post('/:blogid', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  var url = '/' + req.params.blogid;
  qblog.findUserInfo(req.users.username)
    .then(function(userInfo) {
      qcomment.createComment(userInfo.id, req.params.blogid, req.body.comment, userInfo.fullName)
        .then(
          res.redirect(url)
        );
    });
});

// Render - Edit Page for blog
router.get('/:blogid/editPost', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  var url = '/' + req.params.blogid;
  quser.findUserInfo(req.users.username)
    .then(function(userInfo) {
      qblog.getBlogByID(req.params.blogid)
        .then(function(blogInfo) {
          if (userInfo.id !== blogInfo[0].users_id) {
            res.render('error', {
              message: "This is not your blog post. You do not have access to edit.",
              link: url
            });
            return;
          }
          res.render('edit', {
            blogInfo: blogInfo
          });
        });
    });
});

// Edit blog post
router.post('/:blogid/editPost', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  var url = '/' + req.params.blogid;
  qblog.editBlogPost(req.params.blogid, req.body.title, req.body.content, req.body.image)
    .then(function() {
      res.redirect(url);
    });
});

// Delete blog post
router.get('/:blogid/deletePost', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  var url = '/' + req.params.blogid;
  quser.findUserInfo(req.users.username)
    .then(function(userInfo) {
      qblog.getBlogByID(req.params.blogid)
        .then(function(blogInfo) {
          if (userInfo.id !== blogInfo[0].users_id) {
            res.render('error', {
              message: "This is not your blog post. You do not have access to edit.",
              link: url
            });
            return;
          }
          qcomment.deleteComments(req.params.blogid)
            .then(function() {
              qblog.deleteBlogPost(req.params.blogid)
                .then(function() {
                  res.redirect('/');
                });
            });
        });
    });
});

// Render - Edit Page for One Comment on One Blog
router.get('/:blogid/:commentid/editComment', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  var url = '/' + req.params.blogid;
  quser.findUserInfo(req.users.username)
    .then(function(userInfo) {
      qblog.getBlogByID(req.params.blogid)
        .then(function(blogInfo) {
          qblog.getCommentsByID(req.params.commentid)
            .then(function(commentById) {
              if (userInfo.id !== commentById[0].users_id) {
                res.render('error', {
                  message: "This is not your comment. You do not have access to edit.",
                  link: url
                });
                return;
              }
              res.render('comment', {
                blogInfo: blogInfo,
                commentById: commentById
              });
            });
        });
    });
});

// Post - Edit Comment
router.post('/:blogid/:commentid/editComment', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  var url = '/' + req.params.blogid;
  qcomment.editComment(req.params.commentid, req.body.commentEdit)
    .then(function() {
      res.redirect(url);
    });
});


// Delete Comment
router.get('/:blogid/:commentid/deleteComment', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  var url = '/' + req.params.blogid;
  quser.findUserInfo(req.users.username)
    .then(function(userInfo) {
      qcomment.getCommentsByID(req.params.commentid)
        .then(function(commentById) {
          if (userInfo.id !== commentById[0].users_id) {
            res.render('error', {
              message: "This is not your comment. You do not have access to delete.",
              link: url
            });
            return;
          }
          qcomment.deleteComment(req.params.commentid)
            .then(function() {
              res.redirect(url);
            });
        });
    });
});


module.exports = router;


// 'use strict'
//
// const express = require('express')
// const router = express.Router()
// const user = require('./user')
// const blog = require('./blog')
// const comment = require('./comment')
// const qblog = require('../mw/qblog')
//
// router.get('/', function(req, res, next) {
//   console.log('router.get /');
//   qblog.getAllBlogs()
//     .then(function(blogData) {
//       res.render('index', {
//         blog: blogData
//       })
//     })
// })
//
// router.use('/user', user)
// router.use('/blog', blog)
// router.use('/comment', comment)
// router.use('/user/:id/blog', blog)
// router.use('/blog/:id/comment', blog)
// router.use('/user/:id/comment', blog)
// router.use('/comment/:id/', comment)
// router.use('/comment', comment)
//
// module.exports = router
