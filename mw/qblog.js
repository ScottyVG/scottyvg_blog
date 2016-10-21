'use strict'

const bcrypt = require('bcrypt')
const knex = require('../db/knex.js')
const quser = require('./quser.js')
const qcomment = require('./qcomment.js')

//Query Blog db
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
      snippet: `${content.substring(0, 200)} + ...`
    })
    .where('id', blogs_id)
}

function deleteBlogPost(blogs_id) {
  return knex('blogs')
    .where('id', blogs_id)
    .del()
}

module.exports = {
  getAllBlogs: getAllBlogs,
  getBlogByID: getBlogByID,
  getBlogWithCommentByBlogID: getBlogWithCommentByBlogID,
  getBlogByTitle: getBlogByTitle,
  getBlogByTitle: getBlogByTitle,
  createBlogPost: createBlogPost,
  editBlogPost: editBlogPost,
  deleteBlogPost: deleteBlogPost
}
