'use strict'

const express = require('express')
const router = express.Router()
const passport = require('../mw/passport')
const quser = require('../mw/quser')
const qblog = require('../mw/qblog')
const qcomment = require('../mw/qcomment')

// Render - Post Article
router.get('/post', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  res.render('post', {
    user: req.user
  })
})

// Post - Post Article
router.post('/post', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('login')
    return
  }
  quser.findUserInfo(req.user.username)
    .then(function(userInfo) {
      quser.createPost(req.body.title, req.body.content, req.body.image, userInfo.id, userInfo.fullName)
        .then(function() {
          res.redirect('/')
        })
    })
})

// Get - One Blog
router.get('/:blogid', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let authorized = false
  qblog.getBlogByID(req.params.blogid)
    .then(function(blogInfo) {
      qcomment.getComments(req.params.blogid)
        .then(function(comments) {
          res.render('blog', {
            blog_id: req.params.blogid,
            blogInfo: blogInfo,
            comments: comments
          })
        })
    })
})

// Render - Edit Blog
router.get('/:blogid/editPost', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/ ${req.params.blogid}`
  quser.findUserInformation(req.user.username)
    .then(function(userInfo) {
      qblog.getBlogById(req.params.blogid)
        .then(function(blogInfo) {
          if (userInfo.id !== blogInfo[0].user_id) {
            res.render('error', {
              message: "You do not have access to this page.",
              link: url
            })
            return
          }
          res.render('edit', {
            blogInfo: blogInfo
          })
        })
    })
})

// Post - Edit Blog
router.post('/:blogid/editiPost', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/ ${req.params.blogid}`
  qblog.editBlogPost(req.params.blogid, req.ody.title, req.body.content, req.body.image)
    .then(function() {
      res.redirect(url)
    })
})


// TODO: delete blog
// TODO: admin delete all blogs (stretch)


module.exports = router
