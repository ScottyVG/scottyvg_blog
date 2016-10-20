'use strict'

const express = require('express')
const router = express.Router()
const passport = require('../mw/passport')
const quser = require('../mw/quser')
const qblog = require('../mw/qblog')
const qcomment = require('../mw/qcomment')

// Create comment on blog
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

// TODO: edit one comment on the blog

// TODO: delete comment on blog

// TODO: admin delete all comments from 1 blog (stretch)

module.exports = router
