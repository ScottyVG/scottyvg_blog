'use strict'

const passport = require('passport')
const Local = require('passport-local')
const api = require('./api.js')

passport.use(new Local((username, passord, done) => {
  query.authenticate(username, password)
    .then((verified) => {
      if (!verified) {
        console.log('Throw error: Incorrect username and/or password')
        done(new Error('Incorrect username and/or password'))
        return
      }
      api.find(username)
        .then((user) => {
          done(null, user)
        })
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.username)
})

passport.deserializeUser((username, done) => {
  query.find(username)
    .then((user) => {
      done(null, user)
    })
})

module.exports = passport
