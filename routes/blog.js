'use strict'

const express = require('express')
const router = express.Router()
const passport = require('../mw/passport')
const api = require('../mw/api')


// Render - Post Article
router.get('/', function(req, res, next) {
  console.log('router.get / - blog route');
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  res.render('post', {
    user: req.user
  })
})

// Post - Post Article
router.post('/', function(req, res, next) {
  console.log('router.post / - blog route');
  if (!req.isAuthenticated()) {
    res.redirect('login')
    return
  }
  api.findUserInfo(req.user.username)
    .then(function(userInfo) {
      api.createPost(req.body.title, req.body.content, req.body.image, userInfo.id, userInfo.fullName)
        .then(function() {
          res.redirect('/')
        })
    })
})

// Get - One Blog
router.get('/:blogid', function(req, res, next) {
  console.log('router.get /:blogid - blog route');
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let authorized = false
  api.getBlogByID(req.params.blogid)
    .then(function(blogInfo) {
      api.getComments(req.params.blogid)
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
  console.log('router.get /:blogid/editPost - blog route');
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/ ${req.params.blogid}`
  api.findUserInformation(req.user.username)
    .then(function(userInfo) {
      api.getBlogById(req.params.blogid)
        .then(function(blogInfo) {
          if (userInfo.id !== blogInfo[0].user_id) {
            res.render('error', {
              message: "Access Error: This user does not have permission to access this page.",
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
router.post('/:blogid/editPost', function(req, res, next) {
  console.log('router.post /:blogid/editPost - blog route');
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/ ${req.params.blogid}`
  api.editBlogPost(req.params.blogid, req.ody.title, req.body.content, req.body.image)
    .then(function() {
      res.redirect(url)
    })
})

// Delete Blog Post
router.get('/:blogid/deletePost', function(req, res, next) {
  console.log('router.get /:blogid/deletePost - blog route');
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = '/' + req.params.blogid
  api.findUserInformation(req.user.username)
    .then(function(userInfo) {
      if (userInfo.id !== blogInfo[0].user_id) {
        res.render('error', {
          message: "Access Error: This user does not have permission to access this page.",
          link: url
        })
        return
      }
      api.deleteComments(req.params.blogid).then(function() {
        api.deleteBlogPost(req.params.blogid)
          .then(function() {
            res.redirect('/')
          })
      })
    })
})

// TODO: admin delete all blogs (stretch)

module.exports = router
