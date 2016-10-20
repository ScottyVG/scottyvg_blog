'use strict'

const passport = require('passport')
const Local = require('passport-local')
const quser = require('./quser.js')

passport.use(new Local(function(username, passord, done) {
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
