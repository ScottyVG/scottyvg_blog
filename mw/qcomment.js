'use strict'

const bcrypt = require('bcrypt')
const knex = require('../db/knex.js')

//Query Comment db
function getComments(blog_id) {
  return knex('comment')
    .select('comment.id AS comment_id', 'comment.blog_id', 'user.fullName AS comment_user', 'comment.content as comment_content', 'user.id AS user_id')
    .innerJoin('user', 'comment.user_id', 'user.id')
    .where('comment.blog_id', blog_id)
    .orderBy('comment.id', 'desc');
}

function getCommentsByID(comment) {
  return knex('comment')
    .select('id AS comment_id', 'blog_id', 'content AS comment_content', 'user_id')
    .where('id', comment_id)
}

createComment(user_id, blog_id, content, function user_fullName) {
  return knex('comment')
    .insert({
      user_id: user_id,
      blog_id: blog_id,
      content: content,
      user_fullName: user_fullName
    })
}

function editComment(comment_id, content) {
  return knex('comment').update({
      content: content
    })
    .where('id', comment_id)
}

function deleteComment(comment_id) {
  return knex('comment')
    .where('id', comment_id)
    .del()
}

function deleteComments(blog_id) {
  return knex('comment')
    .where('blog_id', blog_id)
    .del()
}

module.exports = {
  getComments: getComments,
  getCommentsByID: getCommentsByID,
  createComment: createComment,
  editComment: editComment,
  deleteComment: deleteComment,
  deleteComments: deleteComments
}
