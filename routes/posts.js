'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/api');

router.get('/', (req, res) => {
  db.getAllPosts().then(posts => {
    res.render('posts/all', {
      title: 'Scotty VG\'s Blog: Insights from a madman with a mac.',
      posts: posts
    });
  });
});

router.get('/new', (req, res) => {
  db.getAllUsers().then(users => {
    res.render('posts/new', {
      title: 'Scotty VG\'s Blog: New Post',
      users: users
    });
  });
});

router.get('/:id', (req, res) => {
  db.getOnePost(req.params.id).then(post => {
    db.getAllUsers().then(users => {
      res.render('posts/one', {
        title: 'Scotty VG\'s Blog: ' + post.title,
        post: post,
        users: users
      });
    });
  });
});

router.post('/', (req, res) => {
  db.createOnePost().then(post => {
    console.log('post', post);
    res.redirect('/');
  });
});

router.get('/:id/edit', (req, res) => {
  db.getOnePost(req.params.id).then(post => {
    res.render('posts/edit', {
      title: 'Scotty VG\'s Blog: ' + post.title,
      post: post
    });
  });
});

router.put('/:id', (req, res) => {
  db.updateOnePost(req.params.id).then(() => {
    res.redirect('/');
  });
});

router.delete('/:id', (req, res) => {
  db.deleteOnePost(req.params.id).then(() => {
    res.redirect('/');
  });
});

module.exports = router;
