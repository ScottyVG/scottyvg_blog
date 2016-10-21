'use strict'

const bcrypt = require('bcrypt')
const knex = require('../db/knex.js')

//Knex to Users db Table
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

function addUser(username, password, fullName) {
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

//Knex to Blog db Table
function getAllBlogs() {
  return knex('blogs')
    .select('id AS blogs_id', 'title', 'snippet', 'imageURL', 'users_fullName')
    .orderBy('id', 'desc')
}

function getBlogByID(id) {
  return knex('blogs')
    .select('id', 'title', 'content AS blogsContent', 'users_id', 'imageURL', 'users_fullName')
    .where('id', id)
}

function getBlogWithCommentByBlogID(id) {
  return knex('blogs')
    .select('blogs.id AS blogs_id', 'blogs.title', 'blogs.content AS blogsContent', 'blogs.imageURL', 'comments.id AS comments_id', 'comments.users_id AS comments_user', 'comments.content AS comments_content')
    .fullOuterJoin('comments', 'blogs.id', 'comments.blogs_id')
    .where('blogs.id', id)
}

function getBlogByTitle(title) {
  return knex('blogs')
    .select('id')
    .where('title', title)
}

function getBlogByTitle(title) {
  return knex('blogs')
    .select('id')
    .where('title', title)
}

function createBlogPost(title, content, image, users_id, users_fullname, snippet) {
  return knex('blogs')
    .insert({
      title: title,
      content: content,
      imageURL: image,
      users_id: users_id,
      users_fullName: users_fullName,
      snippet: content.substring(0, 200) + '...'
    })
}

function editBlogPost(blogs_id, title, content, image, snippet) {
  return knex('blogs')
    .update({
      title: title,
      content: content,
      imageURL: image,
      snippet: content.substring(0, 200) + '...'
    })
    .where('id', blogs_id)
}

function deleteBlogPost(blogs_id) {
  return knex('blogs')
    .where('id', blogs_id)
    .del()
}

//Knex to Comments db Table
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
  findUser: findUser,
  findUserInfo: findUserInfo,
  authenticateUser: authenticateUser,
  addUser: addUser,
  getAllBlogs: getAllBlogs,
  getBlogByID: getBlogByID,
  getBlogWithCommentByBlogID: getBlogWithCommentByBlogID,
  getBlogByTitle: getBlogByTitle,
  getBlogByTitle: getBlogByTitle,
  createBlogPost: createBlogPost,
  editBlogPost: editBlogPost,
  deleteBlogPost: deleteBlogPost,
  getComments: getComments,
  getCommentsByID: getCommentsByID,
  createComment: createComment,
  editComment: editComment,
  deleteComment: deleteComment,
  deleteComments: deleteComments
}
