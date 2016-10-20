'use strict'

const express = require('express')
const router = express.Router()
const passport = require('../mw/passport')
const quser = require('../mw/quser')
const qblog = require('../mw/qblog')
const qcomment = require('../mw/qcomment')

// TODO: create comment on blog
// TODO: edit one comment on the blog
// TODO: delete comment on blog
// TODO: admin delete all comments from 1 blog (stretch)

module.exports = router
