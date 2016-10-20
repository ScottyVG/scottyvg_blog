'use strict'

const express = require('express')
const router = express.Router()
const passport = require('../mw/passport')
const quser = require('../mw/quser')
const qblog = require('../mw/qblog')
const qcomment = require('../mw/qcomment')

// Post - Create comment on blog
router.post('/:blogid', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/ ${req.params.blogid}`
  quser.findUserInfo(req.user.username)
    .then(function(userInfo) {
      qcomment.createComment(userInfo.id, req.params.blogid, req.body.comment, userInfo.fullName)
        .then(
          res.redirect(url)
        )
    })
})

// Render - Edit comment on the blog
router.get('/:blogid/:commentid/editComment', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/ ${req.params.blogid}`
  quser.findUserInfo(req.user.username)
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
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/ ${req.params.blogid}`
  qcomment.editComment(req.params.commentid, req.body.commentEdit)
    .then(function() {
      res.redirect(url)
    })
})

// Delete comment on blog
router.get('/:blogid/:commentid/deleteComment', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
    return
  }
  let url = `/`
  quser.findUserInfo(req.user.username)
    .then(function(userInfo) {
      qcomment.getCommentsByID(req.params.commentid)
        .then(function(commentById) {
          if (userInfo.id !== commentById[0].user_id) {
            res.render('error', {
              message: "Access Error: This user does not have permission to access this page.",
              link: url
            })
            return
          }
          qcomment(req.params.commentid)
            .then(function() {
              res.redirect(url)
            })
        })
    })
})

// TODO: admin delete all comments from 1 blog (stretch)

module.exports = router
