var express = require('express')
var router = express.Router()
var users = require('./users')
var posts = require('./posts')

router.get('/', function(req, res) {
  console.log('start her up');
  res.redirect('/posts')
})

router.use('/users', users)
router.use('/posts', posts)
router.use('/users/:id/posts', posts)

module.exports = router
