'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/scottyvg_blog_dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
