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
    .select('blog.id AS blog_id')
}
