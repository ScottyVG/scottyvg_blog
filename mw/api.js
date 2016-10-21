'use strict'

const bcrypt = require('bcrypt')
const knex = require('../db/knex.js')

//Knex to Users db Table
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function findUser(username) {
  return knex('users').select('username').where('username', username).first();
}

function findUserInfo(username) {
  return knex('users').select('id', 'username', 'fullName').where('username', username).first();
}

function findHashedPassword(username) {
  return knex('users').select('user.password').where('user.username', username).first();
}

function authenticateUser(username, password) {
  return findUser(username)
    .then(function(userData) {
      if (!userData) {
        return false;
      }
      return findHashedPassword(username)
        .then(function(hashedPassword) {
          hashedPassword = hashedPassword.password;
          return bcrypt.compareSync(password, hashedPassword);
        });
    });
}

function addUser(username, password, fullName) {
  if (!username || !password || !fullName) {
    return false;
  }
  return findUser(username)
    .then(function(data) {
      if (data) {
        return false;
      }
      return knex('users').insert({
        username: username,
        password: hashPassword(password),
        admin: true,
        fullName: fullName
      });
    })
    .catch(function(err) {
      return err;
    });
}


//Knex to Blog db Table
function getAllBlogs() {
  return knex('blogs').select('id AS blog_id', 'title', 'snippet', 'imageURL', 'users_fullName').orderBy('id', 'desc');
}

function getBlogByID(id) {
  return knex('blogs').select('id', 'title', 'content AS blogContent', 'users_id', 'imageURL', 'users_fullName').where('id', id);
}

function getBlogAndCommentsByBlogID(id) {
  return knex('blogs').select('blog.id AS blog_id', 'blog.title', 'blog.content AS blogContent', 'blog.imageURL', 'comment.id AS comment_id', 'comment.users_id AS comment_users', 'comment.content AS comment_content').fullOuterJoin('comment', 'blog.id', 'comment.blog_id').where('blog.id', id);
}

function getBlogByTitle(title) {
  return knex('blogs').select('id').where('title', title);
}

function getComments(blog_id) {
  return knex('comment').select('comment.id AS comment_id', 'comment.blog_id', 'user.fullName AS comment_users', 'comment.content as comment_content', 'user.id AS users_id').innerJoin('users', 'comment.users_id', 'users.id').where('comment.blog_id', blog_id).orderBy('comment.id', 'desc');
}

function getCommentsByID(comment_id) {
  return knex('comment').select('id AS comment_id', 'blog_id', 'content AS comment_content', 'users_id').where('id', comment_id);
}

function createPost(title, content, image, users_id, users_fullName, snippet) {
  return knex('blog').insert({
    title: title,
    content: content,
    imageURL: image,
    users_id: users_id,
    users_fullName: users_fullName,
    snippet: content.substring(0, 200) + '...'
  });
}

function createComment(users_id, blog_id, content, users_fullName) {
  return knex('comment').insert({
    users_id: users_id,
    blog_id: blog_id,
    content: content,
    users_fullName: users_fullName
  });
}

function editBlogPost(blog_id, title, content, image, snippet) {
  return knex('blog').update({
    title: title,
    content: content,
    imageURL: image,
    snippet: content.substring(0, 200) + '...',
  }).where('id', blog_id);
}

function deleteComments(blog_id) {
  return knex('comment').where('blog_id', blog_id).del();
}

function deleteBlogPost(blog_id) {
  return knex('blog').where('id', blog_id).del();
}

function editComment(comment_id, content) {
  return knex('comment').update({
    content: content
  }).where('id', comment_id);
}

function deleteComment(comment_id) {
  return knex('comment').where('id', comment_id).del();
}

module.exports = {
  findUser: findUser,
  findUserInfo: findUserInfo,
  authenticateUser: authenticateUser,
  addUser: addUser,
  getAllBlogs: getAllBlogs,
  getBlogByID: getBlogByID,
  getBlogAndCommentsByBlogID: getBlogAndCommentsByBlogID,
  getBlogByTitle: getBlogByTitle,
  getBlogByTitle: getBlogByTitle,
  createPost: createPost,
  editBlogPost: editBlogPost,
  deleteBlogPost: deleteBlogPost,
  getComments: getComments,
  getCommentsByID: getCommentsByID,
  createComment: createComment,
  editComment: editComment,
  deleteComment: deleteComment,
  deleteComments: deleteComments
}
