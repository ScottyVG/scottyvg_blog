'use strict'

const express = require('express')
const router = express.Router()
const user = require('./user')
const blog = require('./blog')
const comment = require('./comment')
const qblog = require('../mw/qblog')

router.get('/', function(req, res, next) {
  // console.log('start her up');
  qblog.getAllBlogs()
    .then(function(blogData) {
      res.render('index', {
        blog: blogData
      })
    })
})

router.use('/user', user)
router.use('/blog', blog)
router.use('/comment', comment)
router.use('/user/:id/blog', blog)
router.use('/blog/:id/comment', blog)
router.use('/user/:id/comment', blog)

module.exports = router
