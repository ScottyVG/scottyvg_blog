'use strict'

const express = require('express')
const router = express.Router()
const users = require('./users')
const posts = require('./posts')

router.get('/', (req, res) => {
  // console.log('start her up');
  res.redirect('/posts')
})

router.use('/users', users)
router.use('/posts', posts)
router.use('/users/:id/posts', posts)

module.exports = router
