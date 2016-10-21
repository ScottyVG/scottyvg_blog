module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/scottyvg_blog_db',
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true',
  },

}
