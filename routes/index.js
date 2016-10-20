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
router.use('/users/:id/blog', posts)
router.use('/comment', comment)

module.exports = router
