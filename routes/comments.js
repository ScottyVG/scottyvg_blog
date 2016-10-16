'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/api');

router.get('/', (req, res) => {
  db.getAll('comments').then(comments => {
    res.render('commentss/all', {
      title: 'comments',
      comments: comments
    });
  });
});

router.get('/new', (req, res) => {
  res.send('/posts/:id/comments/new');
});

router.get('/:id', (req, res) => {
  db.getUser(req.params.id).then(comment => {
    console.log('comment', comment);
    res.render('comments/one', {
      comment: comment
    });
  });
});

router.post('/', (req, res) => {
  db.createOne('comments').then(comment => {
    console.log('comment', comment);
    res.redirect('/');
  });
});

router.get('/:id/edit', (req, res) => {
  res.render('/comments/edit');
});

router.put('/:id', (req, res) => {
  db.updateOne('comments', req.params.id).then(comment => {
    console.log('comment', comment);
    res.redirect('/');
  });
});

router.delete('/:id', (req, res) => {
  db.deleteOne('comments', req.params.id).then(comment => {
    console.log('comment', comment);
    res.redirect('/');
  });
});

module.exports = router;
