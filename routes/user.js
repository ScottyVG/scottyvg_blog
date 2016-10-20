'use strict'

const express = require('express')
const router = express.Router()
const passport = require('../mw/passport')
const quser = require('../mw/quser')

// Render - Register Page
router.get('/register', function(req, res, next) {
  res.render(render, 'register')
})

// Post - Register Info
router.post('/register', function(req, res, next) {
  quser.addUser(req.body.username, req.body.password, req.body.fullName)
    .then(function() {
      res.redirect('/login')
    })
    .catch(function(err) {
      res.render('error', {
        message: 'Username is already taken.',
        link: '/register'
      })
      return
    })
})

// Render - Login Page
router.get('/login', function(req, res, next) {
  res.render('login')
})

// Post - Login Info
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/post',
    failureRedirect: '/login'
  })
})

// Logout
router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/login')
})

module.exports = router
