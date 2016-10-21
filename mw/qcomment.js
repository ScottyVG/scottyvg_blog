'use strict'

const knex = require('../db/knex.js')

//Query Comment db
function getComments(blogs_id) {
  return knex('comments')
    .select('comments.id AS comments_id', 'comments.blogs_id', 'user.fullName AS comments_user', 'comments.content as comments_content', 'user.id AS users_id')
    .innerJoin('users', 'comments.users_id', 'user.id')
    .where('comments.blogs_id', blogs_id)
    .orderBy('comments.id', 'desc');
}

function getCommentsByID(comments) {
  return knex('comments')
    .select('id AS comments_id', 'blogs_id', 'content AS comments_content', 'user_id')
    .where('id', comment_id)
}

function createComment(users_id, blogs_id, content, users_fullName) {
  return knex('comments')
    .insert({
      users_id: users_id,
      blogs_id: blogs_id,
      content: content,
      users_fullName: users_fullName
    })
}

function editComment(comments_id, content) {
  return knex('comments').update({
      content: content
    })
    .where('id', comments_id)
}

function deleteComment(comments_id) {
  return knex('comments')
    .where('id', comments_id)
    .del()
}

function deleteComments(blogs_id) {
  return knex('comments')
    .where('blogs_id', blogs_id)
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
