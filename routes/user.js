var express = require('express');
var router = express.Router();
var passport = require('../mw/passport')
var query = require('../mw/api')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// 'use strict'
//
// const express = require('express')
// const router = express.Router()
// const passport = require('../mw/passport')
// const api = require('../mw/api')
//
// // Render - Register Page
// router.get('/register', function(req, res, next) {
//   console.log('router.get /register - user route');
//   res.render(render, 'register')
// })
//
// // Post - Register Info
// router.post('/register', function(req, res, next) {
//   console.log('router.post /register - user route');
//   api.addUser(req.body.username, req.body.password, req.body.fullName)
//     .then(function() {
//       res.redirect('/login')
//     })
//     .catch(function(err) {
//       res.render('error', {
//         message: 'Username is already taken.',
//         link: '/register'
//       })
//       return
//     })
// })
//
// // Render - Login Page
// router.get('/login', function(req, res, next) {
//   console.log('router.get /login - user route');
//   res.render('login')
// })
//
// // Post - Login Info
// router.post('/login', function(req, res, next) {
//   console.log('router.post /login - user route');
//   passport.authenticate('local', {
//     successRedirect: '/post',
//     failureRedirect: '/login'
//   })
// })
//
// // Logout
// router.get('/logout', function(req, res) {
//   console.log('router.get /logout - user route');
//   req.logout()
//   res.redirect('/login')
// })
//
// module.exports = router
