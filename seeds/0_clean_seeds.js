'use strict';

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('posts').del(),
    knex('users').del(),
  ])
}
