'use strict';

const express = require('express');
const router = express.Router();
const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('/posts');
});

router.use('/users', users);
router.use('/posts', posts);
router.use('/users/:id/posts', posts);
router.use('/posts/:id/comments', comments);
router.use('/users/:id/comments', comments);

module.exports = router;
