'use strict'

const bcrypt = require('bcrypt')
const knex = require('../db/knex.js')
const qblog = require('./qblog.js')
const qcomment = require('./qcomment.js')

//Query user db
function hashPassword(password) {
  return bcrypt.hashSync(password, 10)
}

function findUser(username) {
  return knex('users')
    .select('username')
    .where('username', username)
    .first()
}

function findUserInfo(username) {
  return knex('users')
    .select('id', 'username', 'fullName')
    .where('username', username)
    .first()
}

function findHashedPassword(username) {
  return knex('users')
    .select('user.password')
    .where('user.username', username)
    .first()
}

function authenticateUser(username, password) {
  return findUser(username)
    .then((userData) => {
      if (!userData) {
        return false
      }
      return findHashedPassword(username)
        .then((hashedPassword) => {
          hashedPassword = hashedPassword.password
          return bcrypt.compareSync(password, hashedPassword)
        })
    })
}

function addUser(username, password, fullname) {
  if (!username || !password || !fullName) {
    return false
  }
  return findUser(username)
    .then((data) => {
      if (data) {
        return false
      }
      return knex('users')
        .insert({
          username: username,
          password: hashPassword(password),
          admin: true,
          fullName: fullName
        })
    })
    .catch((err) => {
      return err
    })
}

module.exports = {
  findUser: findUser,
  findUserInfo: findUserInfo,
  authenticateUser: authenticateUser,
  addUser: addUser
}
