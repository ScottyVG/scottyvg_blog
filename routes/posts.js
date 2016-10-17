'use strict'

var express = require('express')
var router = express.Router()
var db = require('../db/api')

router.get('/', function(req, res) {
  db.getAllPosts().then(posts => {
    res.render('posts/all', {
      title: 'Animal Blog: All Posts',
      posts: posts
    })
  })
})

router.get('/new', function(req, res) {
  db.getAllUsers().then(users => {
    res.render('posts/new', {
      title: 'Animal Blog: Write a Post',
      users: users
    })
  })
})

router.get('/:id', function(req, res) {
  db.getOnePost(req.params.id).then(post => {
    db.getAllUsers().then(users => {
      res.render('posts/one', {
        title: 'Animal Blog: ' + post.title,
        post: post,
        users: users
      })
    })
  })
})

router.post('/', function(req, res) {
  db.createOnePost().then(post => {
    console.log('post', post)
    res.redirect('/')
  })
})

router.get('/:id/edit', function(req, res) {
  db.getOnePost(req.params.id).then(post => {
    res.render('posts/edit', {
      title: 'Animal Blog: ' + post.title,
      post: post
    })
  })
})

router.put('/:id', function(req, res) {
  db.updateOnePost(req.params.id).then(() => {
    res.redirect('/')
  })
})

router.delete('/:id', function(req, res) {
  db.deleteOnePost(req.params.id).then(() => {
    res.redirect('/')
  })
})

module.exports = router
