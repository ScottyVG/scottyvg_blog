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
      snippet: content.substring(0, 200) + '...'
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

'use strict'

const bcrypt = require('bcrypt')
const knex = require('../db/knex.js')
const quser = require('./quser.js')
const qcomment = require('./qcomment.js')

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

'use strict'

const bcrypt = require('bcrypt')
const knex = require('../db/knex.js')
const qblog = require('./qblog.js')
const qcomment = require('./qcomment.js')

//Query user db
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

function addUser(username, password, fullname) {
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

module.exports = {
  findUser: findUser,
  findUserInfo: findUserInfo,
  authenticateUser: authenticateUser,
  addUser: addUser
}