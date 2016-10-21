'use strict'

var express = require('express')
var router = express.Router()
var db = require('../db/api')

router.get('/', function(req, res) {
  db.getAllUsers().then(users => {
    res.render('users/all', {
      title: 'Scotty VG - Blog: All Authors',
      users: users
    })
  })
})

router.get('/new', function(req, res) {
  res.render('users/new', {
    title: 'Add a User'
  })
})

router.get('/:id', function(req, res) {
  db.getOneUser(req.params.id).then(user => {
    res.render('users/one', {
      title: 'Scotty VG - Blog: ' + user.first_name + ' ' + user.last_name,
      user: user
    })
  })
})

router.post('/', function(req, res) {
  console.log(req.body)
  db.createOneUser(req.body).then(() => {
    res.redirect('/users')
  })
})

router.get('/:id/edit', function(req, res) {
  res.render('/users/edit')
})

router.put('/:id', function(req, res) {
  db.updateOne('users', req.params.id).then(() => {
    res.redirect('/')
  })
})

router.delete('/:id', function(req, res) {
  db.deleteOne('users', req.params.id).then(() => {
    res.redirect('/')
  })
})

module.exports = router
