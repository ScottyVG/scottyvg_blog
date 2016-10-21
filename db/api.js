'use strict'

var knex = require('./knex')

module.exports = {
  getAllUsers() {
    return knex('users')
  },
  getOneUser(id) {
    return knex('users')
      .where('users.id', id).first()
  },
  createOneUser(user) {
    return knex('users').insert(user)
  },
  updateOneUser(id, user) {
    return knex('users')
      .update(user)
      .where('posts.id', id)
  },
  deleteOneUser(id) {
    return knex('users').del()
      .where('users.id', id)
  },
  getAllPosts() {
    return knex('posts')
      .join('users', 'posts.user_id', 'users.id')
      .select('posts.id as postId', 'users.id as userId', 'users.image_url as userImage', 'users.first_name as firstName', 'users.last_name as lastName', 'posts.title as title', 'posts.body as postBody', 'posts.image_url as postImage')
  },
  getOnePost(id) {
    return knex('posts')
      .join('users', 'posts.user_id', 'users.id')
      .select('posts.id as postId', 'users.id as userId', 'users.image_url as userImage', 'users.first_name as firstName', 'users.last_name as lastName', 'posts.title as title', 'posts.body as postBody', 'posts.image_url as postImage')
      .where('posts.id', id.toString()).first()
  },
  createOnePost(post) {
    return knex('posts').insert(post)
  },
  updateOnePost(id, newPost) {
    return knex('posts').select()
      .where('id', id).first()
      .then(function(post) {
        return knex('posts')
          .update({
            title: newPost.title || post.title,
            body: newPost.body || post.body,
            image_url: newPost.image_url || post.image_url,
          }).where('posts.id', id)
      })
  },
  deleteOnePost(id) {
    return knex('posts').del()
      .where('posts.id', id)
  },
  getCommentsByPostId() {
    return knex('comments')
      .join('posts', 'posts.id', 'comments.post_id')
      .join('users', 'users.id', 'comments.user_id')
      .select('users.first_name as firstName', 'users.last_name as lastName', 'posts.title as title', 'comments.body as commentBody')

  },
}
