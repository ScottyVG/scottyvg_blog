'use strict'

const bcrypt = require('bcrypt')
const knex = require('./db/knex.js')

//Query Blog db
getAllBlogs() => {
  return knex('blog')
    .select('id AS blog_id', 'title', 'snippet', 'imageURL', 'user_fullName')
    .orderBy('id', 'desc')
}

getBlogByID(id) => {
  return knex('blog')
    .select('id', 'title', 'content AS blogContent', 'user_id', 'imageURL', 'user_fullName')
    .where('id', id)
}

getBlogWithCommentByBlogID(id) {
  return knex('blog')
    .select('blog.id AS blog_id', 'blog.title', 'blog.content AS blogContent', 'blog.imageURL', 'comment.id AS comment_id', 'comment.user_id AS comment_user', 'comment.content AS comment_content')
    .fullOuterJoin('comment', 'blog.id', 'comment.blog_id')
    .where('blog.id', id)
}

getBlogByTitle(title) => {
  return knex('blog')
    .select('id')
    .where('title', title)
}

getBlogByTitle(title) => {
  return knex('blog')
    .select('id')
    .where('title', title)
}

createBlogPost(title, content, image, user_id, user_fullname, snippet) => {
  return knex('blog')
    .insert({
      title: title,
      content: content,
      imageURL: image,
      user_id: user_id,
      user_fullName: user_fullName,
      snippet: content.substring(0, 200) + '...'
    })
}

editBlogPost(blog_id, title, content, image, snippet) => {
  return knex('blog')
    .update({
      title: title,
      content: content,
      imageURL: image,
      snippet: content.substring(0, 200) + '...'
    })
    .where('id', blog_id)
}

deleteBlogPost(blog_id) => {
  return knex('blog')
    .where('id', blog_id)
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
