'use strict'

const express = require('express')
const router = express.Router()
const passport = require('../mw/passport')
const quser = require('../mw/quser')
const qblog = require('../mw/qblog')

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

// TODO: post article
// TODO: get one blog
// TODO: edit blog
// TODO: delete blog
// TODO: admin delete all blogs (stretch)


module.exports = router
