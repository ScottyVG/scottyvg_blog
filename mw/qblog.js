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

module.exports = {
  getAllBlogs: getAllBlogs,
  getBlogByID: getBlogByID,
  getBlogWithCommentByBlogID: getBlogWithCommentByBlogID
}
