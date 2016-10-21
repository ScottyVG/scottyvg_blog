'use strict'

const bcrypt = require('bcrypt')
const passport = require('passport')
const Local = require('passport-local')
const quser = require('./quser.js')
const qblog = require('./qblog.js')
const qcomment = require('./qcomment.js')

passport.use(new Local(function(username, password, done) {
  quser.authenticateUser(username, password)
    .then(function(verified) {
      if (!verified) {
        //Throw Error
        console.log('Access Error: Incorrect username and/or password')
        done(new Error('Access Error: Incorrect username and/or password'))
        return
      }
      quser.findUser(username)
        .then(function(user) {
          done(null, user)
        })
    })
}))

passport.serializeUser(function(user, done) {
  done(null, user.username)
})

passport.deserializeUser(function(username, done) {
  quser.findUser(username)
    .then(function(user) {
      done(null, user)
    })
})

module.exports = passport
