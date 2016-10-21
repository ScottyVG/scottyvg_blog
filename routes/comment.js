'use strict'

const express = require('express')
const router = express.Router()
const passport = require('../mw/passport')
const api = require('../mw/api')

// Post - Create comment on blog
router.post('/:blogid', function(req, res, next) {
  console.log('router.post /:blogid - comment route');
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/ ${req.params.blogid}`
  api.findUserInfo(req.user.username)
    .then(function(userInfo) {
      api.createComment(userInfo.id, req.params.blogid, req.body.comment, userInfo.fullName)
        .then(
          res.redirect(url)
        )
    })
})

// Render - Edit comment on the blog
router.get('/:blogid/:commentid/editComment', function(req, res, next) {
  console.log('router.get /:blogid/:commentid/editComment - comment route');
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/ ${req.params.blogid}`
  api.findUserInfo(req.user.username)
    .then(function(userInfo) {
      qblgo.getBlogByID(req.params.blogid)
        .then(function(blogInfo) {
          if (userInfo.id !== commentByID[0].user_id) {
            res.render('error', {
              message: "Access Error: This user does not have permission to access this page.",
              link: url
            })
            return
          }
          res.render('comment', {
            blogInfo: blogInfo,
            commentById: commentById
          })
        })
    })
})

// Post - Edit comment on the blog
router.post('/:blogid/:commentid/editComment', function(req, res, next) {
  console.log('router.post /:blogid/:commentid/editComment - comment route');
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/ ${req.params.blogid}`
  api.editComment(req.params.commentid, req.body.commentEdit)
    .then(function() {
      res.redirect(url)
    })
})

// Delete comment on blog
router.get('/:blogid/:commentid/deleteComment', function(req, res, next) {
  console.log('router.get /:blogid/:commentid/deleteComment - comment route');
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/`
  api.findUserInfo(req.user.username)
    .then(function(userInfo) {
      api.getCommentsByID(req.params.commentid)
        .then(function(commentById) {
          if (userInfo.id !== commentById[0].user_id) {
            res.render('error', {
              message: "Access Error: This user does not have permission to access this page.",
              link: url
            })
            return
          }
          api(req.params.commentid)
            .then(function() {
              res.redirect(url)
            })
        })
    })
})

// TODO: admin delete all comments from 1 blog (stretch)

module.exports = router
