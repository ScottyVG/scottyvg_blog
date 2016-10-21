'use strict'

const bcrypt = require('bcrypt')
const passport = require('passport')
const Local = require('passport-local')
const api = require('./api')


passport.use(new Local(function(username, password, done) {
  api.authenticateUser(username, password)
    .then(function(verified) {
      if (!verified) {
        //Throw Error
        console.log('Access Error: Incorrect username and/or password')
        done(new Error('Access Error: Incorrect username and/or password'))
        return
      }
      api.findUser(username)
        .then(function(user) {
          done(null, user)
        })
    })
}))

passport.serializeUser(function(user, done) {
  done(null, user.username)
})

passport.deserializeUser(function(username, done) {
  api.findUser(username)
    .then(function(user) {
      done(null, user)
    })
})

module.exports = passport
